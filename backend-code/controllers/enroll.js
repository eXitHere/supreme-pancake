const { PrismaClient } = require('@prisma/client') // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient() // สร้างอินสแตนซ์ของ PrismaClient

// ฟังก์ชันสำหรับเพิ่มการลงทะเบียนนักเรียนในคอร์ส
const addEnroll = async (req, res) => {
    try {
        const data = req.body // ดึงข้อมูลการลงทะเบียนจาก body
        const enroll = await prisma.enroll.create({
            // สร้างการลงทะเบียนใหม่ในฐานข้อมูล
            data: { courseId: data.courseId, studentId: data.studentId }, // ข้อมูลที่ต้องการเพิ่ม
            include: { user: { select: { name: true } } }, // รวมชื่อผู้ใช้ที่เกี่ยวข้อง
        })
        res.status(201).send(enroll) // ส่งข้อมูลการลงทะเบียนที่สร้างใหม่กลับไปยังผู้ใช้
    } catch (err) {
        return res.status(400).json({ error: 'bad request' }) // ส่งข้อผิดพลาด 400 หากเกิดข้อผิดพลาด
    }
}

module.exports = {
    // ส่งออกฟังก์ชัน addEnroll
    addEnroll,
}
