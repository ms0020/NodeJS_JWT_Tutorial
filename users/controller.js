import pool from '../db.js';
import queries from './queries.js';
import bcrypt from 'bcrypt';
// import { authenticateToken } from '../middleware/authorization.js';

const getUsers = async (req, res) => {
    // console.log("--------> Inside ")
    try {
        const users = await pool.query(queries.getUsers);
        res.json({ users: users.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUser = async (req, res) => {   
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(queries.addUser, [req.body.name, req.body.email, hashedPassword]);
        res.json({ users: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });

    };
};

export default { getUsers, addUser };