ติดตั้ง NodeJs

``` sh
curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh

sudo bash /tmp/nodesource_setup.sh

sudo apt install nodejs
```

ติดตั้ง PM2

``` sh
sudo npm install -g pm2
```

Download repo ของ Uptime Kuma จาก Github

``` sh
git clone https://github.com/louislam/uptime-kuma.git

cd uptime-kuma
```

ติดตั้งและ Start

``` sh
npm run setup

pm2 install pm2-logrotate

pm2 start server/server.js --name uptime-kuma
```

บันทึกการตั้งค่าของ PM2 และสั่งให้ auto start

``` sh
pm2 save && pm2 startup
```

<figure>
<img src="UptimeKuma-media/082b5af24a905fb386982437de0197b22b4809f3.png"
title="wikilink" alt="Pastedimage20240801215608.png" />
<figcaption
aria-hidden="true">Pastedimage20240801215608.png</figcaption>
</figure>

`sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu`

เข้าใช้งาน

<figure>
<img src="UptimeKuma-media/a33f5b6919959b5dc1999322039c9b0497519185.png"
title="wikilink" alt="Pastedimage20240801215647.png" />
<figcaption
aria-hidden="true">Pastedimage20240801215647.png</figcaption>
</figure>

<figure>
<img src="UptimeKuma-media/5618febbf15cb82cfc3ff8f616e2c402a57592c9.png"
title="wikilink" alt="Pastedimage20240801215800.png" />
<figcaption
aria-hidden="true">Pastedimage20240801215800.png</figcaption>
</figure>

จากนั้นทำการสร้างช่องทางสำหรับแจ้งเตือน โดยกดปุ่ม Profile -\> Settings

<figure>
<img src="UptimeKuma-media/b4ffbb28ec6630d70d2a3cc068722acf551e1f0f.png"
title="wikilink" alt="Pastedimage20240801215854.png" />
<figcaption
aria-hidden="true">Pastedimage20240801215854.png</figcaption>
</figure>

<figure>
<img src="UptimeKuma-media/08ad9d1eccd09d7f75f23410f9515c49a5ea613c.png"
title="wikilink" alt="Pastedimage20240801215924.png" />
<figcaption
aria-hidden="true">Pastedimage20240801215924.png</figcaption>
</figure>

เลือกช่องทางการแจ้งเตือนที่ต้องการ

<figure>
<img src="UptimeKuma-media/7cb1f3478647d18d997ef8de1e7805065175f9ab.png"
title="wikilink" alt="Pastedimage20240801220011.png" />
<figcaption
aria-hidden="true">Pastedimage20240801220011.png</figcaption>
</figure>

จากนั้นกดปุ่ม Add New Monitor

<figure>
<img src="UptimeKuma-media/e745c9a2012dd1f68cfb980980b613d257da66aa.png"
title="wikilink" alt="Pastedimage20240801220047.png" />
<figcaption
aria-hidden="true">Pastedimage20240801220047.png</figcaption>
</figure>

ตัวอย่างเช่น Monitor เว็บ Google

<figure>
<img src="UptimeKuma-media/0566d037659c1dc41f57f78f54c7de2f219fc651.png"
title="wikilink" alt="Pastedimage20240801220107.png" />
<figcaption
aria-hidden="true">Pastedimage20240801220107.png</figcaption>
</figure>

<figure>
<img src="UptimeKuma-media/c203fa4da4c1c297876b73f9ed3cdd5d545af788.png"
title="wikilink" alt="Pastedimage20240801220134.png" />
<figcaption
aria-hidden="true">Pastedimage20240801220134.png</figcaption>
</figure>
