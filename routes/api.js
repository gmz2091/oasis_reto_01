import express from 'express';
import { db } from '../db/dbConection.js';
import { User }from '../models/Users/users.models.js';
const routesUsrs = express.Router();


routesUsrs.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        throw new Error(error);
        
    }
    
});

routesUsrs.post('/users', async (req, res) => {
    const user = req.body;
    if (!user.firstName || !user.email || !user.lastName) {
        return res.status(400).send({ error: true, message: 'Please provide user' });
    }

    const alreadyExist = await User.findOne({ email: user.email });

    if (alreadyExist) {
        return res.status(400).send({ error: true, message: 'User already exist' });
    }

    try {
        const newUser = await User.create(user);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        throw new Error(error);
        }
    }
);

routesUsrs.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = User.findById(id);

    if (!user) {
        return res.status(400).send({ error: true, message: 'User not found' });
    }

    try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
        message: 'User deleted successfully'
    });
    } catch (error) {
        throw new Error(error);
        }
    });


export default routesUsrs;