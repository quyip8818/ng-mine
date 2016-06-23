FROM node
EXPOSE 80

ADD . /code
WORKDIR /code
RUN apt-get -yq update && \
    apt-get -yq install curl && \
    curl -L https://npmjs.org/install.sh | sh

RUN npm install -g concurrently lite-server typescript typings

RUN npm install
ENTRYPOINT npm start
