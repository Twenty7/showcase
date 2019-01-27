#!/bin/sh

yarn run encore production

echo "Running PHP..."

php-fpm -F
