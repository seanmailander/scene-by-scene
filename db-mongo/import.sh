#! /bin/bash

set -x;

sleep 5;

mongoimport --host mongodb --username root --password example --db admin --collection movies --type tsv --fields="title.string(),name.string()" --file /seeddata/data/title.basics.slim.tsv