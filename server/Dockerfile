#FROM node:18.14-alpine
FROM node:latest

COPY --from=rush-builder:latest /usr/src/app/pwm/deploy/server /usr/src/app

USER root
RUN mkdir /.npm
RUN chown -R 1001:0 "/.npm"

WORKDIR /usr/src/app
RUN node create-links.js create

WORKDIR /usr/src/app/server
RUN mv .env.docker .env

EXPOSE 9090
USER 1001
CMD ["npm", "run", "start:prod"]
