const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) =>{
  models.Student.findAll()
  .then(rows =>{
    res.render('student', {data: rows, pageTitle: 'Express Sequelize'})
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/add', (req, res) =>{
  res.render('student_add', {pageTitle: 'Express Sequelize'})
})

router.post('/add', (req, res) =>{
  models.Student.create({ first_name: req.body.first_name,last_name: req.body.last_name,email: req.body.email})
  .then(rows=>{
    res.redirect('/student')
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) =>{
  models.Student.findById(req.params.id)
  .then(rows =>{
    res.render('student_edit', {data: rows, pageTitle: 'Express Sequelize'})
  })
  .catch(err =>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  models.Student.update(
  {
    first_name:req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where : {id:req.params.id}
  })
  .then(rows=>
    res.redirect('/student')
  )
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  models.Student.destroy({
    where : {id:req.params.id}
  })
.then(rows=>{
  res.redirect('/student')
})
.catch(err =>{
  res.send(err)
})

})

module.exports = router
