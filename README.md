# Habilidades

Neste projeto, você será capaz de:

- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

---

## O que deverá ser desenvolvido

Para este projeto, você vai desenvolver um **CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_, utilizando _Typescript_.

Você irá criar alguns _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

---

## Desenvolvimento

Você vai desenvolver todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) em seu código e, por meio dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

O código para cadastro de pessoas usuárias deve ser criado por você utilizando os conhecimentos adquiridos nesse bloco.

⚠️ **Dicas Importantes** ⚠️:

- Não haverá front-end neste projeto, portanto não se preocupe com a visualização, apenas com as funcionalidades e organização do código.

- Sua API deve ser desenvolvida dentro da pasta `./src`;

---

##  Todos os seus endpoints devem estar no padrão REST

- Use os verbos `HTTP` adequados para cada operação.

- Agrupe e padronize suas _URL_ em cada recurso.

- Garanta que seus _endpoints_ sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retorne os códigos de _status_ corretos (recurso criado, erro de validação, etc).

---

Há dois arquivos no diretório `./src/`: `index.ts` e `app.ts`, **ambos não devem ser renomeados ou apagados**. 

Você poderá fazer modificações em ambos os arquivos, porém **no arquivo `app.ts` o seguinte trecho de código não deve ser removido**:

```typescript
import express from 'express';

const app = express();

app.use(express.json());

export default app;
```

Isso está configurado para o avaliador funcionar corretamente.

## Conexão com o Banco

A conexão do banco local deverá conter os seguintes parâmetros:

```typescript
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default connection;
```

**:warning: É essencial configurar essas 3 variáveis de ambiente para testar o projeto localmente: :warning:**

```
  host: process.env.MYSQL_HOST
  user: process.env.MYSQL_USER
  password: process.env.MYSQL_PASSWORD
```

**:warning: É essencial que seu arquivo tenha o nome de `connection.ts` e esteja no diretório `src/models` :warning:**

## Tabelas

O banco terá três tabelas: pessoas usuárias, produtos e pedidos.

```sql
DROP SCHEMA IF EXISTS Trybesmith;
CREATE SCHEMA Trybesmith;

CREATE TABLE Trybesmith.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  classe TEXT NOT NULL,
  level INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Trybesmith.Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Trybesmith.Users (id)
);

CREATE TABLE Trybesmith.Products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  orderId INTEGER,
  FOREIGN KEY (orderId) REFERENCES Trybesmith.Orders (id)
);
```

---
## 🚧 Readme em obras 🚧
