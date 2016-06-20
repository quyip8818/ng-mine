FROM node
ADD . /code
WORKDIR /code
RUN apt-get -yq update && \
    npm install -g concurrently lite-server typescript typings && \
    npm install && \
    apt-get clean
CMD npm start