const { PrismaClient } = require('@prisma/client') // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient() // สร้างอินสแตนซ์ของ PrismaClient
const minioClient = require('../config/minioClient') // นำเข้า MinIO client สำหรับการจัดการไฟล์
const { v4: uuidv4 } = require('uuid') // นำเข้า uuid สำหรับการสร้าง ID ที่ไม่ซ้ำกัน

// ฟังก์ชันสำหรับดึงข้อมูลคอร์สทั้งหมด
const getCourses = async (req, res) => {
  try {
    let courses = await prisma.course.findMany({ include: { user: { select: { name: true } } } }) // ดึงคอร์สทั้งหมดพร้อมกับชื่อผู้สอน
    courses = courses.map((course) => { // เปลี่ยน URL รูปภาพให้ชี้ไปยัง MinIO
      course.image = `https://${process.env.MINIO_ENDPOINT}/course/${course.image}`
      return course // ส่งคืนคอร์สที่ถูกปรับเปลี่ยน
    })
    return res.status(200).send(courses) // ส่งข้อมูลคอร์สกลับไปยังผู้ใช้
  } catch (err) {
    return res.status(400).send({ error: err.message }) // ส่งข้อผิดพลาด 400 หากเกิดข้อผิดพลาด
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลคอร์สตาม ID
const getCourse = async (req, res) => {
  try {
    const id = req.params.id // ดึง ID ของคอร์สจากพารามิเตอร์ของ URL
    const bucketName = process.env.MINIO_BUCKET // ดึงชื่อ bucket จากตัวแปรสภาพแวดล้อม
    const expires = 1 * 60 * 60 // ระบุเวลาหมดอายุของ URL ที่เซ็นชื่อ
    let course = await prisma.course.findFirst({ // ค้นหาคอร์สตาม ID
      where: { courseId: id },
      include: { user: { select: { name: true } }, _count: { select: { Enroll: true } } }, // รวมชื่อผู้สอนและจำนวนการลงทะเบียน
    })
    if (!course) { // หากไม่พบคอร์ส
      throw new Error('Not Found') // สร้างข้อผิดพลาด
    }

    // สร้าง URL ที่เซ็นชื่อสำหรับการเข้าถึงไฟล์ใน MinIO
    minioClient.presignedGetObject(bucketName, course.image, expires, (err, presignedUrl) => {
      if (err) {
        console.error('Error generating presigned URL:', err) // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหา
        return
      }
      return res.status(200).send({ ...course, image: presignedUrl }) // ส่งข้อมูลคอร์สและ URL ที่เซ็นชื่อกลับไป
    })
  } catch (err) {
    return res.status(404).send({ error: err.message }) // ส่งข้อผิดพลาด 404 หากเกิดข้อผิดพลาด
  }
}

// ฟังก์ชันสำหรับสร้างชื่อไฟล์แบบสุ่ม
const randomFileName = (originalName) => {
  const ext = originalName.split('.').pop() // ดึงนามสกุลไฟล์
  return `${uuidv4()}.${ext}` // สร้างชื่อไฟล์ใหม่โดยใช้ UUID
}

// ฟังก์ชันสำหรับเพิ่มคอร์สใหม่
const addCourse = async (req, res) => {
  try {
    const data = req.body // ดึงข้อมูลจาก body
    const file = req.file // ดึงไฟล์ที่อัปโหลด
    const fileName = randomFileName(file.originalname) // สร้างชื่อไฟล์ใหม่

    if (!file) { // หากไม่มีไฟล์ที่อัปโหลด
      return res.status(400).send('No file uploaded or file type not supported.') // ส่งข้อผิดพลาด 400
    }

    const user = await prisma.user.findFirst({ where: { userId: req.user.userId } }) // ค้นหาผู้ใช้ตาม userId

    if (!user) { // หากไม่พบผู้ใช้
      const error = new Error('Not Found')
      error.status = 404 // กำหนดสถานะเป็น 404
      throw error // สร้างข้อผิดพลาด
    }

    // อัปโหลดไฟล์ไปยัง MinIO (private และ course bucket)
    minioClient.putObject('private', fileName, file.buffer, file.size, (err, etag) => {
      if (err) {
        return res.status(500).send(err) // ส่งข้อผิดพลาด 500 หากเกิดข้อผิดพลาด
      }
    })

    minioClient.putObject('course', fileName, file.buffer, file.size, (err, etag) => {
      if (err) {
        return res.status(500).send(err) // ส่งข้อผิดพลาด 500 หากเกิดข้อผิดพลาด
      }
    })

    const course = await prisma.course.create({ // สร้างคอร์สใหม่ในฐานข้อมูล
      data: { title: data.title, detail: data.detail, image: fileName, tutorId: req.user.userId },
      include: { user: { select: { name: true } } }, // รวมชื่อผู้สอน
    })
    return res.status(201).send(course) // ส่งข้อมูลคอร์สที่สร้างใหม่กลับไปยังผู้ใช้
  } catch (err) {
    return res.status(400).send({ error: err.message }) // ส่งข้อผิดพลาด 400 หากเกิดข้อผิดพลาด
  }
}

module.exports = { // ส่งออกฟังก์ชันที่ใช้ในการจัดการคอร์ส
  getCourses,
  getCourse,
  addCourse,
}
