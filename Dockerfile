FROM node
ADD . /code
WORKDIR /code
RUN apt-get -yq update
#    apt-get -yq install curl && \
#    curl -L https://npmjs.org/install.sh | sh

RUN cd $(npm root -g)/npm && \
    npm install fs-extra && \
    sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs\.move/ ./lib/utils/rename.js

RUN cd /code && \
    npm install -g concurrently lite-server typescript typings

RUN npm install && \
    typings install && \
    npm run tsc && \
    apt-get clean
EXPOSE 8080
CMD npm start
