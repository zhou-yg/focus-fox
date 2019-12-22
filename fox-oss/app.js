var fs = require('fs');
var path = require('path');
var express = require('express');
var serveIndex = require('serve-index')
var bodyParser = require('body-parser');
var multer  = require('multer')


var upload = multer({
  dest: 'public/',
  limits: '20mb',
});

var app = express();

const PUBLIC_DIR = path.join(__dirname, './public');

app.use((req, res, next) => {
  console.log(req.path);
  console.log(req.headers)

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

  // console.log(ctx.request);
  if (req.method !== 'OPTIONS') {
    return next();
  } else {
    res.status = 200;
  }
});

app.use('/public', express.static(PUBLIC_DIR));
app.use('/public', serveIndex(PUBLIC_DIR));

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));

/*
{ fieldname: 'file',
  originalname: 'a.py',
  encoding: '7bit',
  mimetype: 'text/x-python-script',
  destination: 'public/',
  filename: '103c0131bd28526ed4d852bd19b65b50',
  path: 'public/103c0131bd28526ed4d852bd19b65b50',
  size: 1432 }
*/
app.post('/upload', upload.single('file'), (req, res) => {
  //mkdir
  let fileDest = req.body.dest || '';
  if (/^\//.test(fileDest)) {
    fileDest = `.${fileDest}`;
  }
  const finalFileDest = path.join(PUBLIC_DIR, fileDest);
  fileDest.split('/').filter(v => v).reduce((p, n) => {
    const dir = path.join(PUBLIC_DIR, p, n);
    try {
      fs.mkdirSync(dir);
    } catch (e) {
    }
    return path.join(p, n);
  }, '');

  //mv file
  const sourceFileP = path.join(PUBLIC_DIR, req.file.filename);
  const sourceFileS = fs.createReadStream(sourceFileP);
  const targeFileS = fs.createWriteStream(path.join(finalFileDest, req.file.originalname));

  console.log(new Date(), path.join(finalFileDest, req.file.originalname));

  sourceFileS.pipe(targeFileS);
  targeFileS.on('finish', () => {
    fs.unlink(sourceFileP, () => {});
    res.status(200).send('upload done');
  });
  targeFileS.on('error', (e) => {
    res.status(500).send('upload error:' + e.message);
  });
});

app.post('/remove', upload.none(), (req, res) => {
  let fileDest = req.body.path;
  if (/^\//.test(fileDest)) {
    fileDest = `.${fileDest}`;
  }
  const finalFileDest = path.join(PUBLIC_DIR, fileDest);

  if (fs.existsSync(finalFileDest)) {
    fs.unlink(finalFileDest, () => {
      res.status(200).send('success');
    });
  } else {
    res.status(410).send('null');
  }
});

app.get('/status', (req, res) => {
  let fileDest = req.query.path;
  if (/^\//.test(fileDest)) {
    fileDest = `.${fileDest}`;
  }
  const finalFileDest = path.join(PUBLIC_DIR, fileDest);

  if (fs.existsSync(finalFileDest)) {
    res.json({
      size: fs.readFileSync(finalFileDest).length,
    });
  } else {
    res.json({
      size: 0,
    });
  }
});

module.exports = app;
