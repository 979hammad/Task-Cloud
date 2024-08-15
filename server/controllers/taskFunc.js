import ExpressError from "../Middlewares/ExpressError.js";

const addTask = async(req, res) => {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
        throw new ExpressError(400 , 'Task title is required')
    }

    if(title.length > 100){
        throw new ExpressError(400 , 'Only 100 Characters allowed')
    }

    const sql = 'INSERT INTO tasks (title, user_id) VALUES (?, ?)';
    const [data] = await req.db.query(sql, [title, userId]);
    res.status(201).json({ id: data.insertId, title });
}

const getAllTasks = async(req, res) => {
    const userId = req.user.id;

    const sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const  [data] = await req.db.query(sql, [userId]);
    res.status(200).json(data);
}

const deleteTask = async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
    await req.db.query(sql, [id, userId]);

    const sql2 = 'SELECT * FROM tasks WHERE user_id = ?';
    const  [data] = await req.db.query(sql2, [userId]);
    res.status(200).json(data);
}

const updateTask = async(req, res) => {
    const { id } = req.params;
    const {title} = req.body;
    const userId = req.user.id;
    
    const sql = 'UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?';
    await req.db.query(sql, [title, id, userId])

    const sql2 = 'SELECT * FROM tasks WHERE user_id = ?';
    const  [data] = await req.db.query(sql2, [userId]);
    res.status(200).json(data);
}

export { addTask, getAllTasks, updateTask, deleteTask };
