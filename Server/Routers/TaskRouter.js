const { fetchData,createTask,updateTask,deleteTask } = require('../Controllers/TaskController')

const router = require('express').Router()

router.get('/', fetchData )
router.post('/', createTask )
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router