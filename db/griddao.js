const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postrgresql://elpoeta:elpoeta@localhost:5432/test_grilla_db',
});

class DB{
    static async view(){
        //(async () => {
         try{
          const  {rows}  = await pool.query('SELECT * FROM doctor WHERE id = $1', [1])
          console.log('view() user:', rows[0]);
          return rows[0];
         } 
          catch(e ){
            setImmediate(() => { throw e });
          }
          }
        //)().catch(e => setImmediate(() => { throw e }))
      //}
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