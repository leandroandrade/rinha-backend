set -e

mongo <<EOF
db = db.getSiblingDB('rinha_backend')
db.createCollection('pessoas')
EOF
