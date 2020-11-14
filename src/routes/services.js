const express = require('express')
const { accounts, writeJSON } = require('../data.js')

const router = express.Router()

router.get('/transfer', (req, res) => {
  res.render(
    'transfer',
    {
      account: accounts.savings
    })
})

router.get('/payment', (req, res) => {
  res.render(
    'payment',
    {
      account: accounts.credit
    })
})

router.post('/payment', (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount)
  accounts.credit.available += parseInt(req.body.amount)
  writeJSON()
  res.render(
    'payment',
    {
      message: 'Payment Successful',
      account: accounts.credit
    })
})

router.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance) - parseInt(req.body.amount)
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount)
  writeJSON()
  res.render('transfer', { message: 'Transfer Completed' })
})

module.exports = router
