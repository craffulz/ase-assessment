#!/bin/bash

# ... (código anterior del proxy) ...

# 5. Esperar activamente hasta 30 segundos
echo "Esperando conexión a PostgreSQL (máx 30 segundos)..."
timeout 30 bash -c 'until nc -z localhost 5432; do sleep 1; echo "Esperando..."; done'

if [ $? -ne 0 ]; then
  echo "❌ ERROR: Timeout esperando PostgreSQL"
  echo "=== Logs del proxy ==="
  cat proxy.log
  exit 1
fi

# 6. Verificar conexión con comando real
echo "Verificando conexión con psql..."
PGPASSWORD=$DB_PASSWORD psql -h localhost -p 5432 -U $DB_USER -d $DB_NAME -c "SELECT 1" > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ PostgreSQL listo para conexiones"
else
  echo "❌ ERROR: No se pudo conectar a PostgreSQL"
  echo "=== Logs del proxy ==="
  cat proxy.log
  exit 1
fi

# 7. Iniciar aplicación
echo "🚀 Iniciando aplicación Node.js"
exec node index.js