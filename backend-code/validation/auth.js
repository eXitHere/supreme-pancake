const { Joi } = require('express-validation') // นำเข้า Joi จาก express-validation สำหรับการตรวจสอบข้อมูล

// กำหนดการตรวจสอบข้อมูลสำหรับการเข้าสู่ระบบ
const loginValidation = {
    body: Joi.object({
        // สร้างอ็อบเจ็กต์ Joi สำหรับตรวจสอบข้อมูลใน body ของคำขอ
        username: Joi.string().required(), // username ต้องเป็นสตริงและต้องระบุ
        password: Joi.string().required(), // password ต้องเป็นสตริงและต้องระบุ
    }),
}

// กำหนดการตรวจสอบข้อมูลสำหรับการลงทะเบียน
const registerValidation = {
    body: Joi.object({
        // สร้างอ็อบเจ็กต์ Joi สำหรับตรวจสอบข้อมูลใน body ของคำขอ
        name: Joi.string().required(), // name ต้องเป็นสตริงและต้องระบุ
        username: Joi.string().required(), // username ต้องเป็นสตริงและต้องระบุ
        password: Joi.string() // password ต้องเป็นสตริง
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ) // ต้องตรงตามรูปแบบ regex ที่กำหนด (อย่างน้อย 8 ตัวอักษร, มีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข และอักขระพิเศษ)
            .required(), // และต้องระบุ
    }),
}

module.exports = {
    // ส่งออกการตรวจสอบข้อมูลเพื่อใช้ในไฟล์อื่น
    loginValidation,
    registerValidation,
}
