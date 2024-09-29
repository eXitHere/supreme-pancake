#### สร้าง Project ของ ExpressJS

```bash
npm i express cors dotenv
```

#### Folder Structure
```bash
├── app.js
├── config
├── controllers
├── middleware
├── package-lock.json
├── package.json
├── routes
└── validation
```
- app.js -> ไฟล์หลักของ application
- config -> โฟลเดอร์เก็บ config ต่างๆของ application
- controllers -> โฟลเดอร์เก็บ ไฟล์ controlller (ไฟล์ที่เป็นการทำงานของ logic ต่างๆของระบบ)
- middleware -> โฟลเดอร์เก็บ ไฟล์ middleware (ไฟล์ที่เป็นที่กรอง http request/response ก่อนส่งเข้าหรือออกจากระบบ)
- package-lock.json -> ไฟล์ history การติดตั่ง library ต่างๆ
- package.json -> ไฟล์ที่รวม metadata ของ project และ library ต่างๆที่เราได้ติดตั้งไป
- routes -> โฟลเดอร์เก็บ path http ต่างๆ
- validation -> โฟลเดอร์เก็บไฟล์ที่เอาไว้ตรวจสอบข้อมูลที่จะนำเข้าระบบ
