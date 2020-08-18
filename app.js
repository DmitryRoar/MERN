const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

const PORT = config.get('port') || 5000

// routes
const authRoutes = require('./routes/auth.routes')
const linkRoutes = require('./routes/link.routes')
const redirectRoutes = require('./routes/redirect.routes')

app.use(express.json({extended: true}))
app.use('/api/auth', authRoutes)
app.use('/api/link', linkRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.resolve(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
    }
} start()