const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
LIMIT $2;
`, [process.argv[2], process.argv[3]])
  .then(res=>{
    res.rows.forEach(user => console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`));
  })
  .catch(err=>console.error('query error', err.stack));