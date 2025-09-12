const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../../data/blog.db');

const schemaPath = path.resolve(__dirname, '../../data/schema.sql');

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {

    if(err){
        console.log("Erro ao aplicar o schema: " , err.cause, err.message);
    } else {
        console.log("Schema aplicado!");
    }

    db.close();

});