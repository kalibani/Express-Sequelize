const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.Teacher.findAll({include: [{model: models.Subject}],
  order:[
      ['id', 'ASC']
    ]
  })
  .then(rows => {
    //res.send(rows)
      res.render('teacher', {data : rows, pageTitle : 'Express Sequelize'})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', (req, res) => {
  models.Subject.findAll()
  .then(rows=>{
    res.render('teacher_add', {data: rows, pageTitle : 'Express Sequelize'})
  })
})

router.post('/add', (req, res) => {
  models.Teacher.build({
      first_name: req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      createdAt : new Date(),
      updatedAt : new Date(),
      SubjectId : req.body.SubjectId
  })
  .save()
  .then(rows => {
    res.redirect('/teacher')
  })
  .catch(err =>{
    res.send(err)
  })
})


router.get('/delete/:id', (req,res) => {
  models.Teacher.destroy({
    where: {id:req.params.id}
  })
  .then(rows=> {
    res.redirect('/teacher')
  })
  .catch(err => {
    res.send(err)
  })
})


router.get('/edit/:id', function(req,res) {
  models.Teacher.findById(req.params.id)
  .then(teachers => {
    models.Subject.findAll().then(subjects => {
      res.render('teacher_edit', {
        data: teachers,
        data2: subjects,
        pageTitle: 'Express Sequelize'
      })
    })
  })
})

router.post('/edit/:id', function(req,res) {
  models.Teacher.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      SubjectId: req.body.SubjectId
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(teachers =>
    res.redirect('/teacher')
  )
})

module.exports = router;
