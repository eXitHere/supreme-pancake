const express = require('express') // นำเข้าแพ็คเกจ express เพื่อสร้างเว็บเซิร์ฟเวอร์
require('dotenv').config() // โหลดข้อมูลจากไฟล์ .env
require('./config/passport') // นำเข้าการตั้งค่า passport
const app = express() // สร้างอินสแตนซ์ของ express
const cors = require('cors') // นำเข้าแพ็คเกจ cors สำหรับจัดการ CORS
const port = process.env.PORT || 3000 // กำหนดพอร์ตโดยใช้ค่าจาก env หรือใช้ 3000 เป็นค่าเริ่มต้น
const route = require('./routes') // นำเข้าการกำหนดpathจากไฟล์ routes
const corsOptions = require('./config/corsOption') // นำเข้าตัวเลือก CORS จากไฟล์ corsOption
const errorHandling = require('./routes/error') // นำเข้ามิดเดิลแวร์สำหรับจัดการ error

app.use(express.json({ limit: '1mb' })) // กำหนดให้แอปสามารถรับข้อมูล JSON โดยจำกัดขนาดไม่เกิน 1MB
app.use(cors(corsOptions)) // ใช้มิดเดิลแวร์ CORS ตามตัวเลือกที่กำหนด

app.get('/', (req, res) => {
    // กำหนดpath GET สำหรับ root path
    res.status(200).send({ msg: 'Welcome To Simple Backend Course' }) //
})

app.use('/user', route.user) // กำหนดpathสำหรับจัดการผู้ใช้
app.use('/auth', route.auth) // กำหนดpathสำหรับการยืนยันตัวตน
app.use('/course', route.course) // กำหนดpathสำหรับจัดการหลักสูตร
app.use('/enroll', route.enroll) // กำหนดpathสำหรับการลงทะเบียน

app.use(errorHandling) // ใช้มิดเดิลแวร์สำหรับจัดการ error

app.listen(port, () => {
    // เริ่มเซิร์ฟเวอร์ที่พอร์ตที่กำหนด
    console.log(`server running on ${port}`) // แสดงข้อความในคอนโซลว่าเซิร์ฟเวอร์ทำงานอยู่ที่พอร์ตไหน
})
