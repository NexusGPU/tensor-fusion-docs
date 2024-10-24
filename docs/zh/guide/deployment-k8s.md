---
outline: deep
---

# 在Kubernetes集群部署Tensor Fusion

## 前提条件

1。创建一个有GPU节点、GPU Operator的Kubernetes集群
2。Kubernetes能够连通Docker Hub下载镜像
3。创建cuda-fusion-test命名空间

```bash
kubectl create ns cuda-fusion-test
```

## Step 1. 在GPU节点上运行服务端

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cuda-fusion-gpu-server
  namespace: cuda-fusion-test
spec:
  replicas: 1
  selector:
    matchLabels:
      workload: test
  template:
    metadata:
      labels:
        workload: test
    spec:
      # Recommend to use fixed node during testing and evaluation of TensorFusion
      nodeSelector:  
        kubernetes.io/hostname: replace-me-with-kubernetes-node-name // [!code highlight]
      hostNetwork: true  // ![code highlight]
      containers:
        - name: cuda
          image: code2life/cuda-fusion:v0.9
          command: 
          - sh
          - -c 
          # when driver version is 535.183.*, -k is 0x298, when it's 550.*, -k is 0x268 // ![!code highlight]
          - "vcuda -n native -s 9997 -r 9998 -p 9999 -a 0x1129 -k 0x298" // [!code highlight]
          resources:
            limits:
              nvidia.com/gpu: '1' // obtain one GPU for testing, could be multiple [!code highlight]
```

## Step 2. Deploy or patch client apps

运行成功后复制NodeIP，替换到vcuda-client的启动命令，即下面的Yaml种的 REPLACE_ME 换成 Server Node IP。

在Patch正式应用之前，可以修改并Apply以下Yaml，用来先在CPU节点上测试GPU推理

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cuda-fusion-test-cpu-client
  namespace: cuda-fusion-test
spec:
  replicas: 1
  selector:
    matchLabels:
      workload: test
  template:
    metadata:
      labels:
        workload: test
    spec:
      volumes:
        - name: vcuda-libs
          emptyDir: {}
      hostPID: true
      hostIPC: true
      initContainers:
        - name: init-hook
          image: code2life/cuda-fusion-client:v0.95-slim
          command: 
          - sh
          - -c
          - cp /lib/vcuda/*.so /target/lib/vcuda/ && cp /lib/vcuda/libcuda.so.1 /target/lib/vcuda/ 
          volumeMounts:
            - mountPath: /target/lib/vcuda
              name: vcuda-libs
      containers:
        - name: client
          image: code2life/cuda-fusion-client:v0.95-slim
          command:
            - sh
            - -c
            - vcuda-client 0 REPLACE_ME native 9998 9997 9999 0 // ![code highlight]
        - name: app
          image: pytorch/pytorch:2.3.1-cuda12.1-cudnn8-runtime
          lifecycle:
            postStart:
              exec:
                command: ["/bin/sh", "-c", "mkdir -p /usr/local/nvidia/lib/ && cp -r /lib/vcuda/libcuda.so.1 /usr/local/nvidia/lib/ && pip3 install transformers sentencepiece"]
          env:
            - name: DISABLE_ADDMM_CUDA_LT
              value: "1"
          command:
            - sleep
            - infinity
          volumeMounts:
            - mountPath: /lib/vcuda
              name: vcuda-libs
```

运行 "kubectl exec" 命令，到"app"容器中运行如下命令，启动Python控制台

```bash
LD_PRELOAD=/lib/vcuda/libutilities.so:/lib/vcuda/libvcuda.so  python3
```

最后，在CPU Pod中测试Google T5模型，应该在几秒钟内将英语“Hello”翻译成德语“Hallo”。

```python
from transformers import pipeline
pipe = pipeline("translation_en_to_de", model="google-t5/t5-base", device="cuda:0")
pipe("Hello")
```
