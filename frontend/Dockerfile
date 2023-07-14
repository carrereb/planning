FROM node:18-alpine

WORKDIR /frontend
COPY package*.json yarn.lock /frontend/
RUN yarn install
COPY . /
ENV PATH=/frontend/node_modules/.bin:$PATH

# EXPOSE 3000
# CMD [ "yarn", "dev" ]
