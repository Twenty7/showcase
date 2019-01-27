FROM php:7.3-fpm

RUN apt-get update && apt-get install -my \
  vim \
  curl \
  wget \
  git \
  zip \
  libpq-dev \
  libzip-dev \
  gnupg2 \
  apt-transport-https \
  apt-utils


RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

RUN docker-php-source extract \
    && pecl install redis zip \
    && docker-php-ext-enable redis zip \
    && docker-php-source delete \
    && docker-php-ext-install pdo pdo_pgsql \
    && docker-php-source delete

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
RUN chmod +x /usr/local/bin/composer

RUN usermod -u 500 www-data
WORKDIR /var/www/showcase
ADD ./ /var/www/showcase
RUN rm -rf /var/www/showcase/cache/*
RUN rm -rf /var/www/showcase/cache/*
RUN rm -rf /var/www/.composer
RUN chown -R www-data:www-data /var/www
USER www-data

ADD docker/php-fpm/www.conf /etc/php/7.3/fpm/pool.d/www.conf
ADD docker/php-fpm/php-fpm.conf /etc/php/7.3/fpm/php-fpm.conf
ADD docker/php-fpm/entrypoint.sh /var/www/showcase/entrypoint.sh

RUN composer install --no-interaction -o
RUN yarn install

ENTRYPOINT [ "/var/www/showcase/entrypoint.sh" ]

EXPOSE 9000

