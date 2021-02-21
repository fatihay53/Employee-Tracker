const inquirer = require("inquirer");

const db = require( './app/connection' )('favorites_db','password123')

// const app = express();
// module to connect to database
const db = require('./app/connection')('playlist_db', 'password123')
/*
1. id    
  2. title
  3. artist
  4. genre
  5. rating
CREATE TABLE songs (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  artist VARCHAR(200),
  genre VARCHAR(200),
  rating INTEGER
)
*/
async function main() {
    // get new song info
    const newSong = await inquirer.prompt([
        { name: "title", message: "What is the title of the song?" },
        { name: "artist", message: "What is the artist?" },
        { name: "genre", message: "What is the genre?" },
        { name: "rating", message: "What is the rating (1-10)?" },
    ]);
    // insert this prompted song
    let result
    // create an entry
    result = await db.query("INSERT INTO songs VALUES(?,?,?,?,?)",
        [0, newSong.title, newSong.artist, newSong.genre, newSong.rating])

    result = await db.query('SELECT * FROM songs ')
  
    // console.log(`-- SELECT * result: --\n`, result, "\n\n")

    result = await db.query( "INSERT INTO songs VALUES(0,'Enter Sandman','Metallica','Rock',7)")

    result = await db.query( "INSERT INTO songs VALUES(0,'Enter Sandman','Metallica','Rock',7)")
    // ... ?
    let data 
    var data = await db.query('SELECT * FROM songs');
    var data = await db.query("SELECT * FROM songs where artist = 'Michael Jackson'");

    // console.log(data)
   
    console.log(`SELECT * songs`, data)
    console.log(`-- SELECT * data: --\n`, data, "\n\n")
    await db.close()
}
main();