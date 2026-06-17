From node

WORKDIR /app

COPY package*.json .
RUN npm build
COPY . .

CMD["node","index.js"]
