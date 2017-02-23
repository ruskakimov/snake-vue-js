import Firebase from 'firebase'

const firebaseConfig = {
        apiKey: "AIzaSyCYJyU1XclnBo9XeXJ-vw9dY2cF-4bFlk4",
        authDomain: "snake-scoreboard.firebaseapp.com",
        databaseURL: "https://snake-scoreboard.firebaseio.com",
        storageBucket: "snake-scoreboard.appspot.com",
        messagingSenderId: "639031374175"
}
Firebase.initializeApp(firebaseConfig)
const db = Firebase.database()
const scoreboard = db.ref('scoreboard')

export default db
export { scoreboard }
