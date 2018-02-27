#!/bin/bash
set -e

# Build the project for STAGING
# yarn build

# Define local server
nginx_conf="./deploy/react.conf"
dist="./dist"

# Define remote server
host="178.62.242.250"
user="root"
path="/var/www/react"
nginx_path="/etc/nginx/sites-available"
remote="ssh $user@$host"

# Remove old files
eval $remote "rm -rf $path/*"

# Copy new files
rsync -avz $dist/* $user@$host:$path

# Copy nginx
rsync -avz $nginx_conf $user@$host:$nginx_path
eval $remote "ln -fs /etc/nginx/sites-available/react.conf /etc/nginx/sites-enabled/react"
eval $remote "sudo systemctl reload nginx"
