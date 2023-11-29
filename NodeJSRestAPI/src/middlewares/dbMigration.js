const fs = require('fs');
const path = require('path');

module.exports = {
  DBMigrationUp: async () => {
    try {
      let rootdir = path.resolve('./');
      let migratedFiles = [];

      try {
        const data = fs.readFileSync(rootdir + '/migratedFiles.json', 'utf8');
        migratedFiles = JSON.parse(data);
      } catch (err) {}

      const migrationFiles = fs.readdirSync(rootdir + '/src/migrations');
      const pendingMigrationFiles = migrationFiles.filter((x) => !migratedFiles.includes(x));

      for (let file of pendingMigrationFiles) {
        console.log('Migrating >>> ', file);
        const migrate = require(rootdir + '/src/migrations/' + file);
        const migrationStatus = await migrate.up();
        console.log('migrationStatus>>', migrationStatus);
        if (!migrationStatus) {
          throw new Error('Migration failed.');
        }
        migratedFiles.push(file);
      }

      // Write latest migration status
      fs.writeFileSync(rootdir + '/migratedFiles.json', JSON.stringify(migratedFiles));

      console.log('Migration completed.');
    } catch (err) {
      console.log(err);
    }
  },
  DBMigrationDown: async (req, res, next) => {}
};
