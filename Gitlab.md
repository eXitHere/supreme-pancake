### วิธีการติดตั้ง Gitlab CE

Update & Upgrade Packages

```sh
sudo apt update && sudo apt upgrade -y
```

<figure>
<img src="Gitlab-media/5719a3891a836e374ebb71cf19f99b27ad53b6c3.png"
title="wikilink" alt="Pastedimage20240801201244.png" />
</figure>

ตั้งค่า Time Zone

```sh
sudo timedatectl set-timezone Asia/Bangkok
```

ติดตั้ง Packages ที่จำเป็นต้องใช้

```sh
sudo apt install build-essential curl openssh-server tzdata debian-archive-keyring lsb-release ca-certificates apt-transport-https software-properties-common
```

<figure>
<img src="Gitlab-media/dd5e40739d962fdf5cbab5d030e4899fc403e213.png"
title="wikilink" alt="Pastedimage20240801201354.png" />
</figure>

ติดตั้ง Gitlab Version CE

```sh
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

<figure>
<img src="Gitlab-media/2eb5dbc33e85e502016553a0a60d0f79c365dbb6.png"
title="wikilink" alt="Pastedimage20240801201542.png" />
</figure>

```sh
sudo apt install gitlab-ce
```

<figure>
<img src="Gitlab-media/ea1c4aab788bb57e894fed5b3c922a1e68a9e18a.png"
title="wikilink" alt="Pastedimage20240801201613.png" />
</figure>

แก้ไขการตั้งค่า Base URL

```sh
sudo nano /etc/gitlab/gitlab.rb
```

<figure>
<img src="Gitlab-media/b8db406d65d9987becc653ab8000bdb2a731d7bc.png"
title="wikilink" alt="Pastedimage20240801201808.png" />
</figure>

เมื่อแก้ไข configure จำเป็นต้องทำการ reconfigure ใหม่ทุกครั้ง

```sh
sudo gitlab-ctl reconfigure
```

<figure>
<img src="Gitlab-media/fc73100b7cc43bf6432149eb207426c6d2b28061.png"
title="wikilink" alt="Pastedimage20240801201912.png" />
</figure>

เมื่อมีการติดตั้ง gitlab server ใหม่ ระบบจะมีการสร้าง root password ให้โดยจะอยู่ในไฟล์ `/etc/gitlab/initial_root_password`

```sh
sudo cat /etc/gitlab/initial_root_password

Password: xxxxx

# NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
```

เข้าสู่หน้า Gitlab ด้วย `http://server-ip` โดย username ใช้เป็น `root` ส่วน password ใช้เป็น initial root password จากไฟล์

<figure>
<img src="Gitlab-media/5723cdbff66666981528712bef5015b74879186f.png"
title="wikilink" alt="Pastedimage20240801202510.png" />
</figure>

ปิดการใช้งานเมนู Sign-up ซึ่งจะเป็นการทำให้ ไม่สามารถสร้าง User ด้วยตัวเองได้ โดยจำเป็นต้องให้ Admin สร้างให้เท่านั้น (เพื่อป้องกันผู้อื่นเข้ามาใช้งาน) โดยเมนูนี้จะสามารถแก้ไขด้วย User Root เท่านั้น

Admin Area -\> Settings -\> General -\> Sign-up restrictions -\> Sign-up enabled (ติ๊กอันนี้ออก)

<figure>
<img src="Gitlab-media/35195c2fb188e1e5ef4782ac58499bfcd9480b2c.png"
title="wikilink" alt="Pastedimage20240801202725.png" />
</figure>

หากถูกต้องปุ่ม Signup ในหน้าหลักจะหายไป

<figure>
<img src="Gitlab-media/a0ff77f960a3f170ea79ea8236fe4252f92e604d.png"
title="wikilink" alt="Pastedimage20240801202954.png" />
</figure>

จากนั้นทำการเปลี่ยนแปลงรหัสผ่านของ Admin โดยรหัสผ่านควรมีความยาว 12 ตัวอักษรขึ้นไปและคาดเดาได้ยาก

<figure>
<img src="Gitlab-media/1865f201fd16ee0dde23222637c0ae1d75a4a663.png"
title="wikilink" alt="Pastedimage20240801203130.png" />
</figure>

การตั้งค่า Firewall: ปกติแล้ว gitlab server จะใช้งานเพียง 2 Port คือ 22 (ssh) และ 80 (http)

```sh
sudo apt install ufw

sudo ufw allow openssh
sudo ufw allow http

# หรือ
sudo ufw allow from 192.168.88.0/24 to any port 22
sudo ufw allow from 192.168.88.0/24 to any port 80

sudo ufw enable
# answer: y

sudo ufw status
# Status: active
#
# To                         Action      From
# --                         ------      ----
# OpenSSH                    ALLOW       Anywhere
# 80/tcp                     ALLOW       Anywhere
# OpenSSH (v6)               ALLOW       Anywhere (v6)
# 80/tcp (v6)                ALLOW       Anywhere (v6)

# Command อื่น ๆ
sudo ufw status numbered
Status: active

     To                         Action      From
     --                         ------      ----
[ 1] OpenSSH                    ALLOW IN    Anywhere
[ 2] 80/tcp                     ALLOW IN    Anywhere
[ 3] 23                         ALLOW IN    192.168.88.0/24
[ 4] OpenSSH (v6)               ALLOW IN    Anywhere (v6)
[ 5] 80/tcp (v6)                ALLOW IN    Anywhere (v6)

sudo ufw delete 3
```

ทดสอบด้วย nmap

```sh
nmap -p- 192.22.3.150

# Nmap scan report for 192.22.3.150
# Host is up (0.018s latency).
# Not shown: 998 filtered tcp ports (no-response)
# PORT   STATE SERVICE
# 22/tcp open  ssh
# 80/tcp open  http
```

ผู้ที่เป็น Admin สามารถสร้าง User ให้ได้

Admin Area -\> Overview -\> Users -\> New User

-   Name, Username, Email: ตั้งอะไรก็ได้
-   Access level: ถ้าเป็น ผนง. ทั่วไปตั้งเป็น Regular, ถ้าต้องการให้เป็น Admin เลือกเป็น Administrator
    ![Pasted image 20240801114504.png](Gitlab-media/b6abb278094b96d347d471ded43ac92fafb4f85c.png 'wikilink')

#### SSH keypair authentication

ไปยัง Drive C -\> Users -\> เลือก Users ที่มีการใช้งานอยู่ จากนั้นทำการแก้ไขการตั้งค่า View -\> Show -\> ติ๊ก Hidden Items และ File name extensions

<figure>
<img src="Gitlab-media/a5c0bdd7fbc27331b18073fbcc743f3b6598a88c.png"
title="wikilink" alt="Pastedimage20240801131422.png" />
</figure>

สร้าง Folder .ssh และเข้าไปยัง Folder ดังกล่าว จากนั้นสร้างไฟล์ชื่อ config (แบบไม่มีนามสกุล)

<figure>
<img src="Gitlab-media/6a13b36f544739deb9449e22e683166162698562.png"
title="wikilink" alt="Pastedimage20240801131509.png" />
</figure>

เปิด cmd `ssh-keygen -t rsa` จากนั้นสร้างไฟล์ให้เรียบร้อย

<figure>
<img src="Gitlab-media/eea73dced152efd0964405eb1cd43e4196ea5c65.png"
title="wikilink" alt="Pastedimage20240801131647.png" />
</figure>

เพิ่ม ภายในไฟล์ \~/.ssh/config
โดย Host คือหมายเลข IP ของ Gitlab Server และ IdentityFile คือไฟล์ที่สร้างขึ้นมาจากขั้นตอนก่อนหน้า

```sh
Host 192.22.3.150
IdentityFile ~/.ssh/id_rsa
```

จากนั้นเปิดไฟล์ id_rsa.pub ด้วย notepad และ copy content ข้างในไว้

กลับไปที่ Gitlab, กดปุ่ม Profile -\> Edit Profile -\> SSH Keys และเพิ่ม SSH Key นำ content ในไฟล์ id_rsa.pub ไปไว้ใน SSH KEYS

ปล. เอา expired date ออกด้วย
![Pasted image 20240801131946.png](Gitlab-media/2a267f957ad177782454d94d3268bcf0b621ba80.png 'wikilink')

ทดสอบ connect `ssh -T git@gitlab-ip`
![Pasted image 20240801132357.png](Gitlab-media/a587f67d4dbad0524f05a61a37399ca444f1965c.png 'wikilink')
