const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { setAsync, getAsync } = require('../redis/index')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* initializing todos counter */
let todos = 0
setAsync('added_todos', todos)

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  todos++
  setAsync('added_todos', todos)
  res.send(todo)
})

const singleRouter = express.Router()
const statsRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => res.send(req.todo).status(200))

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.todo._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
  res.send(updatedTodo).status(200)
})

statsRouter.get('/', async (req, res) => {
  const stats = await getAsync('added_todos')
  res.json({ added_todos: Number(stats) })
})

router.use('/stats', statsRouter)
router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
