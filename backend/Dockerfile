FROM node:18-alpine

USER node
WORKDIR /backend
COPY --chown=node yarn.lock package*.json /backend/
RUN yarn install
COPY --chown=node . /

EXPOSE 3001
CMD [ "yarn", "start" ]