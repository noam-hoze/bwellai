#!/bin/bash

container_name="bwell-ui-v2"

# Check if the container is running
if [ "$(docker inspect -f '{{.State.Status}}' $container_name 2>/dev/null)" ]; then
  # Stop the container if it is running
  docker stop $container_name

  # Remove the container
  docker rm $container_name
fi
# Pull the new Docker image

# Start a new container using the updated image
#docker run --name $container_name -d canvas
