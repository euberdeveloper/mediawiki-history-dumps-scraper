FROM node:lts-alpine
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run transpile && \
    rm -r source node_modules
RUN npm ci --only=prod
CMD ["npm", "start"]