FROM node:18-alpine

USER node
WORKDIR /frontend
COPY --chown=node package*.json yarn.lock /frontend/
RUN yarn install
COPY --chown=node . /

EXPOSE 3000
CMD [ "yarn", "dev" ]
