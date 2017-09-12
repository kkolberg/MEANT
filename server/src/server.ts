"use strict";


var PORT = process.env.PORT || 3333;

import * as express from "express";
import * as os from "os";
import * as http2 from "spdy";
import * as fs from "fs";
import { RoutesConfig } from "./config/routes.conf";
import { DBConfig } from "./config/db.conf";
import { Routes } from "./routes/index";

const app: express.Express = express();
RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

const opts = {
  key: fs.readFileSync(__dirname + "/cert/server.key"),
  cert: fs.readFileSync(__dirname + "/cert/server.crt")
}

export default app;
