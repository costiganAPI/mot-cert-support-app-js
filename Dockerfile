FROM node:20

# Install Java
RUN apt-get update && apt-get install -y openjdk-18-jre

WORKDIR /usr/local

COPY public/ /usr/local/public
COPY src/ /usr/local/src
COPY package.json /usr/local/
COPY mocks /usr/local/mocks

RUN npm install

CMD ["npm", "start"]
