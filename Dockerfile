FROM node
ADD . /code
WORKDIR /code
RUN apt-get -yq update && \
    apt-get -yq install curl && \
    curl -L https://npmjs.org/install.sh | sh

RUN npm install -g concurrently lite-server typescript typings

EXPOSE 8080
ENTRYPOINT npm install && npm start
