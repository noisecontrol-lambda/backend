const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

const Teachers = require("./teachers-model");
const restricted = require("../middleware/restricted");
const { validateTeacher } = require("../middleware/validators");

router.post("/register", validateTeacher, (req, res) => {
  let { teacher } = req;

  const hash = bcrypt.hashSync(teacher.password, 10); // 2 ^ n
  teacher.password = hash;
  Teachers.add(teacher)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Teacher could not be added", error });
    });
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(428).json({ message: "Missing username or password" });
  } else {
    let token;
    try {
      const teacher = await Teachers.findBy({ username }).first();
      if (teacher && bcrypt.compareSync(password, teacher.password)) {
        teacher.token = generateToken(teacher);
        res.status(200).json(teacher);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }
});

router.get("/", restricted, async (req, res) => {
  try {
    const teachers = await Teachers.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get teachers", error });
  }
});

router.get("/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teachers.findById(id);
    if (teacher) {
      delete teacher.password;
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ message: `Could not find teacher with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get teacher", error });
  }
});

router.put("/:id", restricted, async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  if (Object.keys(changes).length === 0) {
    res.status(404).json({ message: "Missing teacher data" });
    return;
  }
  if (changes.password) {
    const hash = bcrypt.hashSync(changes.password, 10); // 2 ^ n
    changes.password = hash;
  }

  try {
    const teacher = await Teachers.findById(id);

    if (teacher) {
      const updated = await Teachers.update(id, changes);
      delete updated.password;
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: `Could not find teacher with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update teacher", error });
  }
});

router.delete("/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Teachers.remove(id);

    if (deleted) {
      res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: `Could not find teacher with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete teacher", error });
  }
});

function generateToken(teacher) {
  const jwtPayload = {
    subject: teacher.id,
    email: teacher.email
  };

  const jwtOptions = {
    expiresIn: "12h"
  };

  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;
