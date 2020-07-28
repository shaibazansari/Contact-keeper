const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult} = require('express-validator/check')
// npm run server for nodemon to start
const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public

router.post('/',[
    check('name','Please add name').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','please enter password of more than 6 characters').isLength({ min : 6})
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }
    // console.log(res.body)
    const { name, email, password} = req.body;
    // console.log(name,email,password)

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'user already exists' })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jsonSecret'), {
            expiresIn : 7200
        }, (err, token)=> {
            if (err) throw err;
            res.json({token});
        })
        // res.send('user saved')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
    
    // res.send('passed');
});

module.exports = router;