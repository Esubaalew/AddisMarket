import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('cart.db');

// Create the cart table
const createCartTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, image TEXT, quantity INTEGER)',
            [],
            (_, error) => {
                if (error) {
                    console.log('Error creating table:', error);
                } else {
                    console.log('Table created successfully.');
                }
            }
        );
    });
};

// Call the createCartTable function to create the table
// createCartTable();

export default db;
