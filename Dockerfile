
FROM node:16.20.0 as builder

# ENV PROJECT_ENV production
# ENV NODE_ENV production

# http-server 不变动也可以利用缓存
WORKDIR /source

COPY . .
# ADD package.json /source

RUN npm install pnpm -g 
RUN pnpm config set registry https://registry.npm.taobao.org
RUN npm run bootstrap && npm run build

COPY . /source

# 选择更小体积的基础镜像
FROM nginx:latest

COPY --from=builder /source/dist/ /usr/share/nginx/html/
COPY --from=builder /source/dist/wms-pad/favicon.png /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf