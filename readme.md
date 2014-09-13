# Bootstrap

This a boostrap Django project.
It is not ready for production


## Features
 - Django 1.7
 - Compressor plugin
 - Haml support


## Installation
First create a virtualevn

    virtualenv env

activate the virtualenv

    source env/bin/activate

install the dependencies

    pip install -r requirements.txt

create the db and migrate the database

    python manage.py migrate


create super user

    python manage.py createsuperuser



## Todo:
 - Change secret key in you base/settings.py