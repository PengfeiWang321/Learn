FROM nginx
COPY ./react-example/dist/ /usr/share/nginx/html/
COPY ./react-example/vhost.nginx.conf /etc/nginx/conf.d/learn.conf
EXPOSE 80