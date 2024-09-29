// กำหนดฟังก์ชัน roleGuard ที่ใช้สำหรับตรวจสอบสิทธิ์ผู้ใช้
const roleGuard = (requiredRoles) => (req, res, next) => {
  // ตรวจสอบว่าผู้ใช้มีข้อมูลใน req.user และบทบาทของผู้ใช้อยู่ในรายการ requiredRoles หรือไม่
  if (req.user && requiredRoles.includes(req.user.role)) {
    return next() // หากผู้ใช้มีสิทธิ์ให้เรียกใช้ middleware ถัดไป
  } else {
    // หากผู้ใช้ไม่มีสิทธิ์ให้ส่งข้อความ 'Access denied' พร้อมกับรหัสสถานะ 403 (Forbidden)
    return res.status(403).json({ message: 'Access denied' })
  }
}

module.exports = roleGuard // ส่งออกฟังก์ชัน roleGuard เพื่อใช้ในไฟล์อื่น
