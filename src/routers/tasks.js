const express  = require("express");
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }

})

// GET /tasks?completes=true (or false)
// limit/skip - Pagination
// GET /tasks?limit=10&skip=0
// Sorting - GET /tasks?sortBy=createAt:asc
router.get('/tasks', auth, async (req, res) => {

  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
 
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 //asc is 1, desc -1
  }


  try {
    // const tasks = await Task.find({owner: req.user._id}) <--- you can use this or the line below
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()

    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // const task= await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id})

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }

})

router.patch('/tasks/:id', auth, async (req, res) => {
  const taskUpdates = Object.keys(req.body)
  const allowedTaskUpdates = ['description', 'completed']

  const isValidOperation = taskUpdates.every((taskUpdate) => {
    return allowedTaskUpdates.includes(taskUpdate)
  })

  if(!isValidOperation) {
    return res.status(400).send({error: 'Invalid operation'})
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
    //   new: true, 
    //   runValidators: true 
    // })

    //const task = await Task.findByIdAndUpdate(req.params.id)

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

    await task.save()

    if (!task) {
      return res.status(404).send()
    } 

    taskUpdates.forEach((update) => {
      task[update] = req.body[update]
    })

    res.send(task)
  
  } catch (e) {
    res.status(400).send()
  }

})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndRemove({_id: req.params.id, owner: req.user._id}) // <-- findByIdAndDelete() did not work 

    if(!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;