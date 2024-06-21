import mysql from 'mysql2/promise';
let connection;
try{
    connection=await mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'library'
    });
}catch(e){
    console.log(e);
}

export async function getAllBooks(){
    try{
        const [results]=await connection.query(
        `SELECT * FROM books`
        );
        return results;
    }catch(e){
        console.log(e);
    }
}
export async function getBook(data){
    try{
        const [results]=await connection.query(
        `SELECT * FROM books WHERE title=?`,
        [data]
        );
        return results;
    }catch(e){
        console.log(e);
    }
}
export async function getAllBooksByAuthor(data){
    try{
        const [results]=await connection.query(
        `SELECT * FROM books WHERE author=?`,
        [data]
        );
        return results;
    }catch(e){
        console.log(e);
    }
}
export async function addBook(data){
    try{
        const [results]=await connection.query(
            `INSERT INTO books(title,author,description,price_rupees,publicationDate,id) VALUES(?,?,?,?,?,?)`,
            [data.title,data.author,data.description,data.price,data.publicationDate,data.id]
        );
        return true;
    }catch(e){
        console.log(e);
    }
}
export async function deleteBook(data){
    try{
        const [results]= await connection.query(
        
        `DELETE FROM books WHERE title=?`,
        [data]
        );
        console.log(results);
        return results;
        
    }catch(e){
        console.log(e);
    }
}
export async function updateBook(dataToUpdate){
    try{
        const [results]=await connection.query(
            `UPDATE books SET ${dataToUpdate.parameterToChange}=? WHERE id=?`,
            [ dataToUpdate.newChange, dataToUpdate.id]
        );
        console.log(results);
        return results;
    }catch(e){
        console.log(e);
    }
}