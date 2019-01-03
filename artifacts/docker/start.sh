#!/bin/sh

echo "===== RUNNING CONTAINER ====="
docker run -it --rm -d --name cmtools-app-dev-build -p 80:80 wunderman-commerce/cmtools-app:dev-build
echo "===== CONTAINER IS RUNNING NOW ====="
echo
echo "Store is now accessible at port 80 of your docker-machine."
echo