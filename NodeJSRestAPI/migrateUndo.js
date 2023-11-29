const { DBMigration } = require('./src/middlewares');
const mongoose = require('./src/config/mongoose');

// open mongoose connection and migrate
mongoose.connect().then(() => {
  DBMigration.DBMigrationDown();
  process.exit();
});
