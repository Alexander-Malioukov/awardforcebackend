import express from 'express';
import loginRouter from './auth/login';
import settingRouter from './settings';
import entryRouter from './entries';
import basicRouter from './basic';
import dashboardRouter from './dashboard';

const router = express.Router();

// function requiresLogin(req, res, next) {
//     if (req.session && req.session.admin && req.session.admin.id) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }

// function alreadyLogin(req, res, next) {
//     // console.log('alreadyLogin', req.url);
//     if (req.url === '/logout') {
//         return next();
//     }
//     if (req.session && req.session.admin && req.session.admin.id) {
//         res.redirect('/');
//     } else {
//         return next();
//     }
// }

// router.use('/password', alreadyLogin, passwordRouter);
// router.use('/login', alreadyLogin, loginRouter);
// router.use('/', requiresLogin, dashboardRouter);
// router.use('/settings', requiresLogin, settingRouter);
router.use('/settings', settingRouter);
router.use('/entry', entryRouter);
router.use('/basic', basicRouter);

router.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.send({ error: 'Not found1' });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found2' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found3');
});

export default router;




