const express = require('express') // นำเข้า express เพื่อสร้าง router
const router = express.Router() // สร้างอินสแตนซ์ router สำหรับจัดการpath
const { validate } = require('express-validation') // นำเข้า validate จาก express-validation เพื่อตรวจสอบข้อมูลที่ส่งมา
const courseController = require('../controllers/course') // นำเข้าคอนโทรลเลอร์สำหรับจัดการคำขอเกี่ยวกับหลักสูตร
const { createCourseValidation } = require('../validation/course') // นำเข้าการตรวจสอบข้อมูลสำหรับการสร้างหลักสูตร
const roleGuard = require('../middleware/role.guard') // นำเข้ามิดเดิลแวร์สำหรับตรวจสอบสิทธิ์ผู้ใช้
const jwtGuard = require('../middleware/jwt.guard') // นำเข้ามิดเดิลแวร์สำหรับตรวจสอบ JWT
const upload = require('../middleware/upload.guard') // นำเข้ามิดเดิลแวร์สำหรับการอัปโหลดไฟล์

// path GET สำหรับดึงข้อมูลหลักสูตรทั้งหมด
router.get('/', courseController.getCourses)

// path GET สำหรับดึงข้อมูลหลักสูตรโดยใช้ ID
router.get('/:id', courseController.getCourse)

// path POST สำหรับเพิ่มหลักสูตรใหม่
router.post(
    '/',
    upload.single('image'), // มิดเดิลแวร์สำหรับอัปโหลดไฟล์ภาพ
    validate(createCourseValidation, {}, {}), // ตรวจสอบข้อมูลที่ส่งมาด้วย validation
    jwtGuard, // ตรวจสอบ JWT เพื่อยืนยันตัวตน
    roleGuard(['Tutor']), // ตรวจสอบสิทธิ์เพื่อให้เฉพาะผู้ใช้ที่มีบทบาท 'Tutor' สามารถเข้าถึงได้
    courseController.addCourse // คอนโทรลเลอร์สำหรับเพิ่มหลักสูตรใหม่
)

module.exports = router // ส่งออก router เพื่อใช้ในไฟล์อื่น
