



const corsOptions = {
    origin: 'https://st-room-inventory.onrender.com' ,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOptions