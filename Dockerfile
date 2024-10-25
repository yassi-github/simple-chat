FROM nginx:latest

ENV OLLAMA_ORIGIN="192.0.2.1:11434"

COPY static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY set-ollama-origin.sh /docker-entrypoint.d/90-set-ollama-origin.sh

EXPOSE 80
