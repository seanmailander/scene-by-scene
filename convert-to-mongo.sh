set -x

# Titles as simple TSV
awk 'BEGIN { FS = "\t"; OFS ="\t" } ; { print $1 OFS $2 }' ./filtered_files/title.basics.slim.tsv > ./db-mongo/data/titles.tsv

head -n 3 ./db-mongo/data/titles.tsv

# Names as simple TSV
awk 'BEGIN { FS = "\t"; OFS ="\t"} ; { print $1 OFS $2 }' ./filtered_files/name.basics.slim.tsv > ./db-mongo/data/names.tsv

head -n 3 ./db-mongo/data/names.tsv

# Principals by Title as JSON
awk 'BEGIN { FS = "\t"; print "[" } ; p1!=$1 && p1"" { printf("{\"title\":\"%s\",\"principals\":[%s]},\n",p1,prev) ;prev=""}
{p1=$1;prev=(prev"") ? prev ",\"" $2 "\"" : "\"" $2 "\""}
END{if(prev"") printf("{\"title\":\"%s\",\"principals\":[%s]}\n",p1,prev); print "]"}' ./filtered_files/title.principals.filtered.tsv > ./db-mongo/data/principals-by-title.json

head -n 3 ./db-mongo/data/principals-by-title.json

# Titles by Principal as JSON
awk 'BEGIN { FS = "\t"; print "["} ; p2!=$2 && p2"" { printf("{\"principal\":\"%s\",\"titles\":[%s]},\n",p2,prev) ;prev=""}
{p2=$2;prev=(prev"") ? prev ",\"" $1 "\"" : "\"" $1 "\""}
END{if(prev"") printf("{\"principal\":\"%s\",\"titles\":[%s]}\n",p2,prev); print "]"}' ./filtered_files/principals.title.filtered.tsv > ./db-mongo/data/titles-by-principal.json

head -n 3 ./db-mongo/data/titles-by-principal.json