const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

//Gets all members
router.get('/', (req, res) => {
    res.json(members);
})

//Get single member
router.get('/:id', (req,res) => {
    const found  = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg : `No member with id ${req.params.id}`});
    }
    
})

//Create Members
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include all details'});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/')
});

//Update member
router.put('/:id', (req,res) => {
    const found  = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        const updateMember = req.body;
        members.forEach(members => {
            if(members.id === parseInt(req.params.id)){
                members.name = updateMember.name ? updateMember.name : members.name;
                members.email = updateMember.email ? updateMember.email : members.email;
                members.status = updateMember.status ? updateMember.status : members.status;

                res.json({msg : 'Member updated!', members});    
            }
        });
    }
    else{
        res.status(400).json({msg : `No member with id ${req.params.id}`});
    }
    
})

//Delete member

//Get single member
router.delete('/:id', (req,res) => {
    const found  = members.some(members => members.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg: "Member deleted", 
            members: members.filter(members => members.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg : `No member with id ${req.params.id}`});
    }
    
})

module.exports = router;