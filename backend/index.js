const express = require('express');
const cors = require('cors');
const MysQlStore = require("express-mysql-session");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const flash = require("connect-flash");
const app = express();
require("dotenv").config();

require('./database');
const { database } = require("./keys");
// Settings

app.set('port', process.env.PORT || 3000);

// Middlewares

app.use(cors({ origin: 'https://portal-net-frontend.vercel.app' }));



app.use(express.json());
app.use(
  session({
    secret: "xavier",
    resave: false,
    saveUninitialized: false,
    store: new MysQlStore(database),
    cookie: { secure: true }
  })
);
app.use(flash())
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));



// Routes
app.use('/signin', require('./routes/auth.router'))
app.use('/servicio', require('./routes/servicio.routes'));
app.use('/proveedor', require('./routes/proveedor.router'));
app.use('/equipo', require('./routes/equipos.router'));
app.use('/producto', require('./routes/producto.router'));
app.use('/usuario', require('./routes/usuario.router'));
app.use('/cliente', require('./routes/cliente.router'));
//app.use('/orden',require('./routes/orden_instalacion.router'));
app.use('/contrato', require('./routes/contrato.router'));
app.use('/factura', require('./routes/factura.router'));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
  console.log("environment:", process.env.NODE_ENV);
});