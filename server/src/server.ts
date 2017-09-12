"use strict";


var PORT = process.env.PORT || 3333;

import * as express from "express";
import * as os from "os";
import * as fs from "fs";
import { RoutesConfig } from "./conf/routes.conf";
import { DBConfig } from "./conf/db.conf";
import { Routes } from "./routes/index";

const app: express.Express = express();
RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

const opts = {}

export default app;
