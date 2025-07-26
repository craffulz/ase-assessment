# Nombre de la instancia de Cloud SQL (debe ser pasado como variable de entorno)
INSTANCE=$CLOUD_SQL_INSTANCE
# Iniciar Cloud SQL Proxy en segundo plano con logs detallados
./cloud_sql_proxy -instances=${INSTANCE}=tcp:5432 -verbose > proxy.log 2>&1 &
# Esperar a que el proxy abra el puerto 5432
echo "Esperando a que Cloud SQL Proxy se inicie en el puerto 5432..."
for i in 1 2 3 4 5 6 7 8 9 10; do
  if nc -z localhost 5432; then
    echo "¡Cloud SQL Proxy está en funcionamiento!"
    break
  fi
  echo "Intento $i: Proxy no listo, reintentando en 1 segundo..."
  sleep 1
done