#!/bin/sh

yarn run encore production

php-fpm -F

