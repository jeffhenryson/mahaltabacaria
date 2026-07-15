#!/bin/bash
# Script para executar o seed de usuários de teste no container postgres-mahal

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="${SCRIPT_DIR}/seed-users.sql"

echo "=== Iniciando o seed de usuários de teste ==="

# Verifica se o container postgres-mahal está rodando
if ! docker ps --format '{{.Names}}' | grep -q '^postgres-mahal$'; then
    echo "Erro: O container 'postgres-mahal' não está em execução. Certifique-se de iniciar o Docker primeiro."
    exit 1
fi

echo "Executando o script SQL no container..."
docker exec -i postgres-mahal psql -U postgres -d security < "$SQL_FILE"

if [ $? -eq 0 ]; then
    echo "=== Seed concluído com sucesso! ==="
    echo "Usuários disponíveis para teste:"
    echo "  - dev      (Senha: Dev@secure1!)"
    echo "  - admin    (Senha: Admin@secure1!)"
    echo "  - gerente  (Senha: Gerente@secure1!)"
    echo "  - vendedor (Senha: Vendedor@secure1!)"
    echo "  - cliente  (Senha: Cliente@secure1!)"
else
    echo "Erro: Falha ao executar o seed de usuários no banco de dados."
    exit 1
fi
