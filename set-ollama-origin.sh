#!/bin/sh
set -eu
sed -i "s/192\.0\.2\.1:11434/${OLLAMA_ORIGIN}/" /etc/nginx/conf.d/default.conf
