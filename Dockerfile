FROM core.harbor.mrbilit.net/hub/library/node:16.16-alpine as builder
RUN apk add --no-cache git openssh

ARG BUILD_ENV

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

COPY . .

RUN yarn generate

FROM core.harbor.mrbilit.net/hub/library/nginx:1.17.5-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
