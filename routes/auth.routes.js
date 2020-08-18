const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()

router.post(
    '/register', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data register'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            res.status(400).json({message: 'user exsits'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({message: 'User created!'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

router.post(
    '/login', 
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data auth'
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Neverniy Password'})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

module.exports = router