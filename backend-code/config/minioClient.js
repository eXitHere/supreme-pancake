const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
})

module.exports = minioClient
