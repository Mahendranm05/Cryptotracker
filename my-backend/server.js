const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mahi26032002",
  database: "crypto"
});

// Connect to the database
db.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

const secret = 'your_jwt_secret';

// Define routes
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('User added successfully');
  });
});
// User login route 
app.post('/login', (req, res) => { 
  const { email, password } = req.body; 
  let sql = 'SELECT * FROM users WHERE email = ?'; 
  db.query(sql, [email], async (err, results) => { 
    if (err || results.length === 0) { 
      return res.status(401).send('Invalid email or password'); 
    } 
      const user = results[0]; 
      const validPassword = await bcrypt.compare(password, user.password); 
      if (!validPassword) { 
        return res.status(401).send('Invalid email or password'); 
      } 
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }); 
        res.json({ token }); 
      }); 
    });

      
      // Middleware to verify token
      const verifyToken = (req, res, next) => { 
      const token = req.headers['authorization']; 
      if (!token) { 
        return res.status(403).send('Token required'); 
      } 
        jwt.verify(token, secret, (err, decoded) => { 
          if (err) { 
            return res.status(401).send('Invalid token'); 
          } 
          req.userId = decoded.id; 
          next(); 
        }); 
        };

// Protected route example 
app.get('/protected', verifyToken, (req, res) => { 
  res.send('This is a protected route'); 
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
