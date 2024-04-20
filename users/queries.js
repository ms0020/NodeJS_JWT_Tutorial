const getUsers = "SELECT * FROM users";
const addUser = "INSERT INTO USERS (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *";


export default { getUsers, addUser };
