#!/bin/bash

# Check if the network exists, if not, create it
if ! docker network inspect social-media-network &>/dev/null; then
  docker network create social-media-network
fi

# Create a Docker volume for MongoDB data
docker volume create social_media_mongodb_data

# Build MongoDB Docker image
docker build -t social-media-mongodb ./docker/mongodbDockerImage

# Run MongoDB container
docker run -d -p 27020:27017 --name=mongo-db --network=social-media-network -v mongodb_data:/data/db social-media-mongodb

echo "Docker setup completed!"
