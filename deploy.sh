#!/bin/bash
set -ex

if [[ ${DOCKER} ]]; then
  eval "$(ssh-agent -s)"
  ssh-add -k ~/.ssh/id_digipulse

  cert="/app/.ssh/bot.pem"
else
  cert="~/.ssh/bot.pem"
fi

# Build the project for STAGING
yarn build

# Define local server
nginx_conf="./deploy/react.conf"
dist="./dist"

# Define remote server
host="34.228.21.6"
user="ubuntu"

path="/var/www/react"
nginx_path="/etc/nginx/sites-available"
remote="ssh -i $cert $user@$host"

# Remove old files
eval $remote "rm -rf $path/*"

# Copy new files
rsync -avz $dist/* -e "ssh -i $cert" $user@$host:$path

# Copy nginx
rsync -avz $nginx_conf -e "ssh -i $cert" $user@$host:$nginx_path
eval $remote "ln -fs /etc/nginx/sites-available/react.conf /etc/nginx/sites-enabled/react"
eval $remote "sudo systemctl reload nginx"
