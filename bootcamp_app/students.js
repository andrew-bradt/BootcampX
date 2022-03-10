const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT students.id, students.name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1
  LIMIT $2;`;
const cohort = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`${cohort}`, limit];

pool.query(queryString, values)
  .then(res=>{
    res.rows.forEach(row => console.log(`${row.name} has an id of ${row.id} and was in the ${row.cohort} cohort`));
  })
  .catch(err=>console.error('query error', err.stack));