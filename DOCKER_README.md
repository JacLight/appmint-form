# Appmint Form Demo - Docker & Kubernetes Deployment

This guide explains how to build a Docker image for the Appmint Form Demo, push it to a container registry, and deploy it to Kubernetes.

## Automated CI/CD with GitHub Actions

The project includes GitHub Actions workflows that automate the entire CI/CD process:

1. **Version Bump** (.github/workflows/version-bump.yml)
   - Automatically bumps the version in package.json based on commit messages
   - Triggers when pushing to the master branch
   - Uses commit message keywords to determine version increment type:
     - Minor: 'add', 'Adds', 'new'
     - Major: 'MAJOR', 'cut-major'
     - Patch: 'patch', 'fixes'

2. **Docker Image Build** (.github/workflows/docker.yml)
   - Triggered after a successful version bump
   - Builds and pushes the Docker image to jaclight/fundu
   - Tags the image with the version from package.json

3. **Kubernetes Deployment** (.github/workflows/deploy.yml)
   - Triggered after a successful Docker image build
   - Deploys the application to Kubernetes
   - Uses the same image tag as the Docker build

### Required Secrets

To use these workflows, you need to set up the following GitHub secrets:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_ACCESS_TOKEN`: Your Docker Hub access token
- `NPM_ACCESS_TOKEN`: Your NPM access token (if needed)
- `KUBE_CONFIG`: Your Kubernetes configuration file (base64 encoded)

## Manual Deployment

If you prefer to deploy manually, follow the instructions below.

### Prerequisites

- Docker installed on your machine
- Access to Docker Hub with permissions to push to jaclight/fundu repository
- kubectl configured to connect to your Kubernetes cluster
- Image pull secret "dockerhubkey" configured in your Kubernetes cluster

## Automated Deployment (Recommended)

We've provided a fully automated deployment script that handles everything:

1. Make the script executable (if not already):

```bash
chmod +x deploy.sh
```

2. Run the script:

```bash
./deploy.sh
```

This script will:

- Automatically get the version from package.json
- Build and push the Docker image to jaclight/fundu
- Deploy to Kubernetes with the correct image name

You can customize the deployment if needed:

```bash
# Use a specific version instead of the one from package.json
./deploy.sh --version 0.2.6

# Skip building the Docker image (if it's already built)
./deploy.sh --skip-build

# See all available options
./deploy.sh --help
```

## Manual Deployment

If you prefer to handle the deployment steps manually, you can:

### Building and Pushing the Docker Image

#### Option 1: Using the Build Script

1. Make the script executable (if not already):

```bash
chmod +x docker-build-push.sh
```

2. Run the script:

```bash
./docker-build-push.sh
```

The script automatically gets the version from package.json. You can customize the version if needed:

```bash
./docker-build-push.sh --version 0.2.6
```

Run `./docker-build-push.sh --help` for more options.

#### Option 2: Manual Process

If you prefer to build and push manually:

1. Get the current version from package.json:

```bash
VERSION=$(node -p "require('./package.json').version")
```

2. Build the demo application:

```bash
yarn build:demo
```

3. Build the Docker image:

```bash
docker build -t appmint-form:$VERSION .
```

4. Tag the image with the correct repository:

```bash
docker tag appmint-form:$VERSION jaclight/fundu:appmint-form-$VERSION
```

5. Push the image to Docker Hub:

```bash
docker push jaclight/fundu:appmint-form-$VERSION
```

### Deploying to Kubernetes

1. Create a temporary file with the image name substituted:

```bash
VERSION=$(node -p "require('./package.json').version")
export IMAGE_NAME="jaclight/fundu:appmint-form-$VERSION"
envsubst < kubernetes.yaml > /tmp/k8s-deploy.yaml
```

2. Apply the Kubernetes configuration:

```bash
kubectl apply -f /tmp/k8s-deploy.yaml
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
