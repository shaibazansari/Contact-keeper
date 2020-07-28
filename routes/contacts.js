const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contacts');

// @route       GET api/contacts
// @desc        Get all user contacts
// @access      Private

router.get('/',auth, async(req,res)=>{

    try {
        const contacts = await Contact.find({ user: req.user.id}).sort({ date : -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    res.send('Get all contacts');
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private

router.post('/',[auth, [
    check('name','Please add name').not().isEmpty()
]],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }
    const {name, email, phone, type} = req.body;

    try {
        const newContact = await Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

// @route       PUT api/contacts/:id
// @desc        update contact
// @access      Private

router.put('/:id',auth, async (req,res)=>{

    const {name, email, phone, type} = req.body;

    // Build contacts object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg : 'Contact not found'});

        // Make sure user owns Contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg : "Not Authorized"});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields},
            {new : true});
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private

router.delete('/:id',auth, async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg : 'Contact not found'});

        // Make sure user owns Contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg : "Not Authorized"});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg : 'contacts removed'});
    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

module.exports = router;