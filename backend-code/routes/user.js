const express = require('express') // นำเข้า express เพื่อสร้าง router
const router = express.Router() // สร้างอินสแตนซ์ router สำหรับจัดการเส้นทาง
const userController = require('../controllers/user') // นำเข้าคอนโทรลเลอร์สำหรับจัดการคำขอเกี่ยวกับผู้ใช้
const jwtGuard = require('../middleware/jwt.guard') // นำเข้ามิดเดิลแวร์สำหรับตรวจสอบ JWT
const { validate } = require('express-validation') // นำเข้า validate จาก express-validation เพื่อตรวจสอบข้อมูลที่ส่งมา
const { updateUserValidation } = require('../validation/user') // นำเข้าการตรวจสอบข้อมูลสำหรับการอัปเดตผู้ใช้

// เส้นทาง GET สำหรับดึงข้อมูลผู้ใช้ โดยต้องตรวจสอบ JWT ก่อน
router.get('/', jwtGuard, userController.getUser)

// เส้นทาง PUT สำหรับอัปเดตข้อมูลผู้ใช้ โดยต้องตรวจสอบ JWT และข้อมูลที่ส่งมาต้องผ่านการตรวจสอบ
router.put(
    '/:id',
    jwtGuard,
    validate(updateUserValidation, {}, {}),
    userController.updateUser
)

module.exports = router // ส่งออก router เพื่อใช้ในไฟล์อื่น
