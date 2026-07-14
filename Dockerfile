FROM node:20-bullseye

RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

# Set environment to production
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "index.js"]
