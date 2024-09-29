require('dotenv').config() // โหลดตัวแปรจากไฟล์ .env

const allowedOrigins = process.env.CORS_URL.split(',') // แยกค่าที่กำหนดใน CORS_URL ออกเป็นอาเรย์ของโดเมนที่อนุญาต

const corsOptions = { // กำหนดออปชันสำหรับ CORS
  origin: (origin, callback) => { // ฟังก์ชันเพื่อตรวจสอบโดเมนที่เรียกใช้งาน
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // ถ้าโดเมนอยู่ในรายการที่อนุญาต หรือถ้าไม่มีโดเมน (เช่น คำขอจาก localhost)
      callback(null, true) // อนุญาตการเข้าถึง
    } else {
      callback(new Error('Not allowed by CORS')) // ไม่อนุญาตการเข้าถึง และส่งข้อผิดพลาด
    }
  },
  optionsSuccessStatus: 200, // ตั้งค่าสถานะ HTTP สำหรับคำขอ OPTIONS ที่สำเร็จ
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // กำหนดวิธี HTTP ที่อนุญาต
}

module.exports = corsOptions // ส่งออกตัวเลือก CORS เพื่อใช้ในไฟล์อื่น
