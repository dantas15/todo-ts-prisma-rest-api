FROM node:20-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]