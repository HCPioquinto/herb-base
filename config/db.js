const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUri');
const Grid = require('gridfs-stream');

const InitImageUpload = async () => {
  const conn = mongoose.createConnection(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let gfs;
  await conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });
  return gfs
}

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDb,
  InitImageUpload
};