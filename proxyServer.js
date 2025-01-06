import express from 'express';
import cors from 'cors';
import axios from 'axios';
import multer from 'multer';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
app.use(express.json());

app.use(compression());

// Increase the payload limit using body-parser
app.use(express.json({ limit: "2gb" }))
app.use(express.urlencoded({ limit: "2gb", extended: true }))

app.use(bodyParser.urlencoded({ limit: "2gb", extended: true }))
app.use(bodyParser.json({ limit: "2gb" }))

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

app.post('/proxy/emails', upload.single('file'), async (req, res) => {

    const RESEND_API_KEY = 're_SHVc68o8_BQTEZDSSRFYegk2zmoD9Dwtt';
  try {

    console.log('Sending request to Resend API with headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      });

    const response = await axios.post('https://api.resend.com/emails', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}` 
      },
      maxContentLength: 50 * 1024 * 1024, // 50MB limit

    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
