import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5, 
    queueLimit: 0
})

export const connectionDB = async() => {
    let connection;
    try{
        connection = await pool.getConnection();
        
        console.log("Database Connected");
        return connection;
    }catch(err){
        console.error('Error connecting to the database:', err.message);
        throw err;
    }finally {
        if (connection) connection.release();
    }
}