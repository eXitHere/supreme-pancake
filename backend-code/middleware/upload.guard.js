const multer = require('multer') // นำเข้า multer สำหรับการจัดการการอัปโหลดไฟล์

// กำหนดการจัดเก็บไฟล์ในหน่วยความจำแทนการบันทึกลงดิสก์
const storage = multer.memoryStorage()

// สร้างอ็อบเจ็กต์ multer ด้วยการตั้งค่าต่างๆ
const upload = multer({
  storage: storage, // กำหนดที่จัดเก็บเป็น memoryStorage
  limits: { // กำหนดขีดจำกัดการอัปโหลด
    fileSize: 1 * 1024 * 1024, // ขีดจำกัดขนาดไฟล์ไม่เกิน 1MB
  },
  fileFilter: (req, file, cb) => { // ฟังก์ชันสำหรับกรองประเภทไฟล์
    const filetypes = /jpeg|jpg|png/ // กำหนดประเภทไฟล์ที่อนุญาต
    const mimetype = filetypes.test(file.mimetype) // ตรวจสอบว่า mimetype ของไฟล์ตรงกับประเภทที่กำหนดหรือไม่
    const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase()) // ตรวจสอบนามสกุลของไฟล์
    if (mimetype && extname) { // ถ้าไฟล์มีประเภทที่ถูกต้อง
      return cb(null, true) // อนุญาตให้ผ่าน
    }
    // ถ้าไฟล์ไม่ตรงตามประเภทที่กำหนด ให้ส่งข้อผิดพลาด
    cb(new Error('File type not supported! Only JPEG, JPG, and PNG are allowed.'))
  },
})

module.exports = upload // ส่งออกอ็อบเจ็กต์ upload เพื่อใช้ในไฟล์อื่น
