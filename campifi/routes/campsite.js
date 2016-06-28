var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var auth = require('../auth');

// Render sites //
router.get('/:id', function(req, res, next) {
    return Promise.all([
        knex('site').select().where('site.id', req.params.id).first(),
        knex('comment').select().where('site_id', req.params.id)
    ]).then(function(data) {
      console.log(data);
        res.render('campsite', {
            site: data[0],
            comment: data[1]
        });
    });
});
// Delete site //
router.get('/delete/:id', function(req, res, next) {
    knex('site').where({
        id: req.params.id
    }).del().then(function(data) {
        res.redirect('/home');
    }).catch(function(error) {
        next(error);
    });
});
// Edit site //
router.get('/edit/:id', function(req, res, next) {
    knex('site').select().where('site.id', req.params.id).first().then(function(data) {
        res.render('site_edit', {
            site: data
        });
    }).catch(function(error) {
        next(error);
    });
});

router.post('/edit/:id', function(req, res, next) {
    knex('site').where({
        id: req.params.id
    }).update(req.body).then(function() {
        res.redirect('/campsite/' + req.params.id);

    }).catch(function(error) {
        next(error);
    });
});
// Add Comment //
router.post('/comment/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(req.body);

knex('comment').insert(req.body).then(function() {
res.redirect('/campsite/' + req.params.id);
}).catch(function(error) {
next(error);
});
});




module.exports = router;