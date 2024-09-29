const { PrismaClient } = require('@prisma/client') // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล
const passport = require('passport') // นำเข้า passport สำหรับการจัดการการยืนยันตัวตน
const prisma = new PrismaClient() // สร้างอินสแตนซ์ของ PrismaClient เพื่อใช้ในการเข้าถึงฐานข้อมูล
const JwtStrategy = require('passport-jwt').Strategy // นำเข้า JwtStrategy สำหรับการตรวจสอบ JWT
const ExtractJwt = require('passport-jwt').ExtractJwt // นำเข้า ExtractJwt เพื่อดึง JWT จากคำขอ
require('dotenv').config() // โหลดตัวแปรจากไฟล์ .env เพื่อเข้าถึงค่าต่างๆ

var opts = {} // สร้างอ็อบเจ็กต์เพื่อเก็บตัวเลือกสำหรับ JWT
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() // ตั้งค่าดึง JWT จาก Authorization header
opts.secretOrKey = process.env.SECRET // กำหนด secret key สำหรับการตรวจสอบ JWT จากตัวแปรสภาพแวดล้อม

passport.use( // ใช้ JwtStrategy ใน passport
  new JwtStrategy(opts, async (jwt_payload, callback) => { // สร้างใหม่ JwtStrategy โดยส่ง opts และฟังก์ชัน callback
    const user = await prisma.user.findFirst({ where: { userId: jwt_payload.sub } }) // ค้นหาผู้ใช้ในฐานข้อมูลตาม userId ที่ได้จาก JWT
    if (!user) return callback(null, false) // หากไม่พบผู้ใช้ ให้เรียก callback โดยไม่อนุญาต
    return callback(null, user) // หากพบผู้ใช้ ให้เรียก callback พร้อมกับข้อมูลผู้ใช้
  })
)
