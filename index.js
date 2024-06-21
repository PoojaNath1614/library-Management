import express from 'express';
import { getAllBooks, getBook, getAllBooksByAuthor, addBook, deleteBook, updateBook} from './util/util.js';
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/getAll',async(req,res)=>{
    const all=await getAllBooks();
    res.json(all);
});
app.get('/search/:name',async(req,res)=>{
    const qr = req.params.name;
    const book=await getBook(qr);
    res.json(book);
});
app.get('/getAuthorBooks/:author',async(req,res)=>{
    const qr=req.params.author;
    const list=await getAllBooksByAuthor(qr);
    res.json(list);
});
app.post('/create',async(req,res)=>{
    const data=req.body;
    console.log(data);
    const result= await addBook(data);
    if(result===true){
        res.json({
            msg:"Book addeed"
        });
    }else{
        res.json({
            msg:"Book not added"
        });
    }
});

app.delete('/delete/:book',async(req,res)=>{
    const data=req.params.book;
    
    const result=await deleteBook(data);
    if(result?.affectedRows===1){
        res.json({
            msg:"Book deleted"
        })
    }
    if(result?.affectedRows===0){
        res.json({
            msg:"Book does not exist"
        })
    }
    res.json({
        msg:"Connection refused by database"
    });
});

app.patch('/update',async(req,res)=>{
    const dataToUpdate=req.body;
    const result=await updateBook(dataToUpdate);
    if(result?.affectedRows===1){
        res.json({
            msg:"Updation completed"
        });
    }else if(result?.affectedRows===0){
        res.json({
            msg:"No book with the id exist in the library"
        });
    }else{
        res.json({
            msg:"Connection refused by database"
        });
    }
});
app.listen(3000);