const express = require('express');
const router = express.Router();
const STATUS = require('http-status-codes');
const bcrypt = require('bcryptjs');
const { User } = require('./../models');

router.get('/', async (req, res) => { // List
    const users = await User.findAll({attributes: ['id', 'first_name', 'last_name', 'email', 'points', 'level']});
    res.status(STATUS.OK).json({msg: 'Got all users', data: users});
});


router.post('/', async (req, res) => { // Create
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err){
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong while encrypting the password'});
        }

        user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            points: 0,
            level: 1,
            email: req.body.email,
            password: hash
        }

        const created = User.create(user).then(() => {
            user.password = "That's a secret :p";
            res.status(STATUS.OK).json({msg: 'User created successfully', user});
        })
        .catch((err) => {
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({msg: 'User could not be created'});
        })
    });
});


router.get('/:id', async (req, res) => { // Search
    const user = await User.findOne({ where: {id: req.params.id}, attributes: ['id', 'first_name', 'last_name', 'email', 'points', 'level']});
    
    if (user)
    {
        res.status(STATUS.OK).json({msg: 'Found user', user});
    } 
    else 
    {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({msg: 'User not found'});
    }
});


router.patch('/:id', async (req, res) => { // Edit
    const oldUser = await User.findOne({ where: {id: req.params.id}});

    const newUser = {
        first_name: req.body.first_name || oldUser.first_name,
        last_name: req.body.last_name || oldUser.last_name,
        points: req.body.points || oldUser.points,
        level: req.body.level || oldUser.level
    }

    const updated = await oldUser.update(newUser);
    if (updated) 
    {
        res.status(STATUS.OK).json({msg: 'User updated!', updated});
    } 
    else 
    {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({msg: 'Could not update the user'})
    }
});


router.delete('/:id', async (req, res) => { // Delete
    const deleted = await User.destroy({where: {id: req.params.id}});

    if (deleted) 
    {
        res.status(STATUS.OK).json({msg: "Deleted user"});
    } 
    else 
    {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({msg: 'Could not delete the user'});
    }
});


module.exports = router;