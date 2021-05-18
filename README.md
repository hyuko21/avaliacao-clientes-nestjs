# API de avaliações para medir a experiência dos clientes.

Sistema para medir o nível de satisfação que os clientes têm da marca. Para isso, o cliente poderá dar uma nota (0 a 10), e um comentário em que ele deve indicar o que gostou ou não.

- ## Diagrama ER

Para visualizar o diagrama de entidade-relacionamento do banco de dados:

1. Acessar https://draw.io/
2. Importar o arquivo `avaliacoes-clientes.drawio`

- ## Executando com Docker

Considerando que você já possui `docker` e `docker-compose` instalados e configurados, apropriadamente.

### Antes de começar...

1. Crie uma cópia do arquivo `.env.example` e nomeie-a como `.env.development`;
2. Verifique os dados de acesso ao banco de dados em `docker-compose.yml` e certifique-se de que as variáveis `DB_USERNAME`, `DB_PASSWORD` e `DB_DATABASE` possuem valores correspondentes aos valores presentes em `docker-compose.yml`;
3. Altere `DB_HOST` para o valor `postgres`.

### Inicializando os serviços...

```bash
# Construindo a aplicação e iniciando os serviços (NestJS, Postgres)
$ docker-compose up -d
```

### Executando Migrações ao banco de dados

Atenção! Certifique-se de que as configurações presentes em `ormconfig.js` estejam de acordo com os dados de acesso dispostos em `docker-compose.yml`.

```bash
# Configurando o banco de dados
$ docker-compose exec app yarn create:db
```

## Instalação

```bash
$ yarn install
```

## Executando Migrações ao banco de dados

Atenção! Certifique-se de que as configurações presentes em `ormconfig.js` estejam de acordo com os dados de acesso dispostos em `docker-compose.yml`.

```bash
# Configurando o banco de dados
$ yarn create:db
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testando

```bash
# all tests
$ npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
