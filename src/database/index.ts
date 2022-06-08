import pg from 'pg'   //criando uma classe Pool

const conString = "postgres://zfmxwhom:JiTVtesIa-0ccD4jkh5FjBmtYbeK4Oyy@kesavan.db.elephantsql.com/zfmxwhom" //essa é sua conexão com a nuvem
const db = new pg.Client(conString);
db.connect()
export default db