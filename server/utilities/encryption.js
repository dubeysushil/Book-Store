const CRYPTO = require('crypto');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

module.exports = {
    generateSalt: () => {
        return CRYPTO.randomBytes(128).toString('base64');
    },

    generateHashedPassword: (salt, password) => {
        return CRYPTO.createHmac('sha256', salt).update(password).digest('hex');
    }

    // generatePassword: (password) =>{
    //     bcrypt.genSalt(saltRounds, (err, salt) => {
    //         bcrypt.hash(password, salt, (err, hash) => {
    //             return hash;
    //             // let data = {
    //             //     email: req.body.email,
    //             //     password: hash,
    //             // }
    //             // Sample.collection.insertOne(data, (error, result) => {
    //             //     if (error) {
    //             //         return res.status(500).send(error);
    //             //     }
    //             //     res.send(result.ops);
    //             // });
    //         });
    //     });
    // }
    
};