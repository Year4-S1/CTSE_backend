const User = require("../../models/user-model");
const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");


const registration = async (req, res) => {

    if (req.body) {
        const body = req.body;
        const email = body.email;


        const existingUser = await User.findOne({ email })

        if(existingUser){
            const validatePassword = await bcrypt.compare(body.password, existingUser.password);
            if (validatePassword) {
                res.status(200).json({ message: "Valid password" });
              } else {
                res.status(400).json({ error: "Invalid Password" });
              }
            } else {
              

        const user = new User(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        console.log(user.password);

        await user
            .save()
            .then((data) => {
                res.status(200).send({message:'Registration Successfull'})
            }
            )
            .catch((error) => {
                res.status(500).send({ error: error.message })
            })
    }
}
}


var otp;

const generateOtp = async => {
    otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);
}



const sendOtp= async(email) => {

    let transporter = nodemailer.createTransport({
        service:'Outlook365',
        auth:{
            user:'it19135830@my.sliit.lk',
            pass:'kimmy123'

        }
    });

    var email ={
        to:'mithma.vs@gmail.com',
        subject:"Please enter this OTP for verification",
        html :"<h1>otp</h1>"
    };


    transporter.sendMail(email, function(err,data) {
        if(err) {
            console.log('Error Occurs' , err)
        }
        else {
            console.log("Email sent!")
        }
    })
}




module.exports = {
    registration,
    sendOtp
}