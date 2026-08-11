const express = require('express');
const app = express();

app.use(express.json());

// Application Level Middlware - 
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

// Auth Guard Middleware
const authGaurd = (req,res,next) => {
    const apiKey = req.headers['x-api-key'];

    if(apiKey == 'secret123'){
        next();
    }else{
        return res.status(401).json({
            message: "Unauthorized! Invalid or missing API Key"
        })
    }
};

// Validation Middleware.

const validateUser = (req,res,next) => {
    const {name, age , domain} = req.body;
    
    if(!name || !age || !domain){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    
    next();
}


const users = [
    {
        id: 1,
        name: "Anant",
        age: "21",
        domain: "AI/ML"
    },
    {
        id: 2,
        name: "Akash",
        age: 22,
        domain: "Web Development"
    }
];

app.get('/test-error', (req, res, next) => {
    const err = new Error("Database connection failed!");
    err.status = 500;
    next(err);
});


app.get('/users', (req,res) => {
    return res.status(200).json({
        message: "List Of Employees",
        users
    })
});


app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        });
    }
    return res.status(200).json({
        message: "User Found Successfully",
        user
    })
});


app.post('/users', authGaurd , validateUser , (req,res) => {
    const {name, age, domain} = req.body;

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name,
        age: age,
        domain: domain
    }

    users.push(newUser);

    return res.status(201).json({
        message: "User Created Successfully",
        newUser
    });
});


app.patch('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const {name, age, domain} = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if(userIndex === -1){
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    if(name){
        users[userIndex].name = name;
    }

    if(age){
        users[userIndex].age = age;
    }

    if(domain){
        users[userIndex].domain = domain;
    }

    return res.status(200).json({
        message: "User Updated Successfully",
        users
    })
});

app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if(userIndex === -1){
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
        message: "User Deleted Successfully",
        users
    })
});

// Global Error Middleware
app.use((err,req,res,next) => {
    console.error(err.message);

    return res.status(500).json({
        message: "Internal Server Error"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
