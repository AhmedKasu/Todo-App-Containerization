const { setAsync, getAsync } = require('../redis/index')

const initialiseTodosCounter = async () => {
  const storedCounter = await getAsync('added_todos')
  if (!storedCounter) setAsync('added_todos', 0)
}

initialiseTodosCounter()

const setTodosCounter = async () => {
  const storedCounter = await getAsync('added_todos')
  const updatedCounter = Number(storedCounter) + 1
  setAsync('added_todos', updatedCounter)
}

module.exports = { setTodosCounter }
