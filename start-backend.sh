#!/bin/bash

# Function to stop Docker containers on exit
cleanup() {
  echo "Stopping Docker containers..."
  sudo docker compose -f backend/docker/docker-compose.yml stop
}

# Trap termination signal
trap cleanup EXIT

echo "Starting and building Docker containers..."
sudo docker compose -f backend/docker/docker-compose.yml up -d --build


# Run the Python backend
echo "Starting Python backend..."
python backend/run.py