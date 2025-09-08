import { auth } from '../helper/auth.js'
import { pool } from '../helper/db.js'
import { Router } from 'express'
import { getTasks } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)

const insertTask = async (description) => {
  return await pool.query('INSERT INTO task (description) VALUES ($1) returning *', [description])
}

router.post('/create', auth, (req, res, next) => {
  const { task } = req.body
  if (!task) {
    const error = new Error("Task is required")
    error.status = 400
    return next(error)
  }
  pool.query('INSERT INTO task (description) values ($1) returning *', [task.description], (err, result) => {
    if (err) {
      return next(err)
    }
    res.status(201).json({ id: result.rows[0].id, description: task.description })
  })
})

router.delete('/delete/:id', auth, (req, res, next) => {
  const { id } = req.params
  pool.query('DELETE FROM task WHERE id = $1', [id], (err, result) => {
    if (err) {
      return next(err)
    }
    if (result.rowCount === 0) {
      const error = new Error("Task not found")
      error.status = 404
      return next(error)
    }
    return res.status(200).json({ id: id })
  })
})

export default router
export { insertTask }