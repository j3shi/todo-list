import { pool } from '../helper/db.js'

const deleteUserById = async (id) => {
    return await pool.query('DELETE FROM account WHERE id = $1 RETURNING *', [id])
}

export { deleteUserById }