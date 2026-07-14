FROM node:20-bullseye

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

CMD ["node", "index.js"]
