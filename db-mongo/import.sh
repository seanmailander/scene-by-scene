#! /bin/bash

set -x;

sleep 5;

mongoimport --host mongodb --username root --password example --db admin --collection titles --drop --type tsv --columnsHaveTypes --fields="title.string(),name.string()" --file /seeddata/data/titles.tsv

mongoimport --host mongodb --username root --password example --db admin --collection principals --drop --type tsv --columnsHaveTypes --fields="principal.string(),name.string()" --file /seeddata/data/names.tsv

mongoimport --host mongodb --username root --password example --db admin --collection principalsbytitle --drop --type json --jsonArray --file /seeddata/data/principals-by-title.json

mongoimport --host mongodb --username root --password example --db admin --collection titlesbyprincipal --drop --type json --jsonArray --file /seeddata/data/titles-by-principal.json