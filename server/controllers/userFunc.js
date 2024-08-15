import ExpressError from "../Middlewares/ExpressError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    const { name, email, password, cPassword } = req.body;
    if (
        !name ||
        !email ||
        !password ||
        !cPassword
    ) {
        throw new ExpressError(400, "Please Enter all required fields");
    } else {
        if(name.length > 20){
           throw new ExpressError(400, "Name can't exceed 20 digits");
        }
        if(password.length > 8){
            throw new ExpressError(400, "Password can't exceed 8 digits");
        }
        if(email.length > 100){
            throw new ExpressError(400, "Email can't exceed 100 digits");
        }

        const sql = 'SELECT * FROM users WHERE email = ?';
        const [data] = await req.db.query(sql, [email]);

        if (data.length > 0) {
            throw new ExpressError(404, "Email already registered kindly login");
        }
        if (password === cPassword) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const sql2 = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const [data] = await req.db.query(sql2, [name, email, hashedPassword]);

            const newUser = {
                id: data.insertId,
                name,
                email,
            };

            const token = jwt.sign({ id: newUser.id }, process.env.jwtkey);

            res.status(201).json({
                success: true,
                newUser,
                token
            });
        } else {
            throw new ExpressError(400, "Password and Confirm Password don't match");
        }
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ExpressError(400, "Kindly enter all required fields")
    } else {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [data] = await req.db.query(sql, [email]);
    
        if (data.length > 0) {
            const userFound = data[0];

            const passwordMatched = await bcrypt.compare(password, userFound.password);
            if (passwordMatched) {
                const token = jwt.sign({ id: userFound.id }, process.env.jwtkey)
                res.status(200).json({
                    success: true,
                    token,
                    user: {
                        id: userFound.id,
                        name: userFound.name,
                        email: userFound.email,
                    }
                });
            } else {
                throw new ExpressError(401, "Password or Email is incorrect");
            }
        } else {
            throw new ExpressError(401, "Email not registered");
        }
    }

}

const myProfile = async(req, res) => {
    res.status(200).json({
        user : req.user
    })
}

const deleteMyAccount = async(req, res) =>{
    const id = req.user.id;
 
    const sql = "DELETE FROM users WHERE id = ?"
    await req.db.query(sql, [id]);

    res.status(200).json({message : "Account Deleted"})
}

export { signUp, signin, myProfile, deleteMyAccount}
