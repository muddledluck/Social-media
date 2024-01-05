#!/bin/bash

# Check if the network exists, if not, create it
if ! docker network inspect social-media-network &>/dev/null; then
  docker network create social-media-network
fi

# Check if the volume exists, if not, create it
if ! docker volume inspect social_media_mongodb_data &>/dev/null; then
  docker volume create social_media_mongodb_data
fi

# Build MongoDB Docker image
docker build -t social-media-mongodb ./docker/mongodbDockerImage

# Run MongoDB container if it's not already running
if ! docker inspect -f '{{.State.Running}}' mongo-db &>/dev/null; then
  docker run -d -p 27020:27017 --name=mongo-db --network=social-media-network -v social_media_mongodb_data:/data/db social-media-mongodb
  echo "MongoDB container started"
else
  echo "MongoDB container is already running"
fi

echo "Mongodb Docker setup completed!"
