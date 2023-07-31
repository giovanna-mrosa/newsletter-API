const express = require('express')
const app = express()
const mongoose = require('mongoose')
const schema = require('./models/schema')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Oi Express!" });
  });
  
mongoose
  .connect(
    'mongodb+srv://gmarcaro:D64MhPZiYdfr54sv@restfullapibanco.ocrdqsr.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

  app.post('/email', async (req, res) => {
    const { email } = req.body
    const data = {
      email
    }
    try {
      await schema.create(data)
      res.status(201).json({ message: 'E-mail inserido no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.get('/emails', async (req, res) => {
    try {
      const emails = await schema.find()
      res.status(200).json(emails)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/emails/:id', async (req, res) => {
    const id = req.params.id
    try {
      const emails = await schema.findOne({ _id: id })
      if (!emails) {
        res.status(422).json({ message: 'E-mail não encontrado!' })
        return
      }
      res.status(200).json(emails)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.patch('/emails/:id', async (req, res) => {
    const id = req.params.id
    const { email } = req.body
    const body = {
      email
    }
    try {
      const updatedEmail = await schema.updateOne({ _id: id }, body)
      if (updatedEmail.matchedCount === 0) {
        res.status(422).json({ message: 'E-mail não encontrado!' })
        return
      }
      res.status(200).json(body)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.delete('/email/:id', async (req, res) => {
    const id = req.params.id
    const email = await schema.findOne({ _id: id })
    if (!email) {
      res.status(422).json({ message: 'E-mail não encontrado!' })
      return
    }
    try {
      await schema.deleteOne({ _id: id })
      res.status(200).json({ message: 'E-mail removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })