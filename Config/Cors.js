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
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed M by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
