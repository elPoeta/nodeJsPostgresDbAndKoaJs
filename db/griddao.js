/*const { Pool } = require('pg')
const pool = new Pool({
 // connectionString: 'postrgresql://elpoeta:elpoeta@localhost:5432/test_grilla_db'
 connectionString: 'postgres://fqkthzmubrcgma:dfdbf6d316ccd1fd46100944d2c0823f78aae9a82c433370504aab27ca7ef2fb@ec2-184-72-221-2.compute-1.amazonaws.com:5432/d7cudr86q88m25',
 //SSL: true,
});

const { Client } = require('pg')
const DATABASE_URL = 'postgres://fqkthzmubrcgma:dfdbf6d316ccd1fd46100944d2c0823f78aae9a82c433370504aab27ca7ef2fb@ec2-184-72-221-2.compute-1.amazonaws.com:5432/d7cudr86q88m25';
const { DATABASE_URL } = process.env;
const client = new Client({
  connectionString: DATABASE_URL,
});
/*
const client = new Client({
  host: 'ec2-184-72-221-2.compute-1.amazonaws.com',
  port: 5432,
  user: 'fqkthzmubrcgma',
  password: 'dfdbf6d316ccd1fd46100944d2c0823f78aae9a82c433370504aab27ca7ef2fb',
});
*/
let pg = require('pg');

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL || 'postrgresql://elpoeta:elpoeta@localhost:5432/test_grilla_db';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString,
});
class DB{
    static async view(id){
     
      
         try{

          const  {rows}  = await pool.query('SELECT * FROM doctor WHERE id = $1', [id]);
          console.log('view() user:', rows[0]);
          return rows[0];
         } 
          catch(e ){
            setImmediate(() => { throw e });
          }
          }

      static async viewAll(){
        try{

          const { rows } = await pool.query('SELECT * FROM doctor ');
          //console.log('view() user:', rows);
          return rows;
          }
          catch(e){
            setImmediate(() => { throw e });
          }
      }
      static async end(){
        try{

          pool.end();
          }catch( e ){
            setImmediate(() => {throw e});
      }
    
}
}
module.exports = DB;