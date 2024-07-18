const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())

todoList = []


app.get('/',(req,res)=>{
    res.sendFile(
        __dirname,'public','index.html'
    )
})
app.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'CreateTodo.html'));
});

app.get('/viewData/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewTodo.html'));
});
app.post('/getData',(req,res)=>{
    const {id}  = req.body
    console.log(id)
    
    res.status(200).send({ok:'ok'})
})

app.get('/viewData/:id',(req,res)=>{
    const id = req.params.id;
    const todo = todoList.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
})
app.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const todoIndex = todoList.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoList[todoIndex] = { ...todoList[todoIndex], title, description };
    res.json(todoList[todoIndex]);
});


app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todoList.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoList.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
});


app.listen(3001)