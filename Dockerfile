# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Enable Corepack and install dependencies
RUN corepack enable && yarn install

# Copy source code
COPY . .

# Build the demo
RUN yarn build:demo

# Production stage
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/demo-dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
