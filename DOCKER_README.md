# Appmint Form Demo - Docker & Kubernetes Deployment

This guide explains how to build a Docker image for the Appmint Form Demo, push it to a container registry, and deploy it to Kubernetes.

## Prerequisites

- Docker installed on your machine
- Access to a container registry (Docker Hub, Google Container Registry, AWS ECR, etc.)
- kubectl configured to connect to your Kubernetes cluster

## Building and Pushing the Docker Image

### Option 1: Using the Automated Script (Recommended)

We've provided a convenient script that automates the build and push process:

1. Make the script executable (if not already):

```bash
chmod +x docker-build-push.sh
```

2. Run the script with your registry information:

```bash
./docker-build-push.sh --registry your-registry.com
```

You can also specify a custom version or image name:

```bash
./docker-build-push.sh --registry your-registry.com --version 0.2.6 --name custom-image-name
```

Run `./docker-build-push.sh --help` for more options.

### Option 2: Manual Process

If you prefer to build and push manually:

1. Build the demo application:

```bash
yarn build:demo
```

2. Build the Docker image:

```bash
docker build -t appmint-form-demo:0.2.5 .
```

3. Tag the image with your registry information:

```bash
docker tag appmint-form-demo:0.2.5 your-registry.com/appmint-form-demo:0.2.5
```

4. Push the image to your registry:

```bash
docker push your-registry.com/appmint-form-demo:0.2.5
```

## Deploying to Kubernetes

1. Edit the `kubernetes.yaml` file to replace `${DOCKER_REGISTRY}` with your actual registry URL:

```yaml
image: your-registry.com/appmint-form-demo:0.2.5
```

2. Also update the Ingress host to match your domain:

```yaml
host: appmint-form-demo.your-domain.com
```

3. Apply the Kubernetes configuration:

```bash
kubectl apply -f kubernetes.yaml
```

4. Check the status of your deployment:

```bash
kubectl get pods -l app=appmint-form-demo
kubectl get service appmint-form-demo
kubectl get ingress appmint-form-demo
```

## Configuration Options

### Scaling

To scale the deployment to more replicas:

```bash
kubectl scale deployment appmint-form-demo --replicas=5
```

### Environment Variables

If you need to add environment variables to the container, edit the `kubernetes.yaml` file and add them under the container spec:

```yaml
containers:
- name: appmint-form-demo
  image: your-registry.com/appmint-form-demo:0.2.5
  env:
  - name: ENV_VARIABLE_NAME
    value: "value"
```

### Resource Limits

The default resource limits are set to:

- CPU: 0.5 cores (limit), 0.2 cores (request)
- Memory: 512Mi (limit), 256Mi (request)

Adjust these values in the `kubernetes.yaml` file based on your application's needs.

## Troubleshooting

If you encounter issues with the deployment:

1. Check the pod logs:

```bash
kubectl logs -l app=appmint-form-demo
```

2. Describe the pod to see events:

```bash
kubectl describe pod -l app=appmint-form-demo
```

3. Check the Ingress configuration:

```bash
kubectl describe ingress appmint-form-demo
