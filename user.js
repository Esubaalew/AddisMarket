// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('user.db');

// const createUserTable = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, displayName TEXT, email TEXT)'
//         );
//     });
// };

// const insertUser = (displayName, email) => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'INSERT INTO Users (displayName, email) VALUES (?, ?)',
//             [displayName, email],
//             (_, { rowsAffected }) => {
//                 if (rowsAffected > 0) {
//                     console.log('User information stored successfully');
//                 } else {
//                     console.log('Failed to store user information');
//                 }
//             },
//             (_, error) => {
//                 console.log('Error storing user information', error);
//             }
//         );
//     });
// };

// export { createUserTable, insertUser, db };
