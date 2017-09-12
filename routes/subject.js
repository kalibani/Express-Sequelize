const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Subject.findAll({include: [{model: models.Teacher}],
  order:[
      ['id', 'ASC']
    ]
  })
  .then(rows => {
    //res.send(rows)
      res.render('subject', {data : rows, pageTitle : 'Express Sequelize'})
  })
  .catch(err => {
    res.send(err)
  })
})


module.exports = router
