FROM node:18-alpine

# This enables us to run prisma inside container without any issue
USER root
RUN mkdir -p /var/lib/apt/lists/partial
RUN apt-get update && apt-get install -y openssl

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Keeps the container running
CMD ["tail", "-f", "/dev/null"]