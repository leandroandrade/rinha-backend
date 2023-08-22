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

## Imagem Docker

Construir imagem:
```sh
docker build -t leandroandrade/rinha-backend-2023-q3 .
```

## Containers Dev

Iniciar containers:
```sh
docker compose -f docker-compose-dev.yml up --build -d
```

Finalizar containers:
```sh
docker compose -f docker-compose-dev.yml down -v
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
