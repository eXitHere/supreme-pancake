const user = require('./user') // นำเข้าการกำหนดpathสำหรับจัดการผู้ใช้
const auth = require('./auth') // นำเข้าการกำหนดpathสำหรับการยืนยันตัวตน
const course = require('./course') // นำเข้าการกำหนดpathสำหรับจัดการหลักสูตร
const enroll = require('./enroll') // นำเข้าการกำหนดpathสำหรับการลงทะเบียนหลักสูตร

module.exports = {
    // ส่งออกอ็อบเจ็กต์ที่ประกอบด้วยการกำหนดpathทั้งหมด
    user, // pathจัดการผู้ใช้
    auth, // pathการยืนยันตัวตน
    course, // pathจัดการหลักสูตร
    enroll, // pathลงทะเบียนหลักสูตร
}
