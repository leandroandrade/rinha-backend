set -e

mongo <<EOF
db = db.getSiblingDB('rinha_backend')
db.createCollection('pessoas')

db.pessoas.createIndex({ "apelido": "text", "nome": "text", "stack": "text" });
db.pessoas.createIndex({ "id": 1 });
db.pessoas.createIndex({ "apelido": 1 }, { unique: true });
EOF
