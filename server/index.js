require("dotenv").config();
require("./db");

const express = require("express");
const next = require("next");
const route = require("./routes");
const passport = require("passport");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const auth = require("./auth");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const store = new mongoDbStore({
  uri: dev ? "mongodb://localhost/journal" : process.env.URI,
  collection: "session"
});

app.prepare().then(() => {
  const server = express();
  auth();
  server.use(
    session({
      secret: "thisIsASecret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24  //one day
      },
      resave: false,
      saveUninitialized: true,
      store
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());

  const restricAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/auth");
    next();
  };
  const isLogedIn = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect("/");
    next();
  };

  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());

  server.use('/api', restricAccess)
  server.use('/auth', isLogedIn)
  server.use(route);
  
  server.get("/",restricAccess,  (req, res) => {
    return app.render(req, res, "/index", {userId: req.user.id, color: 'green'});
  });
	
	server.get("/logout", restricAccess, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get("*", handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
