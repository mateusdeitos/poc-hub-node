
# Para rodar

- criar `.env` baseado no `.env.example` (DB_HOST usar 'db' pois está rodando dentro do docker)
- rodar `docker compose up -d`
- inspecionar logs `docker compose logs -f`
- para debuggar, basta rodar o debugger do vscode com o container rodando, ele irá conectar


### dicas
achar ip do wsl: ifconfig | grep -Pzo 'eth0.*\n.*inet.*'
