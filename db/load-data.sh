set -x;

sleep 5;

/bin/cat /data/names.txt | redis-cli --pipe -h redis
/bin/cat /data/titles.txt | redis-cli --pipe -h redis
/bin/cat /data/principals-by-title.txt | redis-cli --pipe -h redis
/bin/cat /data/titles-by-principal.txt | redis-cli --pipe -h redis
