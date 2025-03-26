#!/bin/bash

# Exit on error
set -e

# Get version from package.json
PACKAGE_VERSION=$(node -p "require('./package.json').version")

# Default values
VERSION="$PACKAGE_VERSION"
REGISTRY="jaclight/fundu"
IMAGE_NAME="appmint-form"
FULL_IMAGE_NAME="$REGISTRY:$IMAGE_NAME-$VERSION"

# Display help
function show_help {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -r, --registry REGISTRY    Docker registry URL (default: $REGISTRY)"
  echo "  -v, --version VERSION      Image version tag (default: $VERSION from package.json)"
  echo "  -n, --name NAME            Image name (default: $IMAGE_NAME)"
  echo "  -s, --skip-build           Skip building and pushing the Docker image"
  echo "  -h, --help                 Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 --registry jaclight/fundu --version 0.2.6"
}

# Parse command line arguments
SKIP_BUILD=false
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -r|--registry)
      REGISTRY="$2"
      shift
      shift
      ;;
    -v|--version)
      VERSION="$2"
      shift
      shift
      ;;
    -n|--name)
      IMAGE_NAME="$2"
      shift
      shift
      ;;
    -s|--skip-build)
      SKIP_BUILD=true
      shift
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Update full image name if parameters changed
FULL_IMAGE_NAME="$REGISTRY:$IMAGE_NAME-$VERSION"

echo "Deploying Appmint Form Demo"
echo "-----------------------------------"
echo "Version: $VERSION"
echo "Image: $FULL_IMAGE_NAME"
echo "-----------------------------------"

if [ "$SKIP_BUILD" = false ]; then
  # Build and push Docker image
  echo "Building and pushing Docker image..."
  ./docker-build-push.sh --registry "$REGISTRY" --version "$VERSION" --name "$IMAGE_NAME"
else
  echo "Skipping Docker build and push..."
fi

# Deploy to Kubernetes
echo "Deploying to Kubernetes..."

# Create a temporary file with the image name substituted
TMP_FILE=$(mktemp)
export IMAGE_NAME="$FULL_IMAGE_NAME"
envsubst < kubernetes.yaml > "$TMP_FILE"

# Apply the Kubernetes configuration
kubectl apply -f "$TMP_FILE"

# Clean up
rm "$TMP_FILE"

echo "-----------------------------------"
echo "Deployment complete!"
echo "The application will be available at https://forms.appmint.app"
echo "Check deployment status with:"
echo "  kubectl get pods -l component=appmint-form"
echo "  kubectl get service appmint-form-service"
echo "  kubectl get ingress appmint-form-ingress"
