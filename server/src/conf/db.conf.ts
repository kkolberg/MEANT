"use strict";

import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as config from 'config';


export class DBConfig {
  static init(): void {
    const URL = (process.env.NODE_ENV === "production") ? process.env.MONGOHQ_URL
      : config.get("dbConfig.localhost");

    (<any>mongoose).Promise = Promise;
    mongoose.connect(URL);
    mongoose.connection.on("error", console.error.bind(console, "An error ocurred with the DB connection: "));
  }
};
