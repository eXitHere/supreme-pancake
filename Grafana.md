<figure>
<img src="Grafana-media/ff9c089d9ff1bb8a5d20f5227e8df8aab30957cb.png"
title="wikilink" alt="Pastedimage20240801210136.png" />
</figure>

Update และติดตั้ง Package ที่สำคัญ

```bash
sudo apt update
sudo apt upgrade -y
sudo apt-get install -y apt-transport-https software-properties-common wget
```

<figure>
<img src="Grafana-media/b8aca8a4ee51d12b6669da7300c2019949ca5849.png"
title="wikilink" alt="Pastedimage20240801205549.png" />
</figure>

Import the GPG key

```bash
sudo mkdir -p /etc/apt/keyrings/

wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null

echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list

sudo apt update
```

<figure>
<img src="Grafana-media/f325c75500e9ae38b2c0380c9f9fa8841376eb0b.png"
title="wikilink" alt="Pastedimage20240801205633.png" />
</figure>

ติดตั้ง Grafana

```bash
sudo apt-get install grafana
```

<figure>
<img src="Grafana-media/54fb995748fc5c999b5913ab56fdc4acd8cd3a51.png"
title="wikilink" alt="Pastedimage20240801205647.png" />
</figure>

หากต้องการแก้ไขการตั้งค่าต่าง ๆ ของ grafana สามารถแก้ไขได้ที่ `/etc/grafana/grafana.ini`

```sh
sudo nano /etc/grafana/grafana.ini

# The http port  to use
;http_port = 3000
```

ทำการเปิดการใช้งาน grafana-server

```bash
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl status grafana-server
sudo systemctl enable grafana-server.service
```

เข้าใช้งาน

    http://server_ip:3000

    default credential -> admin:admin

<figure>
<img src="Grafana-media/4162a23f6d20641d50615d6a7f52d59e6350a39e.png"
title="wikilink" alt="Pastedimage20240801205858.png" />
</figure>

เมื่อเข้าใช้งานครั้งแรก ระบบจะบังคับให้เปลี่ยนรหัสผ่านใหม่

<figure>
<img src="Grafana-media/8617e6e0a196838a3b284fa5f7aaaa2e6ecd1ecd.png"
title="wikilink" alt="Pastedimage20240801210212.png" />
</figure>

<figure>
<img src="Grafana-media/501ba7b5643574c9c6774663c40bbe3a57263f7b.png"
title="wikilink" alt="Pastedimage20240801210408.png" />
</figure>

![Pasted image 20240801210604.png](Grafana-media/5b9216f6efb723b3f7f83a92337abc22d2e32093.png 'wikilink')
ที่มา https://blog.devops.dev

ติดตั้ง prometheus

สร้าง User prometheus ซึ่งเป็นเพียง Service User ไม่สามารถ Login ได้

```sh
sudo useradd -M -r -s /bin/false prometheus
```

สร้าง Directory ที่จำเป็น

```sh
sudo mkdir /etc/prometheus /var/lib/prometheus
```

ดาวโหลด Prometheus จาก Github

```sh
cd /tmp
wget https://github.com/prometheus/prometheus/releases/download/v2.45.6/prometheus-2.45.6.linux-amd64.tar.gz
tar xzf prometheus-2.45.6.linux-amd64.tar.gz
```

Copy ไฟล์และแก้ไขสิทธิ์ต่าง ๆ

```sh
sudo cp prometheus-2.45.6.linux-amd64/{prometheus,promtool} /usr/local/bin/

sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}

sudo cp -r prometheus-2.45.6.linux-amd64/{consoles,console_libraries} /etc/prometheus/

sudo cp prometheus-2.45.6.linux-amd64/prometheus.yml /etc/prometheus/

sudo chown -R prometheus:prometheus /etc/prometheus

sudo chown prometheus:prometheus /var/lib/prometheus
```

แก้ไข Configure

```sh
sudo nano /etc/prometheus/prometheus.yml
```

```sh
scrape_configs:
...
### เพิ่มตรงนี้
  - job_name: "node"
    static_configs:
      - targets: ["localhost:9100"]
```

<figure>
<img src="Grafana-media/c6c8fc564af86ae4184e30791330c2fe5f03475c.png"
title="wikilink" alt="Pastedimage20240801211128.png" />
</figure>

สร้างไฟล์ Service

```sh
sudo nano /etc/systemd/system/prometheus.service
```

```sh
[Unit]
Description=Prometheus Time Series Collection and Processing Server
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.listen-address 0.0.0.0:9090 \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Start Service

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now prometheus
sudo systemctl status prometheus
```

ติดตั้ง node_exporter

```sh
sudo useradd -M -r -s /bin/false node_exporter

cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz

tar xvf node_exporter-1.8.1.linux-amd64.tar.gz

sudo mv node_exporter-1.8.1.linux-amd64 /opt/node_exporter
sudo chown -R node_exporter:node_exporter /opt/node_exporter

sudo nano /etc/systemd/system/node_exporter.service
```

```sh
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/opt/node_exporter/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
sudo systemctl restart prometheus
```

<figure>
<img src="Grafana-media/1cec3d40fea2cedeada4acc2dc55d08a2c0d4855.png"
title="wikilink" alt="Pastedimage20240801211341.png" />
</figure>

Connect Prometheus to grafana

ไปที่เมนู Connections -\> Add new connection -\> Data source

<figure>
<img src="Grafana-media/2d7fd1d25b8b19fd884844b81aef10c9a247f6f7.png"
title="wikilink" alt="Pastedimage20240801212050.png" />
</figure>

<figure>
<img src="Grafana-media/38efbc740103e4c2523cc887e1c1e209e5347356.png"
title="wikilink" alt="Pastedimage20231013134107.png" />
</figure>

โดยในส่วนของ Prometheus server url ให้ใส่เป็น IP ของ server ที่ติดตั้ง Prometheus ไว้ ตามด้วย port 9090

<figure>
<img src="Grafana-media/847e7471aa92b9414bd8058d282ddf79eebd43a5.png"
title="wikilink" alt="Pastedimage20231013134123.png" />
</figure>

หากกด Save & Test แล้วได้ message แบบด้านล่าง แสดงว่าใช้งานได้

<figure>
<img src="Grafana-media/81fc142fbe438781ecdd726bc05fd37f61b46d50.png"
title="wikilink" alt="Pastedimage20240801212318.png" />
</figure>

จากนั้นทำการสร้าง Dashboard เพิ่ม ไปยัง Home -\> Dashboard และกดปุ่ม New

<figure>
<img src="Grafana-media/71e0202d60017f069ab1664df24a18c00ca2efc2.png"
title="wikilink" alt="Pastedimage20231013140827.png" />
</figure>

<figure>
<img src="Grafana-media/aef2968e587c6690e7439b123f7721221dcde70e.png"
title="wikilink" alt="Pastedimage20231013140841.png" />
</figure>

Grafana Linux Dashboard: **1860**

<figure>
<img src="Grafana-media/4f144361e6bd1a9b2d2697455a53cdb97633901b.png"
title="wikilink" alt="Pastedimage20231013140916.png" />
</figure>

<figure>
<img src="Grafana-media/dee45e32f01fb4395cf3048233b033c4e34e63dd.png"
title="wikilink" alt="Pastedimage20240801212427.png" />
</figure>

<figure>
<img src="Grafana-media/35ac6476ebde6deb6e1857fccd85488231470efb.png"
title="wikilink" alt="Pastedimage20240801212444.png" />
</figure>

หากต้องการเพิ่มการแจ้งเตือน

สร้าง Contact Point สำหรับส่งการแจ้งเตือน

<figure>
<img src="Grafana-media/0d8f859eee11389c1d4fb6d062647a703e3f56d7.png"
title="wikilink" alt="Pastedimage20240801212525.png" />
</figure>

ตัวอย่างจะเป็นการสร้าง Line Notify โดยให้เลือก Integration เป็น LINE และนำ Token มาใส่

<figure>
<img src="Grafana-media/5c99e76acfbb32631a4ce70d49c2e1fe314de19f.png"
title="wikilink" alt="Pastedimage20240801212616.png" />
</figure>

<figure>
<img src="Grafana-media/6ba2b08c5cb82d2bff2f3a9076d6394e4e1e9576.png"
title="wikilink" alt="Pastedimage20240801212803.png" />
</figure>

<figure>
<img src="Grafana-media/e090332b4c97be21507ea4342e87c0308e6653ef.png"
title="wikilink" alt="Pastedimage20240801212856.png" />
</figure>

ทำการสร้าง New Alert Rule

<figure>
<img src="Grafana-media/d5c4f9e7ea8e837cec0d72e4e45a1f56fe6bba7c.png"
title="wikilink" alt="Pastedimage20240801212934.png" />
</figure>

กลับไปยัง Dashboard และทำการ Copy Query ที่ต้องการจะสร้างการแจ้งเตือน

<figure>
<img src="Grafana-media/d1922394462b9e896586400b9a34410c5bb1a50a.png"
title="wikilink" alt="Pastedimage20240801213143.png" />
</figure>

<figure>
<img src="Grafana-media/4f1994e2fcd20e9e745a0bb5dc188f90de5f9269.png"
title="wikilink" alt="Pastedimage20240801213201.png" />
</figure>

กลับมายังในส่วนของ Define query and alert condition จากนั้นปรับเป็น Mode Code และนำ Query มาวาง
โดยสามารถทดสอบรันได้โดยกดปุ่ม Run queries และดูผลลัพธ์ด้านล่าง

<figure>
<img src="Grafana-media/a95f4b05db63bfc75a9eaa9a90f252ff4417c551.png"
title="wikilink" alt="Pastedimage20240801213241.png" />
</figure>

จากนั้นทำการปรับ Condition ที่ตามที่ต้องการ
![Pasted image 20240801213407.png](Grafana-media/93d3bce93e45b0086f043c34cc605def4894c030.png 'wikilink')

หลังแก้ไข

<figure>
<img src="Grafana-media/218e51620ce41da1c4dc25664e3423fce5745952.png"
title="wikilink" alt="Pastedimage20240801213714.png" />
</figure>

จากนั้นตั้งค่า Folder โดยหากยังไม่มีการสร้างไว้และสามารถสร้างใหม่ได้เลย

<figure>
<img src="Grafana-media/965b09901959fb6449604914f0036dff5e6a1ce6.png"
title="wikilink" alt="Pastedimage20240801213440.png" />
</figure>

<figure>
<img src="Grafana-media/61f01090a7676e7d921ea3aede02c45a7eb2c1cb.png"
title="wikilink" alt="Pastedimage20240801213518.png" />
</figure>

จากนั้นทำการเลือก Contact Point ที่ต้องการให้มีการแจ้งเตือน

<figure>
<img src="Grafana-media/8be135ec2457f97e554452115ccebb9b0e127334.png"
title="wikilink" alt="Pastedimage20240801213629.png" />
</figure>

และกดบันทึก

<figure>
<img src="Grafana-media/5e8684334fcd53d60a5788f1ae1f83300385ae73.png"
title="wikilink" alt="Pastedimage20240801213643.png" />
</figure>

<figure>
<img src="Grafana-media/34141d24b917bade0a54bece61f0dcf78944b7cf.png"
title="wikilink" alt="Pastedimage20240801213729.png" />
</figure>

จากนั้นทดสอบทำให้ใช้ Disk มากยิ่งขึ้นเพื่อให้ถึง Condition

<figure>
<img src="Grafana-media/e5facba335d236362d8164914e44e433d3330b5e.png"
title="wikilink" alt="Pastedimage20240801213920.png" />
</figure>

<figure>
<img src="Grafana-media/c995fe09c1617e5afff5934e863064f678db9c51.png"
title="wikilink" alt="Pastedimage20240801214032.png" />
</figure>

หมายเหต: จริง ๆ เป็นการ Storage Check แต่ในรูปพิมพ์ผิดเป็น Ram Check

<figure>
<img src="Grafana-media/dac3d0eec1990e7bb7ddd2a095cf02b3471d0efa.png"
title="wikilink" alt="Pastedimage20240801214057.png" />
</figure>

ตั้งค่าเพิ่มเติมเกี่ยวกับ Firewall

```sh
sudo ufw allow from <IP_ADDRESS> to any port 9090
sudo ufw allow from <IP_ADDRESS> to any port 3000
```
