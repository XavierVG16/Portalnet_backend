const express = require('express');
const cors = require('cors');
const MysQlStore = require("express-mysql-session");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const app = express();
require("dotenv").config();


require('./database');
const { database } = require("./keys");
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({ origin: 'https://sistema-portalnet.herokuapp.com' }));
app.use(express.json());
app.use(
  session({
    secret: "xavier",
    resave: false,
    saveUninitialized: false,
    store: new MysQlStore(database),
  })
);
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

// Routes
//app.use( '/user',require('./routes/user.router'))
app.use('/servicio', require('./routes/servicio.routes'));
app.use('/proveedor', require('./routes/proveedor.router'));
app.use('/equipo', require('./routes/equipos.router'));
app.use('/producto', require('./routes/producto.router') );
app.use('/usuario', require('./routes/usuario.router'));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
  console.log("environment:", process.env.NODE_ENV);
});