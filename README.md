# Consultas Médicas – Guia de Execução

Projeto completo com frontend em React + Vite + Typescript e com Backend Node.js (TypeScript + Prisma + MySQL) containerizado via Docker Compose.
É possível criar e gerenciar consultas, com diferentes tipos de validação.

## Vídeo de demonstração

https://github.com/user-attachments/assets/d8b0e29a-07cc-4ceb-ae63-46645f59d337


## 1. Requisitos

- Docker Desktop (Engine >= 24, Compose v2)
- 2 portas livres no host: 3000 (API) e 3307 (MySQL exposto). Se 3307 ocupada, pode alterar.
- Node 20+ local apenas para desenvolvimento fora do container.

## 2. Clonar & Preparar `.env`

Na raiz existe `.env.example`. Copie para `.env` e substitua com os valores enviados por email ou crie as próprias variáveis caso queira.

Variáveis principais:
| Nome | Função |
|------|--------|
| MYSQL_ROOT_PASSWORD | Senha root do MySQL (usado só se conectar como root) |
| MYSQL_DATABASE | Nome do banco criado ao iniciar o container |
| MYSQL_USER | Usuário de aplicação |
| MYSQL_PASSWORD | Senha do usuário de aplicação |
| BACKEND_PORT | Porta exposta da API no host |
| DATABASE_URL | String de conexão usada pelo Prisma (deve usar host `mysql` e porta interna `3306`) |

IMPORTANTE: Mesmo expondo o MySQL como `3307:3306`, dentro dos containers a porta usada é SEMPRE 3306. Logo **`DATABASE_URL` deve permanecer com `@mysql:3306`**.

## 3. Subir Tudo (Build + Run)

Na raiz do repositório (onde o docker-compose.yml está):

```
docker compose up -d --build
```

Isso criará:

- Serviço `mysql` (porta host 3307 → container 3306)
- Serviço `backend` (porta host 3000 → container 3000)

Verificar logs:

```
docker compose logs -f mysql
docker compose logs -f backend
```

Testar API:

```
curl http://localhost:3000/appointments
```

Você pode testar com o postman baixando o arquivo: `consultas_medicas.postman_collection.json` na pasta public

### Front fora do docker

O frontend roda separadamente (pode olhar o final do README que explica, é o mesmo passo a passo).

## 4. Acessar o Banco de Dados Externamente

Use a porta host 3307:

```
mysql -h 127.0.0.1 -P 3307 -u hospital -p
```

OU via Workbench / DBeaver: host `localhost`, port `3307`.

## 5. Ciclo de Desenvolvimento

### Alterou código TypeScript

O Dockerfile já compila dentro da imagem; basta rebuildar backend:

```
docker compose build backend
docker compose up -d backend
```

### Alterou schema Prisma

1. Local (fora do container) gere migration:
   ```
   cd backend
   npx prisma migrate dev --name ajuste_x
   cd ..
   ```
2. Rebuild backend para aplicar no container (migrate deploy roda no CMD):
   ```
   docker compose build backend
   docker compose up -d backend
   ```

### Só atualizar client (sem migration)

```
cd backend
npx prisma generate
cd ..
docker compose build backend
docker compose up -d backend
```

## 6. Ajustar Portas

Alterar porta externa do MySQL (ex.: 3310) em `docker-compose.yml`:

```
  ports:
    - "3310:3306"
```

# Execução Local Sem Docker

1. Subir MySQL local (criar o banco de dados e usuário ou usar Docker só do MySQL). É necessario criar e alterar o env entro do backend com a url com base nos dados corretos
2. Ajustar `.env` para apontar para `localhost`:
   `DATABASE_URL=mysql://user:password@localhost:3307/consultas_medicas`
3. Backend:
   ```
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```
4. Frontend (em outro terminal):
   ```
   cd frontend
   npm install
   npm run dev
   ```
   - Porta padrão Vite: 5173
   - Ajuste a URL da API se necessário em `frontend/src/config/api-url.ts` (ou crie `.env` com `VITE_API_URL`) para apontar para `http://localhost:3000/appointments`.

## Rodar Apenas o Frontend (consumindo backend já rodando via Docker)

Se o backend já está em containers (porta 3000):

```
cd frontend
npm install
npm run dev
```

# IMPORTANTE

Se não tiver nenhuma especialidade no dropdown é porque não ouve conexão com o backend ou banco, necessário tentar novamente o passo a passo ou verificar bugs

