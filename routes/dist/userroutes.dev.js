"use strict";

var express = require('express');

var _require = require('../db/models'),
    subscribers_table = _require.subscribers_table,
    user_msg = _require.user_msg;

var routes = express.Router();
routes.get('/msrm', function (req, res) {
  res.render('index', {});
});
routes.get('/about', function (req, res) {
  res.render('about', {});
});
routes.get('/sermons', function (req, res) {
  res.render('sermons', {});
});
routes.get('/books', function (req, res) {
  res.render('books', {});
});
routes.get('/events', function (req, res) {
  res.render('events', {});
});
routes.get('/blog', function (req, res) {
  res.render('blog', {});
});
routes.get('/contact', function (req, res) {
  res.render('contact', {});
}); //retrieve data from the subscribers_table 

routes.get('/getsubData', function _callee(req, res) {
  var fetchData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(subscribers_table.findAll());

        case 2:
          fetchData = _context.sent;
          return _context.abrupt("return", res.json(fetchData));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //the post rs

routes.post('/subscribe_insert', function _callee2(req, res) {
  var ename, getUserData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ename = req.body.ename;
          _context2.next = 3;
          return regeneratorRuntime.awrap(subscribers_table.findOne({
            where: {
              email: ename
            }
          }));

        case 3:
          getUserData = _context2.sent;

          try {// if (getUserData) {
            //     return res.send(ename + "found");
            // }
            // await subscribers_table.create({ email: ename });
            // console.log(typeof subscribers_table);
          } catch (error) {
            console.log(error);
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
routes.post('/usermsg', function _callee3(req, res) {
  var _req$body, fname, femail, fmsg;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, fname = _req$body.fname, femail = _req$body.femail, fmsg = _req$body.fmsg;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(user_msg.create({
            name: fname,
            usr_mail: femail,
            usr_msg: fmsg
          }));

        case 4:
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
module.exports = routes;