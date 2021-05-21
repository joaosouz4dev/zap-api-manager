#!/bin/bash
whiptail --title "Instalação Zap Api Manager" --msgbox "Aperte ENTER para iniciar a instalação do Zap Api Manager" --fb 10 50
sudo apt update -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common nodejs npm
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt update -y
sudo apt-get -y install docker-ce
sudo apt install -y wget zip
sudo apt install -y nginx
sudo apt install -y certbot python3-certbot-nginx
sudo apt install -y git-all
mkdir /etc/nginx/proxy
   dominio=$(whiptail --title "Dominio para o Zap Api Manager" --inputbox "Digite o dominio :" --fb 10 60 3>&1 1>&2 2>&3)
   echo 'server {
 root /var/www/html;
 index index.html index.htm index.nginx-debian.html;
 server_name '$dominio';
 
        location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

    include /etc/nginx/proxy/*.conf;
}' >> /etc/nginx/sites-enabled/default
service nginx restart
certbot -d $dominio
service nginx restart
token=$(whiptail --title "Token do Zap Api Manager" --inputbox "Digite um Token :" --fb 10 60 3>&1 1>&2 2>&3)
mkdir /home/api
git clone https://github.com/joaosouz4dev/zap-api-manager.git /home/api/
npm install /home/api/
echo 'TOKEN='$token'' >> /home/api/.env
token_system=$(whiptail --title "Token Conexão API" --inputbox "Digite um Token :" --fb 10 60 3>&1 1>&2 2>&3)
echo '
TOKEN_SYSTEM='$token_system'
' >> /home/api/docker/venom-api/.env
docker build -t api /home/api/docker/
npm install pm2 -g
pm2 start /home/api/index.js --name ZAPAPIMANAGER
echo "Instalação Concluida com Sucesso!"