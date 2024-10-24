---
outline: deep
---

# Tensor Fusion Deployment for Kubernetes

## Prerequisites

1. Create a Kubernetes cluster with GPU pool enabled, GPU Operator enabled
2. Kubernetes is able to connect to Docker Hub to pull public images
3. Create cuda-fusion-test namespace for evaluation

```bash
kubectl create ns cuda-fusion-test
```

## Step 1. Run serverside on GPU node

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

After serverside running successfully, copy the NodeIP, replace the vcuda-client startup command.

REPLACE_ME => Server Node IP

Before patch exiting workload to move to away from GPU node and schedule to CPU node, you can run this on CPU node to test the functionality.

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

Then run "kubectl exec" into the "app" container, run this command inside the shell to start python REPL console.

```bash
LD_PRELOAD=/lib/vcuda/libutilities.so:/lib/vcuda/libvcuda.so  python3
```

Finally, test a simple Google T5 model inference in CPU pod. It should translate English "Hello" to German "Hallo" in seconds.

```python
from transformers import pipeline
pipe = pipeline("translation_en_to_de", model="google-t5/t5-base", device="cuda:0")
pipe("Hello")
```
