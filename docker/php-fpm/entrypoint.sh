#!/bin/sh

sudo chown -R www-data:www-data /var/www/showcase/public

yarn run encore production

echo "Running PHP..."

php-fpm -F
