FROM node:latest
WORKDIR /backend
COPY . /backend 
RUN npm install
EXPOSE 3001
# ENTRYPOINT node src/server.js
CMD ["node", "src/server.js"]
