const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

// const newTask = new Task({
//   description: '   this is a test task',
//   completed: true
// })

// newTask.save().then(() => {
//   console.log(newTask)
// }).catch((error) => {
//   console.log('Error!', error)
// })

module.exports = Task;