const errorHandling = (err, req, res, next) => {
    // กำหนดฟังก์ชันสำหรับจัดการข้อผิดพลาด
    err.statusCode = err.statusCode || 400 // กำหนดรหัสสถานะข้อผิดพลาด ถ้าไม่มีให้ใช้ 400 (Bad Request)
    err.status = err.status || 'Bad Request' // กำหนดสถานะข้อผิดพลาด ถ้าไม่มีให้ใช้ 'Bad Request'

    // ส่งข้อมูลเกี่ยวกับข้อผิดพลาดกลับไปยังผู้ใช้
    res.status(err.statusCode).send({
        status: err.status, // สถานะข้อผิดพลาด
        message: err.cusMessage || 'Unknown Error', // ข้อความข้อผิดพลาด ถ้าไม่มีให้ใช้ 'Unknown Error'
    })
    next() // เรียกใช้ middleware ถัดไปในกรณีที่ต้องการต่อไปยัง middleware อื่น (อาจจะไม่จำเป็นในกรณีนี้)
}

module.exports = errorHandling // ส่งออกฟังก์ชัน errorHandling เพื่อใช้ในไฟล์อื่น
