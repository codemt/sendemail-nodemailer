const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path'); 
const nodemailer = require('nodemailer');
const app = express();



// view engine setup.
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

// static folder.
app.use('/public',express.static(path.join(__dirname,'public')));



//body parser middelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/',(req,res)=> {

    res.render('contact');

});
app.post('/send',(req,res)=> { 

    const output = `
    <p> You have a new Contact Request</p>
        <h3> Contact Details </h3>
        <ul>
            <li> Name : ${req.body.name}</li>
            <li> Company : ${req.body.company}</li>
            <li> Email : ${req.body.email}</li>
            <li> Phone : ${req.body.phone}</li>
        </ul>
        <h3>  Messege </h3>
        <p> ${req.body.messege} </p>
    `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({

       //host: 'smtp.ethereal.email',
       // host: 'mail.google.com',
        service : 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mythilmeshram@gmail.com', // generated ethereal user
            pass: 'toxicmetal@2013' // generated ethereal password
            //
        },
        tls:{

            rejectUnauthorized : false

        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mithilesh" <mythilmeshram@gmail.com>', // sender address
        to: 'mythilmeshram@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    
    
    res.render('contact',{msg:'Email has been sent.'});

});

app.listen(3000,()=> console.log('server started..'));



