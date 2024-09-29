const { PrismaClient } = require('@prisma/client') // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient() // สร้างอินสแตนซ์ของ PrismaClient

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
const getUser = async (req, res) => {
    try {
        const id = req.user.userId // ดึง userId จากข้อมูลผู้ใช้ใน req.user
        const user = await prisma.user.findFirst({
            // ค้นหาผู้ใช้ในฐานข้อมูลตาม userId
            where: { userId: id },
            select: { name: true, username: true, userId: true, role: true }, // เลือกข้อมูลที่ต้องการส่งกลับ
        })
        if (!user) {
            // หากไม่พบผู้ใช้
            throw new Error('Not Found') // สร้างข้อผิดพลาด
        }
        return res.status(200).send(user) // ส่งข้อมูลผู้ใช้กลับไปยังผู้ใช้
    } catch (err) {
        return res.status(404).json({ error: err.message }) // ส่งข้อผิดพลาด 404 หากเกิดข้อผิดพลาด
    }
}

// ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
const updateUser = async (req, res) => {
    try {
        const { userId } = req.user // ดึง userId จากข้อมูลผู้ใช้ใน req.user
        const body = req.body // ดึงข้อมูลที่ส่งมาใน body
        const id = req.params.id // ดึง id จากพารามิเตอร์ของ URL
        if (userId != id) {
            // ตรวจสอบว่าผู้ใช้พยายามอัปเดตข้อมูลของตนเองหรือไม่
            throw new Error('Forbidden') // หากไม่ใช่ให้สร้างข้อผิดพลาด
        }
        const findUser = await prisma.user.findFirst({ where: { userId: id } }) // ค้นหาผู้ใช้ในฐานข้อมูลตาม userId
        if (!findUser) {
            // หากไม่พบผู้ใช้
            throw new Error('Forbidden') // สร้างข้อผิดพลาด
        }
        const user = await prisma.user.update({
            // อัปเดตข้อมูลผู้ใช้
            data: body, // ข้อมูลใหม่ที่จะอัปเดต
            where: { userId: id }, // ระบุว่าจะแก้ไขผู้ใช้คนไหน
            select: { userId: true, name: true, role: true, username: true }, // เลือกข้อมูลที่ต้องการส่งกลับ
        })
        if (user) {
            // หากอัปเดตสำเร็จ
            return res.status(200).send(user) // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไปยังผู้ใช้
        }
        throw new Error('Forbidden') // หากมีปัญหาเกิดขึ้นให้สร้างข้อผิดพลาด
    } catch (err) {
        return res.status(403).json({ error: err.message }) // ส่งข้อผิดพลาด 403 หากเกิดข้อผิดพลาด
    }
}

module.exports = { getUser, updateUser } // ส่งออกฟังก์ชัน getUser และ updateUser เพื่อใช้ในไฟล์อื่น
