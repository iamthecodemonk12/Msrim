const express = require('express');
const { mail_sub, user_msg, sermons_table, events_table, church_blog, books } = require('../db/models');
const { get } = require('./adminroutes');
const routes = express.Router();

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

const fetch_data = [{
    getAllData: async function(limit, offset) {
        const data = {
            blog: await church_blog.findAll({
                limit,
                offset
            }),
            events: await events_table.findAll({
                limit,
                offset
            }),
            sermon: await sermons_table.findAll({
                limit,
                offset
            }),
            book: await books.findAll({
                limit,
                offset
            }),
        }
        return data;
    }
}, ]
const global_data = {
    days: ["Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"],
    d: new Date()
}
routes.get(['/msrm', '/'], async function(req, res) {
    const fd = fetch_data;

    //if there is no blog
    res.render('index', {
        blog: (await fd[0].getAllData()).blog,
        date: global_data.d,
        days: global_data.days,
        events: (await fd[0].getAllData()).events,
        sermons: (await fd[0].getAllData()).sermon,
    });
    // console.log((await fd[0].getAllData()).blog.length)
});
routes.get('/about', function(req, res) {
    res.render('about', {});
});
routes.get('/sermons', async function(req, res) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const fd = fetch_data;
    res.render('sermons', {
        sermons: (await fd[0].getAllData(limit,offset)).sermon,
        length_of_sermon: await sermons_table.findAll(),
        days: global_data.days,
        d: global_data.d
    });
});
routes.get('/books', async function(req, res) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const fd = fetch_data;
    res.render('books', {
        books: (await fd[0].getAllData(limit,offset)).book,
        days: global_data.days,
        d: global_data.d,
          one_data: await books.findAll(),
    });
});
routes.get('/events', async function(req, res) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const fd = fetch_data;
    res.render('events', {
        events: (await fd[0].getAllData(limit, offset)).events,
        one_data: await events_table.findAll(),
        // pageData:getPagingData(),
        days: global_data.days,
        d: global_data.d
    });
});
routes.get('/edate', async function(req, res) {
    const fd = fetch_data;
    res.json({
        "date": (await fd[0].getAllData()).events[(await fd[0].getAllData()).events.length - 1].event_date
    })
});
routes.get('/blog', async function(req, res) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const fd = fetch_data;
    res.render('blog', {
        blog: (await fd[0].getAllData(limit, offset)).blog,
        one_data: await church_blog.findAll(),
        days: global_data.days
    });
});

routes.get('/contact', function(req, res) {
    res.render('contact', {});
});

routes.get('/blog/:title', async function(req, res) {
    const title = req.params.title;
    const fd = fetch_data;
    const getblog = await church_blog.findOne({
        where: {
            title,
        }
    });
    if(getblog ===null){
        return res.render('404');
    }
    res.render('blog_single', {
        blog: getblog,
        days: global_data.days
            // blog:(await fd[0].getAllData()).blog
    })
});

routes.get('/events/:title', async function(req, res) {
    try {
        const title = req.params.title;
        console.log(title);
        const fd = fetch_data;
        const getevents = await events_table.findOne({
            where: {
                ev_title: title,
            }
        });
        if(getevents ===null){
            return res.render('404');
        }
        res.render('event_single', {
            events: getevents,
            days: global_data.days,
            d: global_data.d
                // blog:(await fd[0].getAllData()).blog
        });
    } catch (error) {
        console.log(error)
    }
});

routes.get('/books/:title', async function(req, res) {
    try {
        const title = req.params.title;
        const fd = fetch_data;
        const getbooks = await books.findOne({
            where: {
                title,
            }
        });
        if(getbooks ===null){
            return res.render('404');
        }
        res.render('books_single', {
            books: getbooks,
            days: global_data.days,
            d: global_data.d
                // blog:(await fd[0].getAllData()).blog
        });
    } catch (error) {
        console.log(error)
    }
});

routes.get('/sermons/:title', async function(req, res) {
    const title = req.params.title;
    const fd = fetch_data;
    const getsermon = await sermons_table.findOne({
        where: {
            sermons_title: title,
        }
    });
    if(getsermon ===null){
        return res.render('404');
    }
    res.render('sermon_single', {
        sermon: getsermon,
        days: ["Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]
            // blog:(await fd[0].getAllData()).blog
    })
});

//the post rs
routes.post('/mail_sub', async function(req, res) {
    const { ename } = req.body;
    // await mail_sub.findOne({ where: { email: ename } });
    try {
        await mail_sub.create({ email: ename });
    } catch (error) {
        console.log(error);
    }
});

routes.post('/usermsg', async function(req, res) {
    const { fname, femail, fmsg } = req.body;
    try {
        await user_msg.create({ name: fname, email: femail, msg: fmsg });
    } catch (error) {
        console.log(error);
    }
});

//404 page
routes.get("*",function(req,res){
    res.render('404');
});
module.exports = routes;