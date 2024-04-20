import pool from '../db.js';
import queries from './queries.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt-helpers.js';


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await pool.query(queries.userLogin, [email]);
        if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect." });
        // Password Check
        const validPassword = await bcrypt.compare(password, users.rows[0].user_password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password." });
        // return res.status(200).json("Success...");

        //JWT 
        let tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);

    } catch (error) {
        res.status(401).json({ error: error.message });
    };
};

const refToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(401), json({ error: 'Null refresh token.' });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let token = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const deleteToken = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default { userLogin, refToken, deleteToken };