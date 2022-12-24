const router = require("express").Router()
const User = require("../Models/User_Model")
const jwt = require("jsonwebtoken")
const JWT_AUTH = require("../Middlewares/JWT_Auth")
const bcrypt = require("bcrypt")

router.post("/isLoggedIn", JWT_AUTH, async (req, res) => {
    try {
        const user = await User.findOne({ _id: res.user.id })
        // //console.log(user);
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.post("/signup", async (req, res) => {

    try {

        const checkExistingByEmail = await User.find({ email: req.body.email })
        const checkExistingByPhone = await User.find({ phone: req.body.phone })

        if (checkExistingByEmail.length) {
            return res.status(400).json(`User With this ${req.body.email} email already exists`)
        }
        if (checkExistingByPhone.length) {
            return res.status(400).json(`User With this ${req.body.phone} phone number already exists`)
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword

        const newUser = await User(req.body)
        await newUser.save()

        newUser.password = null;

        res.json(newUser)
    } catch (error) {
        //console.log(error);
    }
})

router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body

        //console.log(req.body);
        const getUserbyMail = await User.find({ email: email })
        const getUserbyPhone = await User.find({ phone: email })

        const user = getUserbyMail.length ? getUserbyMail[0] : getUserbyPhone[0]

        if (getUserbyMail.length || getUserbyPhone.length) {
            const hashedPassword = getUserbyMail.length ? getUserbyMail[0].password : getUserbyPhone[0].password
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
            //console.log(isPasswordCorrect);
            if (isPasswordCorrect) {
                const user_id = getUserbyMail.length ? getUserbyMail[0]._id : getUserbyPhone[0]._id
                const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET)
                res.status(200).json({ user, token })
                //console.log("here");
            } else {
                res.status(400).json(`Invalid Password`)
            }
        } else {
            res.status(400).json(`No user found`)
        }

    } catch (error) {
        res.status(500).json("Server Error")
        //console.log(error);
    }
})



module.exports = router;
