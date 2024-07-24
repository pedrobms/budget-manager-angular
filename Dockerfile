FROM node:alpine as BUILDER

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx:alpine as RUNNER

COPY --from=BUILDER /usr/src/app/dist/budget-manager-angular /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
