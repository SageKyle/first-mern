import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
	let token

	token = req.cookies.jwt

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await decoded.findById(decoded.userId).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	} else {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

export { protect }
