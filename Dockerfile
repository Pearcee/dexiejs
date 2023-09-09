FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
COPy ./assets /usr/share/nginx/html/assets