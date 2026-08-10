const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Akshat"
    },
    {
        id: 2,
        name: "Rahul"
    }
];

app.get('/users', (req,res) => {
    res.status(200).json({
        message: "Users List",
        users
    });
})

app.post('/users', (req,res) => {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({
            message: "Name is required"
        })
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id  + 1 : 1,
        name: name
    }

    users.push(newUser);

    return res.status(201).json({
        message: "New User Created Successfully"
    })
})

app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({
            message: "User not found"
        })
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
        message: "User Deleted Successfully"
    })
})


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});