const express = require('express')
const Account = require('./accounts-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.get()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkId, checkPayload, async (req, res, next) => {
  try {
    const data = await Account.update(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Account.remove(req.params.id)
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

async function checkId(req, res, next) {
    try {
        const accountInstance = await Account.getById(req.params.id)
        if (accountInstance) {
        //   req.account = accountInstance
          next()
        } else {
          res.status(404).json({ message: `Account with id ${req.params.id} not found.` })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting account by id.' })
    }
  next()
}

function checkPayload(req, res, next) {
    if (!req.body.name || !req.body.budget) {
        res.status(400).json({ message: "name and budget required fields" })
    } else {
        next()
    }
}

module.exports = router
