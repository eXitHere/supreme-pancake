const passport = require('passport') // นำเข้า passport สำหรับจัดการการยืนยันตัวตน

// ส่งออกฟังก์ชัน authenticate ของ passport โดยใช้กลยุทธ์ 'jwt' 
// และตั้งค่า session เป็น false เพื่อไม่ให้ใช้ session ในการจัดการการยืนยันตัวตน
module.exports = passport.authenticate('jwt', { session: false })
