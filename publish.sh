#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and publishing AppmintForm v0.3.0${NC}"

# Build the package
echo -e "${GREEN}Building package...${NC}"
npm run build

# Run tests
echo -e "${GREEN}Running tests...${NC}"
npm test

# Build the demo
echo -e "${GREEN}Building demo...${NC}"
npm run build:demo

# Publish to npm
echo -e "${GREEN}Publishing to npm...${NC}"
npm publish --access public

echo -e "${GREEN}Successfully published AppmintForm v0.3.0!${NC}"
echo -e "${YELLOW}Don't forget to create a GitHub release with the release notes.${NC}"
