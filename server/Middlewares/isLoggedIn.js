import jwt from "jsonwebtoken";
import ExpressError from "./ExpressError.js";

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    const decodedToken = jwt.verify(token, process.env.jwtkey);
    const sql = "SELECT * FROM users WHERE id = ?"
    const [rows] = await req.db.query(sql, [decodedToken.id]);
    
    const loggedInUser = rows[0];
    if (!loggedInUser) {
      throw new ExpressError(403, "You are not allowed");
    }
    req.user = loggedInUser;
    next();
  } else {
    throw new ExpressError(403, "Please login First");
  }
};

export { isLoggedIn };


