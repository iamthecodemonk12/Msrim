const express = require('express');
const bcrypt=require('bcryptjs')
const { QueryTypes } = require('sequelize');
var multer = require('multer');
const mailer=require('nodemailer');
const path = require('path');
const fs=require('fs');
const { position, admin_user_table, church_blog,user_msg, sermons_table, events_table, books, department,mail_sub, sequelize } = require('../db/models');
const routes = express.Router();

//protect route function using session//
function _protect(req, res, next) {
    if (!req.session.email) {
        return res.render('pages/samples/login.ejs', {
            error: " ",
            errorDesc: " ",
            name: ""const {fname,fpswd,femail,fpn}=req.body;
            // duplicateEntry(Admin,res);//find duplicates in the array
            // //in case the database is empty 
            // if(Admin.length < 0){
            //       const admin_added=await Admin.create({name:"admin",password:EncryptData("admin"),email:"admin@gmail.com",phone_number:12345,profile_picture:storeUploadPath.admin+'/'+'IMG_20220729_184655.JPG'});
            //       return res.json(admin_added);
            // }
            // const admin_added=await Admin.create({name:fname,password:EncryptData(fpswd),email:femail,phone_number:fpn,profile_picture:storeUploadPath.admin+req.file.filename});
            // return res.json(admin_added);
        });
        // return res.status(200).redirect('/login');
    } else {
        next();
    }
    // console.log(req)
}

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
};
//**********************************/
//get request
//**********************************/
// routes.get('populate_nav', async function(req, res) {
//     const getAdminData = await admin_user_table.findOne({ where: { email: req.session.email } });
//     return res.json(getAdminData);
// });

//display the church data on login
routes.get('/dpIcon', _protect, async function(req, res) {
    try {
        const getAdminData = await admin_user_table.findOne({ where: { email: req.session.email } });
        return res.json(getAdminData.avatar);
    } catch (error) {

    }
});
routes.get('/login', async function(req, res) {
    if (!req.session.email) {
        return res.render('pages/samples/login.ejs', {
            error: " ",
            errorDesc: " ",
            name: ""
        });
    } else {
        const getAdminData = await admin_user_table.findOne({ where: { email: req.session.email } });
        res.status(200).redirect('/');
        return res.render('pages/index', {
            name: "Welcome" + "\t" + getAdminData.name + "\t" + getAdminData.surname,
            workers:await admin_user_table.findAll(),
            books:await books.findAll(),
            msg:await user_msg.findAll(),
            sermons:await sermons_table.findAll(),
            days:["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
        });
    }
    // console.log(req.session)sxa
});

//view manual
routes.get('/manual',async function(req,res){
    res.render('pages/documentation/documentation.ejs')
})
//view books
routes.get('/vrbks', async function(req, res) {
    try {
        const books_ = await books.findAll();
        res.render('pages/tables/view books.ejs', {
            retrieved_data: books_
        });
    } catch (error) {
        
    }
});
routes.get('/viewblogs', async function(req, res) {
    try {
        const blogPosts = await church_blog.findAll({ include: [admin_user_table] });
        return res.json(blogPosts);
    } catch (error) {
        
    }
});

//register workers
routes.get('/rgw', _protect, function(req, res) {
    res.render('pages/forms/registerworkers.ejs',{
        error: "",
        errorDesc: "",
        name: ""
    });
    // console.log(req.session)
});

//add department
routes.get('/ad', _protect, function(req, res) {
    res.render('pages/forms/add_department.ejs', {
        error: "",
        errorDesc: "",
        name: ""
    });
});

//add position
routes.get('/ap', _protect, function(req, res) {
    res.render('pages/forms/add_position.ejs', {
        error: "",
        errorDesc: "",
        name: ""
    });
});
//create blogs
routes.get('/crb', _protect, function(req, res) {
    res.render('pages/forms/blog.ejs')
});

//create sermons
routes.get('/crs', _protect, function(req, res) {
    res.render('pages/forms/sermon.ejs',{
        error: errorS,
        errorDesc: errorSD,
        name: ""
    });
});

//create events
routes.get('/cre', _protect, function(req, res) {
    res.render('pages/forms/events.ejs')
});

//upload books
let erroT="";
let errorDescri="";
routes.get('/crbks', _protect, function(req, res) {
    res.render('pages/forms/book.ejs',{
        error: errorT,
        errorDesc: errorDescri,
        name: ""
    });
});

//view blogs
routes.get('/vb', _protect, async function(req, res) {
    const fetchedData = await church_blog.findAll();
    res.render('pages/tables/view_blog.ejs', {
        retrieved_data: fetchedData
    });
});

//view workers
routes.get('/vw', _protect, async function(req, res) {
    const fetchedData = await admin_user_table.findAll();
    res.render('pages/tables/view workers.ejs', {
        retrieved_data: fetchedData
    });
});

//view event
routes.get('/ve', _protect, async function(req, res) {
    try {
        const fetchevents = await events_table.findAll();
        res.render('pages/tables/view events.ejs', {
            retrieved_data: fetchevents
        });
    } catch (error) {
        
    }
});

//view sermon
routes.get('/vs', _protect, async function(req, res) {
    try {
        const fetchevents = await sermons_table.findAll();
        res.render('pages/tables/view sermons.ejs', {
            retrieved_data: fetchevents
        });
    } catch (error) {
        
    }
});

//view subscribed emails
routes.get('/se', _protect,async function(req, res) {
    try {
        const subscribed_email=await mail_sub.findAll();
        res.render('pages/tables/subscriber-email.ejs',{
            mails:subscribed_email
        });   
    } catch (error) {
        res.send(error);
    }
});

//view users sent messages
routes.get('/msg', _protect,async function(req, res) {
    const msg=await user_msg.findAll();
    res.render('pages/tables/msg.ejs',{
        msg_data:msg
    });
});

//reply user messages
routes.get('/rmsg/:uuid', _protect, async function(req, res) {
    const fetchedData = await user_msg.findOne(
        {where:{
            uuid:req.params.uuid
        }}
    );
    res.render('pages/protected_routes/reply_msg.ejs', {
        msg_data: fetchedData
    });
});

//subscribers messages
routes.get('/submail/:uuid', _protect, async function(req, res) {
    const fetchedData = await mail_sub.findOne(
        {where:{
            uuid:req.params.uuid
        }}
    );
    res.render('pages/protected_routes/sub_mail.ejs', {
        msg_data: fetchedData
    });
});

//send user mail
routes.post('/sndmsg',async function(req,res){
    const {femail,fbody}=req.body;
    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
    });
      
    let mailOptions = {
        from: 'youremail@gmail.com',
        to: femail,
        subject: 'morning salvation and revelation international ministries',
        text: fbody
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          
        } else {
          console.log('Email sent: ' + info.response);
        }
    }); 
});

//send user mail
routes.post('/submail',async function(req,res){
    const {femail,fbody}=req.body;
    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
    });
      
    let mailOptions = {
        from: 'youremail@gmail.com',
        to: femail,
        subject: 'morning salvation and revelation international ministries',const {fname,fpswd,femail,fpn}=req.body;
            // duplicateEntry(Admin,res);//find duplicates in the array
            // //in case the database is empty 
            // if(Admin.length < 0){
            //       const admin_added=await Admin.create({name:"admin",password:EncryptData("admin"),email:"admin@gmail.com",phone_number:12345,profile_picture:storeUploadPath.admin+'/'+'IMG_20220729_184655.JPG'});
            //       return res.json(admin_added);
            // }
            // const admin_added=await Admin.create({name:fname,password:EncryptData(fpswd),email:femail,phone_number:fpn,profile_picture:storeUploadPath.admin+req.file.filename});
            // return res.json(admin_added);
        text: fbody
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          
        } else {
          console.log('Email sent: ' + info.response);
        }
    }); 
});

routes.get('/g_AllData', _protect, async function(req, res) {
    try {
        const fetch_data_dep = await department.findAll();
        const fetch_data_pos=await position.findAll()
        return res.json({"dep":fetch_data_dep,"pos":fetch_data_pos});

    } catch (error) {
        
    }
});

//view department
routes.get('/vd', _protect, async function(req, res) {
    try {
        const fetch_data = await department.findAll();
        return res.render('pages/tables/view_dep.ejs', {
            db_data: fetch_data
        });
    } catch (error) {
        
    }
});

routes.get('/vp',_protect,async function(req,res){
    try {
        const fetch_data = await position.findAll();
        return res.render('pages/tables/view_pos.ejs', {
            db_data: fetch_data
        });
    } catch (error) {
        
    }
});
//edit get routes

//edit department
routes.get('/ed/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const findOneDep = await department.findOne({ where: {  uuid } });
        return res.render('pages/protected_routes/edit_department.ejs', {
            error: "",
            errorDesc: "",
            name: findOneDep.dp_name
        });
    } catch (e) {
        console.log(e);
    }
});

//delete department 
routes.get('/dd/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delDep.ejs');
    } catch (error) {
        
    }
})

//delete position
routes.get('/dp/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delPos.ejs');
    } catch (error) {
        
    }
});

//delete worker 
routes.get('/dw/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delWrkr.ejs');
    } catch (error) {
        
    }
});

//delete ev
routes.get('/de/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delEv.ejs');
    } catch (error) {
        
    }
});

//delete sermon 
routes.get('/ds/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delSer.ejs');
    } catch (error) {
        
    }
});

//delete books 
routes.get('/dbks/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delBks.ejs');
    } catch (error) {
        
    }
});

//delete message
routes.get('/dmsg/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delMsg.ejs');
    } catch (error) {
        
    }
});

//delete subscribers email 
routes.get('/dms/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delSubMail.ejs');
    } catch (error) {
        
    }
});

//delete blog 
routes.get('/dblg/:uuid',_protect,async function(req,res){
    try {
        return res.render('pages/delete pages/delBlog.ejs');
    } catch (error) {
        
    }
});

//edit department
routes.get('/ep/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const findOneDep = await position.findOne({ where: {  uuid } });
        return res.render('pages/protected_routes/edit_position.ejs', {
            error: "",
            errorDesc: "",
            name: findOneDep.dp_name
        });
    } catch (e) {
        console.log(e);
    }
});

//edit workers
routes.get('/edw/:id', _protect, async function(req, res) {
    try {
        const uuid = req.params.id;
        const findOneWorker = await admin_user_table.findOne({ where: { uuid: uuid } });
        return res.render('pages/protected_routes/editregisterworkers.ejs', {
            findOneWorker
        });
    } catch (e) {
        console.log(e);
    }
});

//view worker profile
routes.get('/vwp/:id', _protect, async function(req, res) {
    try {
        const uuid = req.params.id;
        const findOneWorker = await admin_user_table.findOne({ where: { uuid: uuid } });
        // console.log(findOneWorker.picture.replace("./public","../..").trim());
        return res.render('pages/details_workers/show_workers.ejs', {
            findOneWorker,
            profile_img:findOneWorker.picture.replace("./public/uploads/workers","../../uploads/workers/").trim()
        });
    } catch (e) {
        console.log(e);
    }
});

//edit events
routes.get('/ede/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const findOneWorker = await events_table.findOne({ where: { uuid: uuid } });
        return res.render('pages/protected_routes/events.ejs', {
            findOneWorker
        });
    } catch (e) {
        console.log(e);
    }
});

//edit blog
routes.get('/edb/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const findOneWorker = await church_blog.findOne({ where: { uuid:uuid } });
        return res.render('pages/protected_routes/blog.ejs', {
            findOneWorker
        });
    } catch (e) {
        console.log(e);
    }
});

//view blog detail
routes.get('/vbd/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const getblog = await church_blog.findOne({ where: { uuid: uuid } });
        return res.render('blog_single.ejs', {
            blog:getblog,
            days:["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
        });
    } catch (e) {
        console.log(e);
    }
});

//view events detail
routes.get('/ved/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const getevents = await events_table.findOne({ where: { uuid: uuid } });
        return res.render('event_single.ejs', {
            events:getevents,
            days:["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
        });
    } catch (e) {
        console.log(e);
    }
});

//view sermon detail
routes.get('/vsd/:uuid', _protect, async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const getevents = await sermons_table.findOne({ where: { uuid: uuid } });
        return res.render('sermon_single.ejs', {
            sermon:getevents,
            days:["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
        });
    } catch (e) {
        console.log(e);
    }
});

//edit sermons
routes.get('/eds/:id', _protect, async function(req, res) {
    try {
        const uuid = req.params.id;
        const findOneWorker = await sermons_table.findOne({ where: { id: uuid } });
        return res.render('pages/protected_routes/sermon.ejs', {
            findOneWorker
        });
    } catch (e) {
        console.log(e);
    }
});

//delete sessions and logout
routes.get('/logout', function(req, res) {
    if (req.session.email) {
        req.session.destroy(async function(err) {
            if (err) {
                console.log("Session error" + e);const {fname,fpswd,femail,fpn}=req.body;
            // duplicateEntry(Admin,res);//find duplicates in the array
            // //in case the database is empty 
            // if(Admin.length < 0){
            //       const admin_added=await Admin.create({name:"admin",password:EncryptData("admin"),email:"admin@gmail.com",phone_number:12345,profile_picture:storeUploadPath.admin+'/'+'IMG_20220729_184655.JPG'});
            //       return res.json(admin_added);
            // }
            // const admin_added=await Admin.create({name:fname,password:EncryptData(fpswd),email:femail,phone_number:fpn,profile_picture:storeUploadPath.admin+req.file.filename});
            // return res.json(admin_added);
                return await res.status(200).redirect('/login');
            } else {
                console.log("oops this route is working");
                res.clearCookie(process.env.session_name);
                return res.status(200).redirect('/login');
            }
        });
    }
    console.log(process.env.session_name);
    // console.log(process.env.session_name);
});
//**********************************/
//post request
//**********************************/
//login 
let errorText = ' ';
let errorType = ' ';
routes.post('/lg', async function(req, res, next) {
    try {
        //i used the length to check if the value is null or nut
        const { usr_email, pswd } = req.body;
        const getWorkers = await admin_user_table.findAll({ where: { email: usr_email } });
        if (getWorkers.length === 0) { //if the user is null the value is 0 which simply means the email doesnt exist
            errorText = "No User with such name exists";
            errorType = "invalid Login";
            return next();
        } else {
            getWorkers.forEach(async function(value, index) {
                if (bcrypt.compareSync(pswd, getWorkers[index].password)) {
                    console.log("password is correct");
                    if (getWorkers[index].role !== "Admin") {
                        // console.log("your valid but you are not admin");
                        errorText = "Only Admins are allowed";
                        errorType = "Credentials Error";
                        return next();
                    } else {
                        req.session.email = usr_email;
                        // console.log(req.session);
                        return res.status(200).redirect('/');

                    }
                    // return await res.json("working")
                } else {
                    errorText = "invalid Password";
                    errorType = "Authentication Error";
                    // console.log("Wrong password");
                    return next();
                }
            });
        }
        //begin 
        //check if name exists

    } catch (e) {
        console.log(e);
    }
}, async function(req, res) {
    try {
        return await res.status(400).render('pages/samples/login.ejs', {
            error: errorType,
            errorDesc: errorText,
            name: ""
        });
        console.log(errorType)
    } catch (error) {
        
    }
});
//create workers
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/workers');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fl_upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
});
//this alogrithm servers as custom function to check if the file type
function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); //using regex expression check if the file type is valid
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extname) {
        cb(null, true)
    } else {
        cb("only images are allowed");
    }
}
let error="";
let errorDesc="";
let name="";
routes.post('/cw', fl_upload.single('photo'), async function(req, res,next) {
    const { f_name, f_pswd, f_last_name, f_date_of_birth, f_address, f_email, f_phone_number, f_dp_name, f_role, f_position, f_age, f_gender } = req.body;
    const getAdminData = {
        get_one_user: await admin_user_table.findOne({ where: { name: f_name, surname: f_last_name } }), //check if the last name and first name exits
        get_all_users: await admin_user_table.findAll()
    };
    try {
        //this is done incase there is no value in the database
        if (getAdminData.get_all_users.length <= 0) {
            const salt = await bcrypt.genSaltSync(10);
            const encryptPassword = await bcrypt.hashSync(f_pswd, salt);
            await admin_user_table.create({ picture: './public/uploads/workers' + req.file.filename, name: f_name, age: f_age, password: encryptPassword, surname: f_last_name, date_of_birth: f_date_of_birth, address: f_address, email: f_email, phone_number: f_phone_number, department: f_dp_name, role: f_role, position: f_position, gender: f_gender });
            // console.log(res.json(resp))
            return res.redirect('/vw');
        } else {
            getAdminData.get_all_users.forEach(async function(value, index) {
                if (bcrypt.compareSync(f_pswd, getAdminData.get_all_users[index].password)) {
                    error="Duplicate Password";
                    errorDesc="This password is already in use";
                    return next();
                    // return res.send("please use another password");
                }
                if (getAdminData.get_all_users[index].name === f_name && getAdminData.get_all_users[index].surname === f_last_name) {
                    error="Duplicate Entry";
                    errorDesc="This user already exits";
                    return next();
                    // return res.send("the user already exists");
                } else {
                    const salt = await bcrypt.genSaltSync(10);
                    const encryptPassword = await bcrypt.hashSync(f_pswd, salt);
                    await admin_user_table.create({ picture: './public/uploads/workers' + req.file.filename, name: f_name, age: f_age, password: encryptPassword, surname: f_last_name, date_of_birth: f_date_of_birth, address: f_address, email: f_email, phone_number: f_phone_number, department: f_dp_name, role: f_role, position: f_position, gender: f_gender });
                    return res.status(400).redirect('/');
                }
            });
        }
    } catch (error) {
        // if(error){
        //     error=error
        //     return next();
        // }
        console.log(error)
    }
},async function(req,res){
    return res.render('pages/forms/registerworkers.ejs',{
        error: error,
        errorDesc: error,
        name: ""
    });
});

//craete blog
const blog_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/blog');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fl_upload_blog = multer({ storage: blog_storage });
routes.post('/cb', fl_upload_blog.single('photo'), async function(req, res) {
    const { author,title, desc, body } = req.body;
    const getAdminData = await admin_user_table.findOne({ where: { email: req.session.email } });
    try {
        const createPost = await church_blog.create({ authorId: getAdminData.id,author, title, description: desc, body, pictures: './public/uploads/blog' + req.file.filename, });
        // return res.json(createPost);
        return res.status(200).redirect('/vb');
    } catch (error) {
        
    }
});

//create sermons
const se_storage_image = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/sermon');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let errorS="";
let errorSD="";
const fl_upload_sermon_img = multer({ storage: se_storage_image });
routes.post('/cs', fl_upload_sermon_img.fields([{ name: 'photo' }, { name: 'audio' }, { name: 'pdf' }]), async function(req, res,next) {
    const { s_title, s_pastor, s_theme, s_body, s_social_link } = req.body;
    // console.log("./"+req.files.photo[0].path);
    try {
        await sermons_table.create({ pic:'./public/uploads/sermon'+req.files.photo[0].path, sermons_title: s_title, sermon_pastor: s_pastor, theme: s_theme, sermon_body: s_body, sermon_audio:'./public/uploads/sermon'+req.files.audio[0].path, sermon_pdf:'./public/uploads/sermon'+req.files.pdf[0].path, sermon_s_link: s_social_link });
        // return res.json(createSermon);
        return res.status(200).redirect('/vs');
        // console.log('./public/uploads/sermon'+req.files);
    } catch (error) {
        errorS="Error In Form Processing";
        errorSD=error;
        return next();
    }
},async function(req,res){
    return res.render('pages/forms/sermon.ejs',{
        error: errorS,
        errorDesc: errorSD,
        name: ""
    });
});

//create events
const event_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/event');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fl_upload_event = multer({ storage: event_storage });
routes.post('/ce', fl_upload_event.single('photo'), async function(req, res) {
    const { ev_title, ev_desc, location, body,ev_date } = req.body;
    try {
        const createEvents = await events_table.create({ picture: './public/images/event' + req.file.filename, ev_title, ev_desc, location, body,event_date:ev_date });
        return res.status(200).redirect('/ve');
    } catch (error) {
        
    }
});

//create books
const books_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/books upload');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let errorT="";
let errorDescription="";
const fl_upload_books = multer({ storage: books_storage });
routes.post('/crbks', fl_upload_books.fields([{ name: 'c_book' }, { name: 'book' }]), async function(req, res,next) {
    const { title, desc,auth,Isbn } = req.body;
    try {
        const createBooks = await books.create({ path: './public/uploads/books upload' + req.files.book[0].path,cover_pic:'./public/uploads/books upload' + req.files.c_book[0].path, title, description: desc,author:auth,isbn:Isbn });
        return res.status(200).redirect('/vrbks');
    } catch (error) {
       errorT="Encountered and Error";
       errorDescription=error;
       return next(); 
    }
},async function(req,res){
    return res.render('pages/forms/book.ejs',{
        error: errorT,
        errorDesc: errorDescription,
        name: ""
    });
});

//add_department

//i didnt seprate routes here because while searching for duplicates 
//i want to be able to bounce to the next route
routes.post('/adp', async function(req, res, next) {
    const { dp_name } = req.body;
    const findDuplicatesDepartment = await department.findOne({ where: { dp_name } });
    try {
        if (findDuplicatesDepartment) return next();
        else {
            await department.create({ dp_name });
            res.status(200).redirect('/rgw');
        }
    } catch (error) {
        
    }
}, async function(req, res) {
    try {
        return await res.status(400).render('pages/forms/add_department.ejs', {
            error: "Duplicate Entry",
            errorDesc: "This department already exits",
            name: ""
        });
    } catch (error) {
        
    }
});

//add church position
routes.post('/app', async function(req, res, next) {
    const { position_name } = req.body;
    const findDuplicatesDepartment = await position.findOne({ where: { name:position_name } });
    try {
        if (findDuplicatesDepartment) return next();
        else {
            await position.create({ name:position_name });
            res.status(200).redirect('/rgw');
        }
    } catch (error) {
        
    }
}, async function(req, res) {
    try {
        return await res.status(400).render('pages/forms/add_position.ejs', {
            error: "Duplicate Entry",
            errorDesc: "This position already exits",
            name: ""
        });
    } catch (error) {
        
    }
});
//**********************************/
//update request
//**********************************/

//update registered workers
routes.put('/urw/:id', async function(req, res) {
    const { position, avatar, name, surname, date_of_birth, address, email, phone, department, role } = req.body;
    try {
        const getAdminData = await admin_user_table.findOne({ where: { id: req.params.id } });
        getAdminData.avatar = avatar;
        getAdminData.name = name;
        getAdminData.surname = surname;
        getAdminData.date_of_birth = date_of_birth;
        getAdminData.address = address;
        getAdminData.email = email;
        getAdminData.phone = phone;
        getAdminData.department = department;
        getAdminData.role = role;
        getAdminData.position = position;
        await getAdminData.save();
        return res.send("update successfully");
    } catch (error) {
        
    }
});

//update events
routes.put('/ue/:id', async function(req, res) {
    const { picture, ev_title, ev_desc, location, body } = req.body;
    try {
        const getAdminData = await events_table.findOne({ where: { id: req.params.id } });
        getAdminData.picture = picture;
        getAdminData.ev_title = ev_title;
        getAdminData.ev_desc = ev_desc;
        getAdminData.location = location;
        getAdminData.body = body;
        await getAdminData.save();
        return res.send("update successfully");
    } catch (error) {
        
    }
});

//update blog
const blog_storage_update = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/blog');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fl_upload_blog_update = multer({ storage: blog_storage_update });
routes.put('/ub',fl_upload_blog_update.single('photo'), async function(req, res) {
    const { title, desc, body, pictures } = req.body;
    try {
        // const getAdminData = await church_blog.findOne({ where: {title:title } });
        // getAdminData.pictures = './public/uploads/blog' + req.file.filename;
        // getAdminData.title = title;
        // getAdminData.description = desc;
        // getAdminData.body = body;
        // await getAdminData.save();
        // return res.send("update successfully");
        console.log("Working")
    } catch (error) {
        
    }
});

//update sermons
routes.put('/us/:id', async function(req, res) {
    const { picture, s_title, s_pastor, s_theme, s_body, s_audio, s_pdf, s_link, s_social_link } = req.body;
    try {
        const getAdminData = await sermons_table.findOne({ where: { id: req.params.id } });
        getAdminData.pictures = picture;
        getAdminData.sermons_title = s_title;
        getAdminData.sermon_pastor = s_pastor;
        getAdminData.theme = s_theme;
        getAdminData.sermon_body = s_body;
        getAdminData.sermon_audio = s_audio;
        getAdminData.sermon_pdf = s_pdf;
        getAdminData.sermon_link = s_link;
        getAdminData.sermon_s_link = s_social_link;
        await getAdminData.save();
        return res.send("update successfully");
    } catch (error) {
        
    }
});

//update department
routes.patch('/ed/:uuid', async function(req, res) {
    const { fname } = req.body;
    try {
        const uuid = req.params.uuid;
        const fetchData = await department.findOne({ where: { uuid: uuid.trim() } })
        fetchData.dp_name = fname;
        console.log("my input"+fname)
        await fetchData.save();
    } catch (error) {
        GET
    }
});

//update department
routes.put('/ep/:uuid', async function(req, res) {
    const { fname } = req.body;
    try {
        const uuid = req.params.uuid;
        const fetchData = await position.findOne({ where: { uuid: uuid.trim() } })
        fetchData.name = fname;
        // console.log(fname)
        // await fetchData.save();
    } catch (error) {
        
    }
});

//update books
routes.put('/ub/:id', async function(req, res) {
    const { fname } = req.body;
    try {
        const uuid = req.params.uuid;
        const fetchData = await await admin_user_table.findOne({ where: { uuid: uuid.trim() } })
        fetchData.dp_name = fname;
        await fetchData.save();
    } catch (error) {
        
    }
});

//**********************************/
//delete request
//**********************************/
//delete department
routes.delete('/dd/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;GET
        // const fetchData = await department.findOne({ where: { id: uuid.trim() } })
        const fetchData = await department.findOne({ where: { uuid: uuid } })
            // fetchData
        await department.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `departments`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] -1 ;
        await sequelize.query("UPDATE `departments` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `departments` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete position
routes.delete('/dp/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await position.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `positions`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `positions` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `positions` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete mail subscribers
routes.delete('/dms/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await mail_sub.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `mail_subs`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `mail_subs` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `positions` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete worker
routes.delete('/dw/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        const fetchData = await admin_user_table.findOne({ where: { uuid: uuid } })
            // fetchData
        fs.unlinkSync(fetchData.picture.replace("./public/uploads/workers","../../uploads/workers/").trim());
        // console.log("output:-"+fetchData.picture);
        await admin_user_table.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `admin_user_tables`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `admin_user_tables` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `admin_user_tables` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete events
routes.delete('/de/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await events_table.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `events_tables`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `events_tables` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `events_tables` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete sermon
routes.delete('/ds/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await sermons_table.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `sermons_tables`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `sermons_tables` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `sermons_tables` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete books
routes.delete('/dbks/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await books.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `books`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `books` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `books` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete user messages
routes.delete('/dmsg/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await user_msg.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `user_msgs`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `user_msgs` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `user_msgs` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});

//delete blog
routes.delete('/dblg/:uuid', async function(req, res) {
    try {
        const uuid = req.params.uuid;
        // const fetchData = await position.findOne({ where: { uuid: uuid } })
            // fetchData
        await church_blog.destroy({where:{uuid:uuid.trim()}});
        const [get_id, s] = await sequelize.query("SELECT MAX( `id` ) FROM `church_blogs`;", { type: QueryTypes.SELECT });
        let auto_id = get_id[Object.keys(get_id)[0]] - 1;
        await sequelize.query("UPDATE `church_blogs` SET id =" + auto_id + ";")
        await sequelize.query("ALTER TABLE `church_blogs` AUTO_INCREMENT =" + 1 + ";", { type: QueryTypes.ALTER });
        // console.log(get_id[Object.keys(get_id)[0]]);
    } catch (error) {
        
    }
});
module.exports=routes;
