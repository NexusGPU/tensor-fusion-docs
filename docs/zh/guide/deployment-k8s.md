---
outline: deep
---

# 在Kubernetes集群部署Tensor Fusion

## 前提条件

1。创建一个有GPU节点、GPU Operator的Kubernetes集群
2。Kubernetes能够连通Docker Hub下载镜像
3。创建tensor-fusion-test命名空间

```bash
kubectl create ns tensor-fusion-test
```

## Step 1. 在GPU节点上运行服务端

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tensor-fusion-gpu-server
  namespace: tensor-fusion-test
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
      hostNetwork: true  // [!code highlight]
      runtimeClassName: nvidia // if default runtime class is nvidia, this line is optional ![code highlight]
      containers:
        - name: server
          image: code2life/cuda-fusion:v0.91
          command: 
          - sh
          - -c 
          # when driver version is 535.183.*, -k is 0x298, when it's 550.*, -k is 0x268 // [!code highlight]
          - "vcuda -n native -s 9997 -r 9998 -p 9999 -a 0x1129 -k 0x298" // [!code highlight]

          resources:
            limits:
              nvidia.com/gpu: '1' // [!code highlight]
```

## Step 2. 在CPU节点上部署客户端测试应用

运行成功后复制NodeIP，替换到vcuda-client的启动命令，即下面的Yaml种的 REPLACE_ME 换成 Server Node IP。

在Patch正式应用之前，可以修改并Apply以下Yaml，用来先在CPU节点上测试GPU推理

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tensor-fusion-test-cpu-client
  namespace: tensor-fusion-test
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
          image: code2life/cuda-fusion-client:v0.97-slim
          command: 
          - sh
          - -c
          - cp /lib/vcuda/*.so /target/lib/vcuda/ && cp /lib/vcuda/official.libcuda.so.1 /target/lib/vcuda/libcuda.so.1
          volumeMounts:
            - mountPath: /target/lib/vcuda
              name: vcuda-libs
      containers:
        - name: client
          image: code2life/cuda-fusion-client:v0.97-slim
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

最后，在CPU Pod中测试Google T5模型，首次运行加载模型会有20秒到2分钟的时间，取决于内网延迟和下载模型的带宽，加载完成后，运行pipe()函数，一般在3秒内响应，下面的例子会将英语“Hello”翻译成德语“Hallo”。

```python
from transformers import pipeline
pipe = pipeline("translation_en_to_de", model="google-t5/t5-base", device="cuda:0")
pipe("Hello")
```

## Step 3. 更新现有的业务Deployment

如果安装过Kyverno, 将以下Yaml应用到集群，当Deploymet podTemplate的annotation中有tensor-fusion.ai/enabled=true时会自动注入TensorFusion运行时。主要改动以下几点：

1. Add 'vcuda-libs' emptyDir volume to the deployment
2. Enable hostPID & hostIPC to the deployment, for sharing memory between sidecar and application (Don't worry, sidecar will be removed in future)
3. Inject init container to copy LD_PRELOAD libs into application container
4. Inject vcuda-client container as sidecar, remember to replace "REPLACE_ME" with the server NodeIP

如果没有Kyverno，请手动改动上述几步。

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: inject-tensor-fusion
  annotations:
    policies.kyverno.io/title: Inject Tensor Fusion runtime
    policies.kyverno.io/subject: Deployment,Volume
    policies.kyverno.io/minversion: 1.6.0
    policies.kyverno.io/description: >-
      Inject Tensor fusion runtime include a sidecar client container, an init container to provide cuda stub and hook pytorch
spec:
spec:
  admission: true
  background: true
  rules:
    - name: inject-tensor-fusion-sidecar
      match:
        any:
          - resources:
              annotations:
                tensor-fusion.ai/enabled: 'true'
              kinds:
                - Pod
      mutate:
        patchStrategicMerge:
          spec:
            containers:
              - name: app # the container name must be app  // [!code highlight]
                env:
                  - name: DISABLE_ADDMM_CUDA_LT
                    value: "1"
                  - name: LD_LIBRARY_PATH
                    value: /lib/vcuda/
                  - name: LD_PRELOAD
                    value: /lib/vcuda/libutilities.so:/lib/vcuda/libvcuda.so
                volumeMounts:
                  - name: vcuda-libs
                    mountPath: /lib/vcuda
              
              - command:
                  - sh
                  - '-c'
                  - vcuda-client 0 REPLACE_ME native 9998 9997 9999 0  // [!code highlight]
                image: code2life/cuda-fusion-client:v0.97-slim
                imagePullPolicy: IfNotPresent
                name: vcuda-client
            hostIPC: true
            hostPID: true
            initContainers:
              - command:
                  - sh
                  - '-c'
                  - >-
                    cp /lib/vcuda/*.so /target/lib/vcuda/ && cp
                    /lib/vcuda/official.libcuda.so.1
                    /target/lib/vcuda/libcuda.so.1
                image: code2life/cuda-fusion-client:v0.97-slim
                imagePullPolicy: IfNotPresent
                name: copy-runtime-libs
                volumeMounts:
                  - mountPath: /target/lib/vcuda
                    name: vcuda-libs
            volumes:
              - emptyDir: {}
                name: vcuda-libs
      
```

将如下Yaml应用到集群，测试Kyverno注入是否成功

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tensor-fusion-test-on-cpu-node-kyverno
  namespace: tensor-fusion-test
spec:
  replicas: 1
  selector:
    matchLabels:
      workload: test
  template:
    metadata:
      labels:
        workload: test
      annotations:
        tensor-fusion.ai/enabled: "true"
    spec:
      containers:
        - name: app
          image: pytorch/pytorch:2.3.1-cuda12.1-cudnn8-runtime
          command:
            - sleep
            - infinity
```

如果Pod正常启动，运行以下命令，测试CPU上远程调用GPU的效果。对于现存的Deployment，修改template匹配到注入条件即可迁移到TensorFusion。

```bash
pip3 install transformers sentencepiece

LD_PRELOAD="" cat <<EOT >> t5.test.py
from transformers import T5Tokenizer, T5ForConditionalGeneration
from transformers import TextStreamer

model_id = "google-t5/t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_id)
streamer = TextStreamer(tokenizer)
model = T5ForConditionalGeneration.from_pretrained(model_id)
model = model.to("cuda:0")

input_text = "translate English to German: How old are you?"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to("cuda")
outputs = model.generate(input_ids, streamer=streamer)
EOT

python3 t5.test.py

# Output <pad>Wie alt bist  du?</s> in the end
```
