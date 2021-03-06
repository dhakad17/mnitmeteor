const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../Models")
const expressjwt = require("express-jwt")
const Redis = require("redis");
const redis = Redis.createClient();
require('dotenv').config()
redis.connect();
const timeConvert = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    let ss;
    if(h){
        if(h==23){
            return "24 hours.";
        }
        return (h==1)?"an hour ":(h+ " hours.");
    }
    if(m){
        return (m + "minutes.");
    }
    if(s){
        return (s + " seconds." );
    }
    return hDisplay + mDisplay + sDisplay;
}
const admin_verification = async (req, res, next) => {
    var admin_emails = process.env.ADMINS;
    const admin_email_list = admin_emails.split(' ');
    const authHeader = req.headers.authorization;
    const unicode = req.body.unicode;
    console.log("unicode is " + unicode);
    //unicode 
    var check = authHeader.split(' ')[1];
    console.log(typeof (check));
    if (check == "undefined") check = 0;
    if (check) {
        const token = authHeader?.split(' ')[1];
        console.log(token);
        const hs = await redis.get(token);
        console.log(hs);
        if (hs == -1) {
            var time_remaining = await redis.ttl(token);
            time_remaining = timeConvert(time_remaining);
            const obj = {
                message: `Hey, due to excessive attempts, you can not access it for ${time_remaining} `,
                code: 88
            }
            const to_send = JSON.stringify(obj);
            return res.status(200).send(obj);
        }
        //if key(token) == -1, you already have tried so much, try again after ttl(token) hours 
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                console.log("error");
                const to_send = {
                    code: 403,
                    message: 'Authorization failed'
                }
                return res.status(200).send();
            }
            req.user = user;
            console.log(req.user)
            const admin = await User.findById(req.user._id);
            console.log(admin.email);
            console.log("Unicode given in env " + process.env.UNICODE);
            console.log("Entered " + unicode);
            bcrypt.compare(unicode, process.env.UNICODE, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    console.log("Unicode is correct, now checking admin or not");
                    if (admin_email_list.includes(admin.email)) {
                        console.log("unicode verified and admin verified");
                        const obj = {
                            message: "Hey Admin!",
                            token: token,
                            code: 77
                        }
                        const to_send = JSON.stringify(obj);
                        res.status(200).send(to_send);
                    }
                    else {
                        {
                            console.log("unicode verified but admin is does not have the access");
                            const obj = {
                                message: "Not an admin. Admins have been reported for misuse of key",
                                code: 88
                            }
                            res.status(200).send(JSON.stringify(obj));
                        }
                    }
                } else {
                    console.log("Unicode is wrong ");

                    const redisHandler = async (token, res) => {
                        const hits = await redis.incr(token);
                        if (hits > 2) {
                            await redis.set(token, -1);
                            const blockingTime = 60*24*60;
                            var time_block = timeConvert(blockingTime);

                            await redis.expire(token, blockingTime); //40 seconds 
                            const obj = {
                                message: `You are blocked for ${time_block}.`,
                                code: 88
                            }
                            const to_send = JSON.stringify(obj);
                            return res.status(200).send(to_send);
                        }
                        const obj = {
                            message: ` You are remaining with ${3 - hits} attempts`,
                            code: 88
                        }
                        const to_send = JSON.stringify(obj);
                        res.status(200).send(to_send);
                    }
                    redisHandler(token, res);

                }

            });


        });
    } else {
        //authenticated hi nhi hai, baat khatam
        const to_send = {
            code: 403,
            message: 'Authorization failed',
        }
        res.status(200).send(to_send);
    }
};



module.exports = { admin_verification };