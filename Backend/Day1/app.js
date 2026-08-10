const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Akshat",
        age: "21"
    },

    {
        id: 2,
        name: "Rahul",
        age: "22"
    },

    {
        id: 3,
        name: "Ankit",
        age: 25
    }
];

app.get('/users', (req, res) => {
    return res.status(200).json({
        message: "Users List",
        users
    })
});


app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    return res.status(200).json({
        message: "User Found",
        user
    })
})


app.post('/users', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            message: "Name and Age is required"
        })
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name,
        age: age
    };

    users.push(newUser);

    return res.status(201).json({
        message: "New user added successfully"
    })
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
        message: "User deleted successfully"
    })
});


app.patch('/users/:id' , (req,res) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;

    let user = users.find(u => u.id === id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    if(updates.name){
        user.name = updates.name;
    }
    if(updates.age){
        user.age = updates.age;
    }

    return res.status(200).json({
        message: "User updated successfully",
        user
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
