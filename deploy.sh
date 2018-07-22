#!/bin/bash
set -ex

if [[ ${DOCKER} ]]; then
  eval "$(ssh-agent -s)"
  ssh-add -k ~/.ssh/id_digipulse

  cert="/app/.ssh/bot.pem"
else
  cert="~/.ssh/bot.pem"
fi

# Install latest packages
yarn

# Build the project for STAGING
yarn build

# Define local server
nginx_conf="./deploy/react.conf"
dist="./dist"

# Define remote server
host="18.211.182.200"
user="ubuntu"

path="/home/ubuntu/react"
nginx_path="/etc/nginx/sites-available"
remote="ssh -i $cert $user@$host"

# Remove old files
eval $remote "rm -rf $path/*"

# Copy new files
rsync -avz $dist/* -e "ssh -i $cert" $user@$host:$path

# Copy nginx
rsync --rsync-path="sudo rsync" -avz $nginx_conf -e "ssh -i $cert" $user@$host:$nginx_path
eval $remote "sudo ln -fs /etc/nginx/sites-available/react.conf /etc/nginx/sites-enabled/react"
eval $remote "sudo systemctl reload nginx"
