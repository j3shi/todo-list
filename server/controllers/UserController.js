import { deleteUserById } from '../models/User.js'

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await deleteUserById(id)
        if (result.rowCount === 0) {
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }
        res.status(200).json({ id })
    } catch (error) {
        next(error)
    }
}

export { deleteUser }