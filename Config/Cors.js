const allowedOrigins = [
    'https://st-room-inventory.onrender.com/',
    'https://st-room-inventory.onrender.com/sign-in',
    'https://st-room-inventory.onrender.com/sign-up',
    'https://st-room-inventory.onrender.com/dash',
    'https://st-room-inventory.onrender.com/branch',
    'https://st-room-inventory.onrender.com/products',
    'https://st-room-inventory.onrender.com/team',
]

const corsOptions = {
  origin: ["https://st-room-inventory.onrender.com"],
  credentials: true,
  optionsSuccessStatus: 200,
  
};

module.exports = corsOptions;
