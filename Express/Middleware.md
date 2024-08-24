### Middleware

Role Guard
```js
const roleGuard = (requiredRoles) => (req, res, next) => {
	if (req.user && requiredRoles.includes(req.user.role)) {
		return next();
	} else {
		return res.status(403).json({ message: 'Access denied' });
	}
};

module.exports = roleGuard
```

Jwt Guard
```js
const passport = require('passport')
module.exports = passport.authenticate('jwt', { session: false })
```

Upload Guard
```js
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
	storage: storage,
	limits: {
	fileSize: 1 * 1024 * 1024
},

fileFilter: (req, file, cb) => {
	const filetypes = /jpeg|jpg|png/;
	const mimetype = filetypes.test(file.mimetype)
	const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase())
	if (mimetype && extname) {
		return cb(null, true)
	}

	cb(new Error('File type not supported! Only JPEG, JPG, and PNG are allowed.'))

}
})

module.exports = upload
```