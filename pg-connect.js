import pg from 'pg'
const { Client } = pg;

export const pgClient = new Client({
  user: 'postgres',
  password: 'P@$$w0rd#!',
  host: 'localhost',
  port: '5432',
  database: 'intronodejs'
});

pgClient.connect().then(() => {
  console.log('Connected to postgress DB successfully.')
}).catch((err) => {
  console.log('Failed to connect to postgres DB', err)
})