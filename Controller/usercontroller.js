const User = require("../Model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  // Steps
  // user ki info lo req se.
  // check kro koi fields null to nhi
  // check kro user already exist to nhi
  // pwd hash kro
  // create kr do user
  // return object without pwd in it.

  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      username,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // res.status(201).json({msg:"User Registered sucessfully"});
    res.status(201).json(user);
  } catch (err) {
    console.log("Error while registering user", err);
  }
};

exports.loginUser = async (req, res) => {
  // Steps.
  // req se input lo.
  // ab db main find kro user
  // ab pwd check kro
  // ab user return kr do.
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ mes: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ mes: "Invalid Credentials !!" });
    }
    //   return res.status(200).send(user);

    const payload = {
      user: {
        id: user.id,
        // ROLES DEFINE KRNE KE BBAAD YHA EK LINE ALAG SE ADD KRNI
        role:user.role,
      },
    };
    console.log(user);

    jwt.sign(payload, process.env.SECRET_CODE, { expiresIn: 30000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    // Assume response contains the JWT token
    const token = res.token;

    // Store the token in localStorage or a cookie
    // localStorage.setItem("token", token);
  } catch (err) {
    console.log("Error occured !!", err);
    res.status(500).send("Server Error!!");
  }
};
