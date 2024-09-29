const { PrismaClient } = require('@prisma/client') // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient() // สร้างอินสแตนซ์ของ PrismaClient
const bcrypt = require('bcryptjs') // นำเข้า bcrypt สำหรับการเข้ารหัสรหัสผ่าน
const jwt = require('jsonwebtoken') // นำเข้า jsonwebtoken สำหรับการสร้าง JWT
require('dotenv').config() // นำเข้า dotenv เพื่อใช้ตัวแปรสภาพแวดล้อม

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
const login = async (req, res) => {
  try {
    const { username, password } = req.body // ดึงข้อมูล username และ password จาก body
    const user = await prisma.user.findFirst({ where: { username: username } }) // ค้นหาผู้ใช้ตาม username
    if (!user) { // หากไม่พบผู้ใช้
      throw new Error('Login Failed') // สร้างข้อผิดพลาด
    }
    const match = await bcrypt.compare(password, user.password) // ตรวจสอบว่ารหัสผ่านตรงกับที่เก็บไว้ในฐานข้อมูลหรือไม่
    if (!match) { // หากรหัสผ่านไม่ตรง
      throw new Error('Login Failed') // สร้างข้อผิดพลาด
    }
    const payload = { sub: user.userId, role: user.role } // กำหนด payload สำหรับ JWT
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' }) // สร้าง JWT พร้อมระบุวันหมดอายุเป็น 7 วัน
    return res.status(200).send({ token: token }) // ส่ง token กลับไปยังผู้ใช้
  } catch (err) {
    return res.status(400).json({ error: 'bad request' }) // ส่งข้อผิดพลาด 400 หากเกิดข้อผิดพลาด
  }
}

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(12) // สร้าง salt สำหรับการเข้ารหัสรหัสผ่าน
    const data = req.body // ดึงข้อมูลจาก body
    data.password = bcrypt.hashSync(data.password, salt) // เข้ารหัสรหัสผ่านด้วย salt ที่สร้างขึ้น
    const user = await prisma.user.create({ data: data }) // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    return res.status(201).send(user) // ส่งข้อมูลผู้ใช้ที่สร้างใหม่กลับไปยังผู้ใช้
  } catch (err) {
    return res.status(400).json({ error: 'bad request' }) // ส่งข้อผิดพลาด 400 หากเกิดข้อผิดพลาด
  }
}

module.exports = { login, register } // ส่งออกฟังก์ชัน login และ register เพื่อใช้ในไฟล์อื่น
