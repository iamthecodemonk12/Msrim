"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require('express');

var bcrypt = require('bcrypt');

var _require = require('sequelize'),
    QueryTypes = _require.QueryTypes;

var multer = require('multer');

var path = require('path');

var _require2 = require('../db/models'),
    admin_user_table = _require2.admin_user_table,
    church_blog = _require2.church_blog,
    sermons_table = _require2.sermons_table,
    events_table = _require2.events_table,
    department = _require2.department,
    sequelize = _require2.sequelize;

var routes = express.Router(); //protect route function using session//

function _protect(req, res, next) {
  if (!req.session.email) {
    res.render('pages/samples/login.ejs');
  } else {
    next();
  } // console.log(req)

} //**********************************/
//get request
//**********************************/


routes.get('populate_nav', function _callee(req, res) {
  var getAdminData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              email: req.session.email
            }
          }));

        case 2:
          getAdminData = _context.sent;
          return _context.abrupt("return", res.json(getAdminData));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
routes.get('/login', function _callee2(req, res) {
  var getAdminData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              email: req.session.email
            }
          }));

        case 2:
          getAdminData = _context2.sent;

          if (!req.session.email) {
            res.render('pages/samples/login.ejs');
          } else {
            // res.status(200).redirect('/');
            res.render('pages/index', {
              name: "Welcome" + "\t" + getAdminData.name + "\t" + getAdminData.surname
            });
          } // console.log(req.session)


        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //churchdata

routes.get('/viewworkers', function _callee3(req, res) {
  var fetchworkers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(admin_user_table.findAll());

        case 3:
          fetchworkers = _context3.sent;
          return _context3.abrupt("return", res.send(fetchworkers));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
routes.get('/viewsermons', function _callee4(req, res) {
  var sermons_;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sermons_table.findAll({
            include: [admin_user_table]
          }));

        case 3:
          sermons_ = _context4.sent;
          return _context4.abrupt("return", res.json(sermons_));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
routes.get('/viewblogs', function _callee5(req, res) {
  var blogPosts;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(church_blog.findAll({
            include: [admin_user_table]
          }));

        case 3:
          blogPosts = _context5.sent;
          return _context5.abrupt("return", res.json(blogPosts));

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //route one with query params

routes.get('/viewevent/:eventname', function _callee6(req, res) {
  var fetchevents;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(events_table.findOne({
            where: {
              ev_title: req.params.eventname
            }
          }));

        case 3:
          fetchevents = _context6.sent;

          if (!fetchevents) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", res.send(fetchevents));

        case 8:
          return _context6.abrupt("return", res.send("no such page"));

        case 9:
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //route two without query params

routes.get('/viewevent', function _callee7(req, res) {
  var fetchevents;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(events_table.findAll());

        case 3:
          fetchevents = _context7.sent;
          return _context7.abrupt("return", res.json(fetchevents));

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //register workers

routes.get('/rgw', _protect, function (req, res) {
  res.render('pages/forms/registerworkers.ejs');
  console.log(req.session);
}); //add department

routes.get('/ad', _protect, function (req, res) {
  res.render('pages/forms/add_department.ejs', {
    error: "",
    errorDesc: "",
    name: ""
  });
}); //create blogs

routes.get('/crb', _protect, function (req, res) {
  res.render('pages/forms/blog.ejs');
}); //create sermons

routes.get('/crs', _protect, function (req, res) {
  res.render('pages/forms/sermon.ejs');
}); //create events

routes.get('/cre', _protect, function (req, res) {
  res.render('pages/forms/events.ejs');
}); //upload books

routes.get('upb', _protect, function (req, res) {
  res.render('pages/forms/books.ejs');
}); //view blogs

routes.get('/vb', _protect, function (req, res) {
  res.render('pages/ui-features/view_blog.ejs');
}); //view workers

routes.get('/vw', _protect, function (req, res) {
  res.render('pages/tables/view workers.ejs');
}); //view subscribed emails

routes.get('/se', _protect, function (req, res) {
  res.render('pages/tables/subscriber-email.ejs');
}); //view users sent messages

routes.get('/msg', _protect, function (req, res) {
  res.render('pages/tables/msg.ejs');
});
routes.get('/g_apd', _protect, function _callee8(req, res) {
  var fetch_data;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(department.findAll());

        case 3:
          fetch_data = _context8.sent;
          console.log(fetch_data);
          return _context8.abrupt("return", res.json(fetch_data));

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //view department

routes.get(['/vd', '/vd/:id'], _protect, function _callee9(req, res) {
  var fetch_data;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(department.findAll());

        case 3:
          fetch_data = _context9.sent;
          return _context9.abrupt("return", res.render('pages/tables/view_dep.ejs', {
            db_data: fetch_data
          }));

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //edit department

routes.get('/ed/:id', _protect, function _callee10(req, res) {
  var uuid, findOneDep;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          uuid = req.params.id;
          _context10.next = 4;
          return regeneratorRuntime.awrap(department.findOne({
            where: {
              uuid: uuid
            }
          }));

        case 4:
          findOneDep = _context10.sent;
          return _context10.abrupt("return", res.render('pages/protected_routes/edit_department.ejs', {
            error: "",
            errorDesc: "",
            name: findOneDep.dp_name
          }));

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //delete sessions and logout

routes.get('/logout', function (req, res) {
  if (req.session.email) {
    req.session.destroy(function (err) {
      if (err) {
        console.log("Session error" + e);
        return res.redirect("/login");
      }

      res.clearCookie(process.env.session_name);
      res.status(200).redirect("/login");
    });
  }
}); //**********************************/
//post request
//**********************************/
//login 

routes.post('/lg', function _callee12(req, res) {
  var _req$body, usr_email, pswd, getWorkers;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          //i used the length to check if the value is null or nut
          _req$body = req.body, usr_email = _req$body.usr_email, pswd = _req$body.pswd;
          _context12.next = 4;
          return regeneratorRuntime.awrap(admin_user_table.findAll({
            where: {
              email: usr_email
            }
          }));

        case 4:
          getWorkers = _context12.sent;

          if (getWorkers.length === 0) {
            console.log('null');
          } else {
            getWorkers.forEach(function _callee11(value, index) {
              return regeneratorRuntime.async(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      if (!bcrypt.compareSync(pswd, getWorkers[index].password)) {
                        _context11.next = 10;
                        break;
                      }

                      console.log("password is correct");

                      if (!(getWorkers[index].role !== "Admin")) {
                        _context11.next = 6;
                        break;
                      }

                      console.log("your valid but you are not admin");
                      _context11.next = 8;
                      break;

                    case 6:
                      req.session.email = usr_email;
                      return _context11.abrupt("return", res.status(200).redirect('/'));

                    case 8:
                      _context11.next = 11;
                      break;

                    case 10:
                      console.log("password is wrong");

                    case 11:
                    case "end":
                      return _context11.stop();
                  }
                }
              });
            });
          } // console.log(getWorkers)
          //begin 
          //check if name exists


          _context12.next = 11;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //create workers

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var fl_upload = multer({
  storage: storage
});
routes.post('/cw', fl_upload.single('photo'), function _callee14(req, res) {
  var _req$body2, avatar, f_name, f_pswd, f_last_name, f_date_of_birth, f_address, f_email, f_phone_number, f_dp_name, f_role, getAdminData, salt, encryptPassword;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _req$body2 = req.body, avatar = _req$body2.avatar, f_name = _req$body2.f_name, f_pswd = _req$body2.f_pswd, f_last_name = _req$body2.f_last_name, f_date_of_birth = _req$body2.f_date_of_birth, f_address = _req$body2.f_address, f_email = _req$body2.f_email, f_phone_number = _req$body2.f_phone_number, f_dp_name = _req$body2.f_dp_name, f_role = _req$body2.f_role;
          _context14.next = 3;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              name: f_name,
              surname: f_last_name
            }
          }));

        case 3:
          _context14.t0 = _context14.sent;
          _context14.next = 6;
          return regeneratorRuntime.awrap(admin_user_table.findAll());

        case 6:
          _context14.t1 = _context14.sent;
          getAdminData = {
            get_one_user: _context14.t0,
            get_all_users: _context14.t1
          };
          _context14.prev = 8;

          if (!(getAdminData.get_all_users.length <= 0)) {
            _context14.next = 21;
            break;
          }

          _context14.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSaltSync(10));

        case 12:
          salt = _context14.sent;
          _context14.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hashSync(f_pswd, salt));

        case 15:
          encryptPassword = _context14.sent;
          _context14.next = 18;
          return regeneratorRuntime.awrap(admin_user_table.create({
            avatar: './public/uploads/' + req.file.originalname,
            name: f_name,
            password: encryptPassword,
            surname: f_last_name,
            date_of_birth: f_date_of_birth,
            address: f_address,
            email: f_email,
            phone: f_phone_number,
            department: f_dp_name,
            role: f_role
          }));

        case 18:
          return _context14.abrupt("return", res.send("thank you for registering!!"));

        case 21:
          getAdminData.get_all_users.forEach(function _callee13(value, index) {
            var _salt, _encryptPassword;

            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    if (!bcrypt.compareSync(f_pswd, getAdminData.get_all_users[index].password)) {
                      _context13.next = 2;
                      break;
                    }

                    return _context13.abrupt("return", res.send("please use another password"));

                  case 2:
                    if (!(getAdminData.get_all_users[index].name === f_name && getAdminData.get_all_users[index].surname === f_last_name)) {
                      _context13.next = 6;
                      break;
                    }

                    return _context13.abrupt("return", res.send("the user already exists"));

                  case 6:
                    _context13.next = 8;
                    return regeneratorRuntime.awrap(bcrypt.genSaltSync(10));

                  case 8:
                    _salt = _context13.sent;
                    _context13.next = 11;
                    return regeneratorRuntime.awrap(bcrypt.hashSync(f_pswd, _salt));

                  case 11:
                    _encryptPassword = _context13.sent;
                    _context13.next = 14;
                    return regeneratorRuntime.awrap(admin_user_table.create({
                      avatar: './public/uploads/' + req.file.originalname,
                      name: f_name,
                      password: _encryptPassword,
                      surname: f_last_name,
                      date_of_birth: f_date_of_birth,
                      address: f_address,
                      email: f_email,
                      phone: f_phone_number,
                      department: f_dp_name,
                      role: f_role
                    }));

                  case 14:
                    return _context13.abrupt("return", res.send("thank you for registering!!"));

                  case 15:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          });

        case 22:
          _context14.next = 27;
          break;

        case 24:
          _context14.prev = 24;
          _context14.t2 = _context14["catch"](8);
          console.log(_context14.t2);

        case 27:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[8, 24]]);
}); //craete blog

var blog_storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/images/blog');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var fl_upload_blog = multer({
  storage: blog_storage
});
routes.post('/cb', fl_upload_blog.single('photo'), function _callee15(req, res) {
  var _req$body3, title, desc, body, getAdminData, createPost;

  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _req$body3 = req.body, title = _req$body3.title, desc = _req$body3.desc, body = _req$body3.body;
          _context15.next = 3;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              email: req.session.email
            }
          }));

        case 3:
          getAdminData = _context15.sent;
          _context15.prev = 4;
          _context15.next = 7;
          return regeneratorRuntime.awrap(church_blog.create({
            authorId: getAdminData.id,
            title: title,
            description: desc,
            body: body,
            pictures: './public/uploads/' + req.file.originalname
          }));

        case 7:
          createPost = _context15.sent;
          return _context15.abrupt("return", res.json(createPost));

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](4);
          console.log(_context15.t0);

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); //create sermons

var se_storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/images/sermon');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var fl_upload_sermon = multer({
  storage: storage
});
routes.post('/cs', function _callee16(req, res) {
  var _req$body4, id, picture, s_title, s_pastor, s_theme, s_body, s_audio, s_pdf, s_link, s_social_link, getAdminData, createSermon;

  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _req$body4 = req.body, id = _req$body4.id, picture = _req$body4.picture, s_title = _req$body4.s_title, s_pastor = _req$body4.s_pastor, s_theme = _req$body4.s_theme, s_body = _req$body4.s_body, s_audio = _req$body4.s_audio, s_pdf = _req$body4.s_pdf, s_link = _req$body4.s_link, s_social_link = _req$body4.s_social_link;
          _context16.next = 3;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              email: req.session.email
            }
          }));

        case 3:
          getAdminData = _context16.sent;
          _context16.prev = 4;
          _context16.next = 7;
          return regeneratorRuntime.awrap(sermons_table.create({
            authorId2: getAdminData.id,
            pic: './public/images/sermon' + req.file.originalname,
            sermons_title: s_title,
            sermon_pastor: s_pastor,
            theme: s_theme,
            sermon_body: s_body,
            sermon_audio: s_audio,
            sermon_pdf: s_pdf,
            sermon_link: s_link,
            sermon_s_link: s_social_link
          }));

        case 7:
          createSermon = _context16.sent;
          return _context16.abrupt("return", res.json(createSermon));

        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](4);
          console.log(_context16.t0);

        case 14:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); //create events

routes.post('/ce', function _callee17(req, res) {
  var _req$body5, picture, ev_title, ev_desc, location, body, createEvents;

  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _req$body5 = req.body, picture = _req$body5.picture, ev_title = _req$body5.ev_title, ev_desc = _req$body5.ev_desc, location = _req$body5.location, body = _req$body5.body;
          _context17.prev = 1;
          _context17.next = 4;
          return regeneratorRuntime.awrap(events_table.create({
            picture: picture,
            ev_title: ev_title,
            ev_desc: ev_desc,
            location: location,
            body: body
          }));

        case 4:
          createEvents = _context17.sent;
          return _context17.abrupt("return", res.json(createEvents));

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](1);
          console.log(_context17.t0);

        case 11:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //add_department
//i didnt seprate routes here because while searching for duplicates 
//i want to be able to bounce to the next route

routes.post('/adp', function _callee18(req, res, next) {
  var dp_name, findDuplicatesDepartment;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          dp_name = req.body.dp_name;
          _context18.next = 3;
          return regeneratorRuntime.awrap(department.findOne({
            where: {
              dp_name: dp_name
            }
          }));

        case 3:
          findDuplicatesDepartment = _context18.sent;
          _context18.prev = 4;

          if (!findDuplicatesDepartment) {
            _context18.next = 9;
            break;
          }

          return _context18.abrupt("return", next());

        case 9:
          _context18.next = 11;
          return regeneratorRuntime.awrap(department.create({
            dp_name: dp_name
          }));

        case 11:
          res.status(200).redirect('/rgw');

        case 12:
          _context18.next = 17;
          break;

        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](4);
          console.log(_context18.t0);

        case 17:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[4, 14]]);
}, function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(res.status(400).render('pages/forms/add_department.ejs', {
            error: "Duplicate Entry",
            errorDesc: "This department already exits",
            name: ""
          }));

        case 3:
          return _context19.abrupt("return", _context19.sent);

        case 6:
          _context19.prev = 6;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);

        case 9:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); //**********************************/
//update request
//**********************************/
//update registered workers

routes.put('/urw/:id', function _callee20(req, res) {
  var _req$body6, id, avatar, name, surname, date_of_birth, address, email, phone, department, role, getAdminData;

  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _req$body6 = req.body, id = _req$body6.id, avatar = _req$body6.avatar, name = _req$body6.name, surname = _req$body6.surname, date_of_birth = _req$body6.date_of_birth, address = _req$body6.address, email = _req$body6.email, phone = _req$body6.phone, department = _req$body6.department, role = _req$body6.role;
          _context20.prev = 1;
          _context20.next = 4;
          return regeneratorRuntime.awrap(admin_user_table.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 4:
          getAdminData = _context20.sent;
          getAdminData.avatar = avatar;
          getAdminData.name = name;
          getAdminData.surname = surname;
          getAdminData.date_of_birth = date_of_birth;
          getAdminData.address = address;
          getAdminData.email = email;
          getAdminData.phone = phone;
          getAdminData.department = department;
          getAdminData.role = role;
          _context20.next = 16;
          return regeneratorRuntime.awrap(getAdminData.save());

        case 16:
          return _context20.abrupt("return", res.send("update successfully"));

        case 19:
          _context20.prev = 19;
          _context20.t0 = _context20["catch"](1);
          console.log(_context20.t0);

        case 22:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[1, 19]]);
}); //update events

routes.put('/ue/:id', function _callee21(req, res) {
  var _req$body7, picture, ev_title, ev_desc, location, body, getAdminData;

  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _req$body7 = req.body, picture = _req$body7.picture, ev_title = _req$body7.ev_title, ev_desc = _req$body7.ev_desc, location = _req$body7.location, body = _req$body7.body;
          _context21.prev = 1;
          _context21.next = 4;
          return regeneratorRuntime.awrap(events_table.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 4:
          getAdminData = _context21.sent;
          getAdminData.picture = picture;
          getAdminData.ev_title = ev_title;
          getAdminData.ev_desc = ev_desc;
          getAdminData.location = location;
          getAdminData.body = body;
          _context21.next = 12;
          return regeneratorRuntime.awrap(getAdminData.save());

        case 12:
          return _context21.abrupt("return", res.send("update successfully"));

        case 15:
          _context21.prev = 15;
          _context21.t0 = _context21["catch"](1);
          console.log(_context21.t0);

        case 18:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[1, 15]]);
}); //update blog

routes.put('/ub/:id', function _callee22(req, res) {
  var _req$body8, title, desc, body, pictures, getAdminData;

  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _req$body8 = req.body, title = _req$body8.title, desc = _req$body8.desc, body = _req$body8.body, pictures = _req$body8.pictures;
          _context22.prev = 1;
          _context22.next = 4;
          return regeneratorRuntime.awrap(church_blog.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 4:
          getAdminData = _context22.sent;
          getAdminData.pictures = pictures;
          getAdminData.title = title;
          getAdminData.description = desc;
          getAdminData.body = body;
          _context22.next = 11;
          return regeneratorRuntime.awrap(getAdminData.save());

        case 11:
          return _context22.abrupt("return", res.send("update successfully"));

        case 14:
          _context22.prev = 14;
          _context22.t0 = _context22["catch"](1);
          console.log(_context22.t0);

        case 17:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[1, 14]]);
}); //update sermons

routes.put('/us/:id', function _callee23(req, res) {
  var _req$body9, picture, s_title, s_pastor, s_theme, s_body, s_audio, s_pdf, s_link, s_social_link, getAdminData;

  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _req$body9 = req.body, picture = _req$body9.picture, s_title = _req$body9.s_title, s_pastor = _req$body9.s_pastor, s_theme = _req$body9.s_theme, s_body = _req$body9.s_body, s_audio = _req$body9.s_audio, s_pdf = _req$body9.s_pdf, s_link = _req$body9.s_link, s_social_link = _req$body9.s_social_link;
          _context23.prev = 1;
          _context23.next = 4;
          return regeneratorRuntime.awrap(sermons_table.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 4:
          getAdminData = _context23.sent;
          getAdminData.pictures = picture;
          getAdminData.sermons_title = s_title;
          getAdminData.sermon_pastor = s_pastor;
          getAdminData.theme = s_theme;
          getAdminData.sermon_body = s_body;
          getAdminData.sermon_audio = s_audio;
          getAdminData.sermon_pdf = s_pdf;
          getAdminData.sermon_link = s_link;
          getAdminData.sermon_s_link = s_social_link;
          _context23.next = 16;
          return regeneratorRuntime.awrap(getAdminData.save());

        case 16:
          return _context23.abrupt("return", res.send("update successfully"));

        case 19:
          _context23.prev = 19;
          _context23.t0 = _context23["catch"](1);
          console.log(_context23.t0);

        case 22:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[1, 19]]);
}); //update department

routes.put('/ed/:id', function _callee24(req, res) {
  var fname, uuid, fetchData;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          fname = req.body.fname;
          _context24.prev = 1;
          uuid = req.params.id;
          _context24.t0 = regeneratorRuntime;
          _context24.next = 6;
          return regeneratorRuntime.awrap(department.findOne({
            where: {
              uuid: uuid.trim()
            }
          }));

        case 6:
          _context24.t1 = _context24.sent;
          _context24.next = 9;
          return _context24.t0.awrap.call(_context24.t0, _context24.t1);

        case 9:
          fetchData = _context24.sent;
          fetchData.dp_name = fname;
          _context24.next = 13;
          return regeneratorRuntime.awrap(fetchData.save());

        case 13:
          _context24.next = 18;
          break;

        case 15:
          _context24.prev = 15;
          _context24.t2 = _context24["catch"](1);
          console.log(_context24.t2);

        case 18:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[1, 15]]);
}); //**********************************/
//delete request
//**********************************/
//delete department

routes["delete"]('/vd/:id', function _callee25(req, res) {
  var uuid, fetchData, _ref, _ref2, get_id, s, auto_id;

  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          uuid = req.params.id; // const fetchData = await department.findOne({ where: { id: uuid.trim() } })

          _context25.next = 4;
          return regeneratorRuntime.awrap(department.findOne({
            where: {
              uuid: uuid
            }
          }));

        case 4:
          fetchData = _context25.sent;
          _context25.next = 7;
          return regeneratorRuntime.awrap(department.destroy());

        case 7:
          _context25.next = 9;
          return regeneratorRuntime.awrap(sequelize.query("SELECT MAX( `id` ) FROM `departments`;", {
            type: QueryTypes.SELECT
          }));

        case 9:
          _ref = _context25.sent;
          _ref2 = _slicedToArray(_ref, 2);
          get_id = _ref2[0];
          s = _ref2[1];
          auto_id = get_id[Object.keys(get_id)[0]] + 1;
          _context25.next = 16;
          return regeneratorRuntime.awrap(sequelize.query("UPDATE `departments` SET id =" + auto_id + ";"));

        case 16:
          _context25.next = 18;
          return regeneratorRuntime.awrap(sequelize.query("ALTER TABLE `departments` AUTO_INCREMENT =" + 1 + ";", {
            type: QueryTypes.ALTER
          }));

        case 18:
          console.log(get_id[Object.keys(get_id)[0]]);
          _context25.next = 24;
          break;

        case 21:
          _context25.prev = 21;
          _context25.t0 = _context25["catch"](0);
          console.log(_context25.t0);

        case 24:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 21]]);
});
routes;
module.exports = routes; // module.exports = routes;