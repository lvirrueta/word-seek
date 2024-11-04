FROM nginx

LABEL version=1
LABEL description="This is an nginx image"
LABEL vendor=lvirrueta

COPY dist/portfolio /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80