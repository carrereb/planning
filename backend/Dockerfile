FROM node:18-alpine

WORKDIR /backend
COPY yarn.lock package*.json /backend/
RUN yarn install
COPY . /

EXPOSE 3001
CMD [ "yarn", "start" ]