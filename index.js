var nodemailer = require('nodemailer');
var path = require('path');
var fs = require('fs');
var all = [];
var filepath = path.join(__dirname,'gifs');
var currentInd;
var file;

var go = () => {
  getFiles();
}

var getFiles = () => {
  fs.readdir(filepath, function(err, items) {
      console.log(items);
      all = items;
      getCurrentFile();
  });
}

var getCurrentFile = () => {
  fs.readFile(path.join(__dirname,'current.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    currentInd = Number(data);
    file = all[currentInd];
    if (currentInd < 297) {
      currentInd++;
    } else {
      currentInd = 0;
      console.log('ALL AVAILABLE BABY ELEPHANT GIFS HAVE BEEN SENT')
    }
    console.log('new index' + currentInd);
    updateCurrentTextFile();
    sendIt();
  });
}

var updateCurrentTextFile = () => {
  fs.writeFile(path.join(__dirname,'current.txt'), currentInd, (err) => {
    if (err) throw err;
    console.log('The index file has been updated! Index: ' + currentInd);
    });
}

var sendIt = () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bensass123@gmail.com',
      pass: '---'
    }
  });

  var mailOptions = {
    from: 'bensass123@gmail.com',
    to: 'bensass123@gmail.com',
    subject: 'Sending Email using Node.js test 1',
    html: '<div><h1>A fresh and delightful baby elephant gif for you  :)</h1><h3>Video is attached below.</h3></div>',
    attachments: [
      {
        filename: file,
        path: path.join(__dirname,'gifs', file)
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


go();
