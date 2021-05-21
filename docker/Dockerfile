FROM sitespeedio/node:ubuntu-20.04-nodejs-12.18.2

COPY ./api /home/api

RUN DEBIAN_FRONTEND="noninteractive" apt-get update \
&& DEBIAN_FRONTEND="noninteractive" apt-get install -y libgbm-dev \
&& DEBIAN_FRONTEND="noninteractive" apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
&& DEBIAN_FRONTEND="noninteractive" wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
&& DEBIAN_FRONTEND="noninteractive" dpkg -i google-chrome-stable_current_amd64.deb \
&& DEBIAN_FRONTEND="noninteractive" apt-get -y install ffmpeg \
&& cd /home/api && npm install && npm i --save @wppconnect-team/wppconnect

WORKDIR /home/api/

CMD [ "npm", "start" ]