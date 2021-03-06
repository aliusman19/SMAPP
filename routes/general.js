var express = require('express');
var Firebase = require('firebase');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../DBRepo/UserModel');
var ref = new Firebase('https://salesmem.firebaseio.com//users');
var UserModel_1 = require("../DBRepo/UserModel");
var router = express.Router();
router.post('/signup', function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            UserModel_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post('/signin', function (req, res) {
    var user = req.body.data;
    UserModel_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (bcrypt.compareSync(user.password, userInstance.Password)) {
            res.send({ message: 'Loged in successfully', token: userInstance.FirebaseToken, user: userInstance });
            console.log(userInstance);
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.get('/:FirebaseToken', function (req, res) {
    var tokenParams = req.params.FirebaseToken;
    UserModel_1.findUser({ FirebaseToken: tokenParams })
        .then(function (userInstance) {
        console.log(userInstance);
        if (userInstance) {
            res.send({ user: userInstance });
            return;
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.post('/company', function (req, res) {
    UserModel_1.saveCompany(req.body.data)
        .then(function (comInstance) {
        console.log(comInstance);
        res.send({ status: true, data: comInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.get('/companyDetail/:AdminId', function (req, res) {
    var AdminId = req.params.AdminId;
    console.log(AdminId);
    UserModel_1.findCompany({ AdminId: AdminId })
        .then(function (companyInstance) {
        if (companyInstance) {
            console.log('company');
            console.log(companyInstance);
            res.send({ company: companyInstance });
            return;
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.post('/salesmen', function (req, res) {
    // console.log(req.body)
    UserModel_1.saveSalesmen(req.body.data)
        .then(function (comInstance) {
        res.send({ status: true, data: comInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.get('/sminfo/:AdminId', function (req, res) {
    var AdminId = req.params.AdminId;
    console.log(AdminId);
    UserModel_1.findCompany({ AdminId: AdminId })
        .then(function (sminfoInstance) {
        if (sminfoInstance) {
            console.log('sminfo');
            console.log(sminfoInstance);
            res.send({ company: sminfoInstance });
            return;
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.post('/order', function (req, res) {
    // console.log(req.body)
    saveOrder(req.body.data)
        .then(function (comInstance) {
        res.send({ status: true, data: comInstance });
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
module.exports = router;
