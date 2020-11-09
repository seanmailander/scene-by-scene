# ➜  scene-by-scene git:(master) ✗ fgrep 'tt0242653' title.principals.tsv
# tt0242653	10	nm0821205	editor	\N	\N
# tt0242653	1	nm0000206	actor	\N	["Neo"]
# tt0242653	2	nm0000401	actor	\N	["Morpheus"]
# tt0242653	3	nm0005251	actress	\N	["Trinity"]
# tt0242653	4	nm0915989	actor	\N	["Agent Smith"]
# tt0242653	5	nm0905154	director	\N	\N
# tt0242653	6	nm0905152	director	\N	\N
# tt0242653	7	nm0005428	producer	producer	\N
# tt0242653	8	nm0204485	composer	\N	\N
# tt0242653	9	nm0691084	cinematographer	director of photography	\N

# actor, actress, self, director, composer


# ➜  scene-by-scene git:(master) ✗ cut -f 2 title.basics.tsv | sort | uniq
# movie
# short
# titleType
# tvEpisode
# tvMiniSeries
# tvMovie
# tvSeries
# tvShort
# tvSpecial
# video
# videoGame

# ➜  scene-by-scene git:(master) ✗ cut -f 4 title.principals.tsv | sort | uniq
# actor
# actress
# archive_footage
# archive_sound
# category
# cinematographer
# composer
# director
# editor
# producer
# production_designer
# self
# writer

# Only get entries from the "movie" category
awk 'BEGIN { FS = "\t" } ; $2 == "movie" { print $1 "\t" $3}' title.basics.tsv > title.basics.slim.tsv

# Extract the title identifiers
awk 'BEGIN { FS = "\t" } ; { print $1 }' title.basics.slim.tsv > title.basics.ids.tsv

# Find any principals from these titles
awk -v FS="\t" '
    NR == FNR {Ids[$0]; next; }
    $1 in Ids
' title.basics.ids.tsv title.principals.tsv > title.principals.matchingids.tsv

# Get only roles we care about
awk 'BEGIN { FS = "\t" } ; ($4 == "actor" || $4 == "actress" || $4 == "composer" || $4 == "director" || $4 == "self") { print $1 "\t" $3 "\t" $4}' title.principals.matchingids.tsv > title.principals.filtered.tsv

# Get the name identifier
awk 'BEGIN { FS = "\t" } ; { print $2 }' title.principals.filtered.tsv > title.principals.ids.tsv

# Unique the name identifiers
sort -u -o title.principals.ids.tsv{,}

# Find these names
awk -v FS="\t" '
    NR == FNR {Ids[$0]; next; }
    $1 in Ids
' title.principals.ids.tsv name.basics.tsv > name.basics.matchingids.tsv

# Slim these names
awk 'BEGIN { FS = "\t" } ; { print $1 "\t" $2 "\t" $6}' name.basics.matchingids.tsv > name.basics.slim.tsv