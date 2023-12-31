# rinha-backend

PoC para a rinha de backend.

Desafio proposto: https://github.com/zanfranceschi/rinha-de-backend-2023-q3/tree/main

## Get started

Detalhes para configurar o ambiente local:

Instalando dependências:

```shell
npm install
```

Configurando .env file

```shell
cp .env.example .env
```

Iniciando aplicação em desenvolvimento:

```shell
npm run dev
```

Base url API:
```
http://localhost:3000/
```

## Tests

Iniciar containers:
```shell
docker compose up -d
```

Executar testes:

```shell
npm t
```

Finalizar containers:
```shell
docker compose down -v
```

## Load Test

Criar pessoa:
```sh
autocannon -c 10 -p 10 -m POST -H "Content-Type:application/json" -i request.json http://127.0.0.1:3000/pessoas

autocannon -c 10 -p 10 -m POST -H "Content-Type:application/json" -i request.json http://127.0.0.1:9999/pessoas
```

## Imagem Docker

Construir imagem:
```sh
docker build -t leandromandrade/rinha-backend-2023-q3 .
```

## Containers Dev

Iniciar containers:
```sh
docker compose -f docker-compose.yml up --build -d
```

Finalizar containers:
```sh
docker compose -f docker-compose.yml down -v
```

## Containers Produção

Iniciar containers:
```sh
docker compose -f docker-compose-production.yml up -d
```

Finalizar containers:
```sh
docker compose -f docker-compose-production.yml down -v
```

## Docker Hub

Publicando imagem:
```shell
docker login
```

Enviando imagem:
```shell
docker push leandromandrade/rinha-backend-2023-q3
```



## Miscellaneous

Status de execução de query no MongoDB:
```js
db.pessoas.find(
   { $text: { $search: 'rau' } }
).explain("executionStats")
```

Links úteis:
- https://www.digitalocean.com/community/tutorials/how-to-perform-full-text-search-in-mongodb
- https://www.mongodb.com/docs/v5.0/reference/text-search-languages/#std-label-text-search-languages
- https://node-tap.org/docs/api/asserts/
- https://fakerjs.dev/api/

## License

Licensed under [MIT](./LICENSE).
