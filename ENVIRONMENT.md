# Variáveis de Ambiente

Este arquivo documenta as variáveis de ambiente necessárias para executar a aplicação.

## Variáveis Obrigatórias

### DATABASE_URL
URL de conexão com o banco de dados PostgreSQL.

**Formato:**
```
postgresql://username:password@host:port/database_name
```

**Exemplo para Railway:**
```
postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

### JWT_SECRET
Chave secreta para assinatura dos tokens JWT.

**Exemplo:**
```
JWT_SECRET="sua-chave-secreta-muito-segura-aqui"
```

### PORT (Opcional)
Porta onde o servidor será executado. Padrão: 3336

**Exemplo:**
```
PORT=3336
```

## Configuração no Railway

1. Acesse o painel do Railway
2. Vá para a aba "Variables"
3. Adicione as seguintes variáveis:
   - `DATABASE_URL`: Use a URL fornecida pelo Railway PostgreSQL
   - `JWT_SECRET`: Crie uma chave secreta forte
   - `PORT`: Deixe vazio para usar a porta padrão do Railway

## Configuração Local

1. Copie o arquivo `.env.example` para `.env`
2. Edite o arquivo `.env` com suas configurações locais
3. Execute `yarn dev` para iniciar o servidor

## Troubleshooting

### Erro P1012 - Database Connection Error
Este erro indica problemas de conexão com o banco de dados.

**Possíveis causas:**
- DATABASE_URL mal configurada
- Banco de dados não está acessível
- Credenciais incorretas
- Firewall bloqueando conexão

**Soluções:**
1. Verifique se a DATABASE_URL está correta no Railway
2. Teste a conexão localmente com `yarn check-db`
3. Verifique se o banco PostgreSQL está ativo no Railway
4. Confirme se as credenciais estão corretas

### Erro P3009 - Migration Error
Este erro indica problemas com migrações do banco.

**Soluções:**
1. Execute `yarn prisma migrate reset` localmente
2. Verifique se as migrações estão sincronizadas
3. Use `yarn prisma db push` como alternativa

### Verificação de Banco de Dados
Execute o comando para verificar a conexão:
```bash
yarn check-db
``` 