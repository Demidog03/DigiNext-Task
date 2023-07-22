import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import entityModel from "./entity.model.js";

db.entity = entityModel;

export default db;
