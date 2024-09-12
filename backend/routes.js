const express = require("express");
const router = express.Router();
const db = require("./db");
const bcrypt=require('bcrypt');


router.post("/carparts", (req, res) => {
  const { name, brand, model, year, price, stock, image_url } = req.body;
  const query =
    "INSERT INTO carparts (name ,brand,model,year,price,stock,image_url) VALUES (?,?,?,?,?,?,?)";

  db.query(
    query,
    [name, brand, model, year, price, stock, image_url],
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Car parts added successfully",
        id: result.insertId,
      });
    }
  );
});


router.get("/carparts", (req, res) => {
  const query = "SELECT * FROM carparts";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


router.get("/carpart/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM carparts where id=?";

  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


router.delete("/carpart/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM carparts WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "car parts deleted successfully" });
  });
});


// Update a car part by ID
router.put("/carpart/:id", (req, res) => {
  const { id } = req.params;
  const { name, brand, model, year, price, stock, image_url } = req.body;

  const query =
    "UPDATE carparts SET name = ?, brand = ?, model = ?, year = ?, price = ?, stock = ?, image_url = ? WHERE id = ?";

  db.query(
    query,
    [name, brand, model, year, price, stock, image_url, id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Car part not found" });
      }
      res.json({ message: "Car part updated successfully" });
    }
  );
});


router.post("/vendors", (req, res) => {
  const { name, address, phone, email } = req.body;
  const query =
    "INSERT INTO Vendors (name, address, phone, email) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, phone, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, address, phone, email });
  });
});


router.get("/vendors", (req, res) => {
  const query = "SELECT * FROM Vendors";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});



router.get('/orders', (req, res) => {
  const sql = 'SELECT * FROM Orders';
  db.query(sql, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});


router.post('/orders', (req, res) => {
  const { car_part_id, quantity, total_price, customer_name, customer_address } = req.body;
  const sql = `INSERT INTO Orders (car_part_id, quantity, total_price, customer_name, customer_address) 
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [car_part_id, quantity, total_price, customer_name, customer_address], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, car_part_id, quantity, total_price, customer_name, customer_address });
  });
});


router.post("/register", async (req, res) => {
  const { username, email, password,role } = req.body;

  try {
    
    const userCheckQuery = "SELECT * FROM users WHERE email = ?";
    db.query(userCheckQuery, [email], async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }


      const hashedPassword = await bcrypt.hash(password, 10);

    
      const query =
        "INSERT INTO users (username, email, password,role) VALUES (?, ?, ?,?)";
      db.query(
        query,
        [username, email, hashedPassword,role],
        (err, result) => {
          if (err) throw err;
          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = results[0];

     
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

 
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role:user.role
        },
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
