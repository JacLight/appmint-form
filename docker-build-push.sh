#!/bin/bash

# Exit on error
set -e

# Default values
VERSION="0.2.5"
REGISTRY=""
IMAGE_NAME="appmint-form-demo"

# Display help
function show_help {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -r, --registry REGISTRY    Docker registry URL (e.g., docker.io/username)"
  echo "  -v, --version VERSION      Image version tag (default: $VERSION)"
  echo "  -n, --name NAME            Image name (default: $IMAGE_NAME)"
  echo "  -h, --help                 Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 --registry docker.io/myusername --version 0.2.5"
}

# Parse command line arguments
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

# Check if registry is provided
if [ -z "$REGISTRY" ]; then
  echo "Error: Docker registry is required."
  echo "Please provide a registry using the -r or --registry option."
  echo ""
  show_help
  exit 1
fi

# Full image name with registry
FULL_IMAGE_NAME="$REGISTRY/$IMAGE_NAME:$VERSION"

echo "Building Docker image: $FULL_IMAGE_NAME"
echo "-----------------------------------"

# Build the demo first
echo "Building the demo application..."
yarn build:demo

# Build the Docker image
echo "Building Docker image..."
docker build -t "$IMAGE_NAME:$VERSION" .

# Tag the image with registry
echo "Tagging image as $FULL_IMAGE_NAME..."
docker tag "$IMAGE_NAME:$VERSION" "$FULL_IMAGE_NAME"

# Push the image to registry
echo "Pushing image to registry..."
docker push "$FULL_IMAGE_NAME"

echo "-----------------------------------"
echo "Successfully built and pushed: $FULL_IMAGE_NAME"
echo ""
echo "To deploy to Kubernetes, update kubernetes.yaml with your registry and run:"
echo "kubectl apply -f kubernetes.yaml"
