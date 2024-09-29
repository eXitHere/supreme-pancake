const express = require('express') // นำเข้า express เพื่อสร้าง router
const router = express.Router() // สร้างอินสแตนซ์ router สำหรับจัดการเส้นทาง
const authController = require('../controllers/auth') // นำเข้าคอนโทรลเลอร์สำหรับจัดการคำขอเกี่ยวกับการยืนยันตัวตน
const { validate } = require('express-validation') // นำเข้า validate จาก express-validation เพื่อตรวจสอบข้อมูลที่ส่งมา
const { loginValidation, registerValidation } = require('../validation/auth') // นำเข้าการตรวจสอบข้อมูลสำหรับการเข้าสู่ระบบและการลงทะเบียน

// เส้นทาง POST สำหรับการเข้าสู่ระบบผู้ใช้ โดยต้องผ่านการตรวจสอบข้อมูล
router.post(
    '/user/login',
    validate(loginValidation, {}, {}),
    authController.login
)

// เส้นทาง POST สำหรับการลงทะเบียนผู้ใช้ โดยต้องผ่านการตรวจสอบข้อมูล
router.post(
    '/user/register',
    validate(registerValidation, {}, {}),
    authController.register
)

module.exports = router // ส่งออก router เพื่อใช้ในไฟล์อื่น
