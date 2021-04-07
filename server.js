const express = require('express');

const app = express();

const { resolve, dirname } = require('path')

app.use('/', express.static(
  resolve(
    --dirname,
    './build'
  )
))

app.listen(process.env.PORT || 3000, (err) => {
  if(err) { return console.log(err)}

  console.log("Tudo funcionando certinho!")
})
