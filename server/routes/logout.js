const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             Logout
//=================================

router.get('/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                logoutSuccess: true
            })
        })
})

module.exports = router;