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

Base url to API:
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


## License

Licensed under [MIT](./LICENSE).
