set -x

awk 'BEGIN { FS = "\t" } ; { print "SET" OFS $1 OFS "\"" $2 "\"" }' ./filtered_files/title.basics.slim.tsv > ./db/titles.txt

head -n 3 ./db/titles.txt

awk 'BEGIN { FS = "\t" } ; { print "SET" OFS $1 OFS "\"" $2 "\"" }' ./filtered_files/name.basics.slim.tsv > ./db/names.txt

head -n 3 ./db/names.txt

# awk 'BEGIN { FS = "\t"} ; p1!=$1 {print prev;prev=""}
# {p1=$1;prev=(prev"") ? prev OFS $2 : "SADD" OFS "principals-by-title." $1 OFS $2}
# END{if(prev"") print prev}' ./filtered_files/title.principals.filtered.tsv > ./db/principals-by-title.txt

head -n 3 ./db/principals-by-title.txt

# awk 'BEGIN { FS = "\t"} ; p2!=$2 {print prev;prev=""}
# {p2=$2;prev=(prev"") ? prev OFS $1 : "SADD" OFS "titles-by-principal." $2 OFS $1}
# END{if(prev"") print prev}' ./filtered_files/principals.title.filtered.tsv > ./db/titles-by-principal.txt

head -n 3 ./db/titles-by-principal.txt