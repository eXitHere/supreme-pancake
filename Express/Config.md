### Config

Cors
```js
require('dotenv').config()
const allowedOrigins = process.env.CORS_URL.split(',')
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
	methods: ['POST', 'GET', 'PUT', 'DELETE'],
}

module.exports = corsOptions
```

Passport
```js
const { PrismaClient } = require("@prisma/client");
const passport = require('passport')
const prisma = new PrismaClient();
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET
passport.use(
	new JwtStrategy(opts, async (jwt_payload, callback) => {
		const user = await prisma.user.findFirst({ where: { userId: jwt_payload.sub } });
		if (!user) return callback(null, false)
		return callback(null, user)
	})
)
```

Minio
```js
const Minio = require('minio')
const minioClient = new Minio.Client({
	endPoint: process.env.MINIO_ENDPOINT,
	port: 443,
	useSSL: true,
	accessKey: process.env.MINIO_ACCESSKEY,
	secretKey: process.env.MINIO_SECRETKEY,
})

module.exports = minioClient
```