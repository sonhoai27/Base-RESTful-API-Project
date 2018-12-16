import mongoose from 'mongoose';
const server = process.env.MONGODB_URI || 'localhost:27017';
const dbName = 'admin';

export const dbConnect = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(`mongodb://${server}/${dbName}`)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });
};
