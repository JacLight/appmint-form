# Appmint Form Demo - Docker & Kubernetes Deployment

This guide explains how to build a Docker image for the Appmint Form Demo, push it to a container registry, and deploy it to Kubernetes.

## Prerequisites

- Docker installed on your machine
- Access to Docker Hub with permissions to push to jaclight/fundu repository
- kubectl configured to connect to your Kubernetes cluster
- Image pull secret "dockerhubkey" configured in your Kubernetes cluster

## Building and Pushing the Docker Image

### Option 1: Using the Automated Script (Recommended)

We've provided a convenient script that automates the build and push process:

1. Make the script executable (if not already):

```bash
chmod +x docker-build-push.sh
```

2. Run the script:

```bash
./docker-build-push.sh
```

By default, the script will build and push to `jaclight/fundu:appmint-form-0.2.5`. You can customize the version if needed:

```bash
./docker-build-push.sh --version 0.2.6
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
docker build -t appmint-form:0.2.5 .
```

3. Tag the image with the correct repository:

```bash
docker tag appmint-form:0.2.5 jaclight/fundu:appmint-form-0.2.5
```

4. Push the image to Docker Hub:

```bash
docker push jaclight/fundu:appmint-form-0.2.5
```

## Deploying to Kubernetes

1. Edit the `kubernetes.yaml` file to replace `${IMAGE_NAME}` with the full image name:

```yaml
image: jaclight/fundu:appmint-form-0.2.5
```

2. Apply the Kubernetes configuration:

```bash
kubectl apply -f kubernetes.yaml
```

3. Check the status of your deployment:

```bash
kubectl get pods -l component=appmint-form
kubectl get service appmint-form-service
kubectl get ingress appmint-form-ingress
```

The application will be available at <https://forms.appmint.app> once the deployment is complete and DNS is properly configured.

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
- name: appmint-form
  image: jaclight/fundu:appmint-form-0.2.5
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
kubectl logs -l component=appmint-form
```

2. Describe the pod to see events:

```bash
kubectl describe pod -l component=appmint-form
```

3. Check the Ingress configuration:

```bash
kubectl describe ingress appmint-form-ingress
```
