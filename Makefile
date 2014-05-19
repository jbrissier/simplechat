project = base
app?=zodiac

dumpdata:
	python2.7 ./manage.py dumpdata --indent 4 --natural auth --exclude auth.permission > $(project)/fixtures/bootstrap_auth.json
	python2.7 ./manage.py dumpdata --indent 4 --natural sites > $(project)/fixtures/bootstrap_sites.json


loaddata:
	python2.7 manage.py loaddata $(project)/fixtures/bootstrap_auth.json
	python2.7 manage.py loaddata $(project)/fixtures/bootstrap_sites.json

syncdb:
	python2.7 manage.py syncdb --all --noinput
	python2.7 manage.py migrate --fake

build: syncdb loaddata

flush:
	python2.7 manage.py flush --noinput

rebuild: flush build

run:
	python manage.py runserver

pip:
	pip install -r requirements.txt

test:
	py.test $(app)
	#./manage.py test $(app) -v 2
