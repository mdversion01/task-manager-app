const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//   to: 'mathewdaugherty@mac.com',
//   from: 'msd@mathewdaugherty.com',
//   subject: 'This is my first email creation',
//   text: 'I hope this one actually gets to you.'
// })

//Export function
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'msd@mathewdaugherty.com',
    subject: 'Welcome to the the app',
    text: `Welcome to the app, ${name}. Let me know how you like it.`,
    html: '<h1>Welcome</h1>'
  })
}

// Cancellation Email
const sendCanceledEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'msd@mathewdaugherty.com',
    subject: 'Sorry to see you go',
    text: `${name}, we are sorry to see you go.`,
    html: '<h1>SORRY</h1>'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCanceledEmail
}