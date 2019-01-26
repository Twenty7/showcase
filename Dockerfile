FROM php:7.3-fpm

RUN apt-get update && apt-get install -my \
  curl \
  wget \
  git \
  zip \
  libpq-dev

RUN docker-php-source extract \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-source delete \
    && docker-php-ext-install pdo pdo_pgsql \
    && docker-php-source delete

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
RUN chmod +x /usr/local/bin/composer

RUN useradd -ms /bin/bash docker
USER docker

ADD docker/php-fpm/www.conf /etc/php/7.3/fpm/pool.d/www.conf
ADD docker/php-fpm/php-fpm.conf /etc/php/7.3/fpm/php-fpm.conf

WORKDIR /code
ADD ./ /code

RUN composer install --no-dev --no-interaction -o

CMD ["php-fpm", "-F"]

EXPOSE 9000
