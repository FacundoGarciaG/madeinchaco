var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index');
var proyectoRouter = require('./routes/proyecto');
var contenidoRouter = require('./routes/contenido');
var contenidounicoRouter = require('./routes/contenidounico');
var recorrerRouter = require('./routes/recorrer');
var contactoRouter = require('./routes/contacto');
var madeinchacoRouter = require('./routes/madeinchaco');
var loginRouter = require('./routes/admin/login');
var adminContRouter = require('./routes/admin/contenido');
var adminContacRouter = require('./routes/admin/contacto');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})
app.use(multer({storage}).single('imagen'));

app.use(session({
  secret: 'contactoMadeinchacoarg14/06/2021',
  cookie: {maxAge: null},
  resave:false,
  saveUninitialized:true
}));

secured = async(req,res,next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  }catch(error){
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/proyecto', proyectoRouter);
app.use('/contenido', contenidoRouter);
app.use('/contenidounico', contenidounicoRouter);
app.use('/recorrer', recorrerRouter);
app.use('/contacto', contactoRouter);
app.use('/madeinchaco', madeinchacoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/contenido', secured, adminContRouter);
app.use('/admin/contacto', secured, adminContacRouter);  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
