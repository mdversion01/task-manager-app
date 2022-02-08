const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//   if(req.method === 'GET'){
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is down, check back soon')
// })

//File Upload example
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//       fileSize: 1000000 //<-- in megabytes
//     },
//     fileFilter(req, file, cb) {
//       // Check for PDF
//       // if (!file.originalname.endsWith('.pdf')) {
//       //   return cb(new Error('Please upload a PDF'))
//       // }
      
//       // Using Regular Expression
//       if (!file.originalname.match(/\.(doc|docx)$/)) {
//         return cb(new Error('Please upload a Word Document'))
//       }

//       cb(undefined, true)

//       // cb(new Error('File must be a PDF'))
//       // cb(undefined, true)
//       // cb(undefined, false) <-- silently rejects, no going to use
//     }
// })

// const errorMiddleware = (req, res) => {
//   throw new Error('From my middleware')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({error: error.message})
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})  

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: ' abdc123'}, 'thisisthecourse', { expiresIn: '7 days'})
//   console.log(token)

//   const data = jwt.verify(token, 'thisisthecourse')
//   console.log(data)
// } 

// myFunction()

// Using a virtual property
// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('61fd96f06d488b23482f0e0c')
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner)
 
//   const user = await User.findById('61fd961b69949c1f68acd8e3')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)

// }

// main()