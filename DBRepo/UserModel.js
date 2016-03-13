var mongoose = require('mongoose');
var q = require('q');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    AdminId: String,
    CompanyId: String,
    UserId: { type: [] },
    FirebaseToken: String
});
var companySchema = new Schema({
    CompanyName: { type: String, require: true },
    CompanyAddress: String,
    UserId: String,
    AdminId: String,
    CompanyCreatedOn: { type: Date, default: Date.now() },
});
var SalesmenSchema = new Schema({
    name: String,
    email: { type: String, require: true },
    salesmanCreatedOn: { type: Date, default: Date.now() },
    password: String,
    location: String,
});
var OrderSchema = new Schema({
    name: String,
    quntity: Number,
    AdminId: String,
    SalesmanId: String,
    OrderOn: { type: Date, defoul: Date.now() }
});
var companyModel = mongoose.model('companies', companySchema);
var SALT_FACTOR;
var noop = function () { };
UserSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("Password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.Password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.Password = hashedPassword;
            done();
        });
    });
});
var UserModel = mongoose.model('users', UserSchema);
var user;
function saveUser(userProps) {
    var deffered = q.defer();
    user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log('Error in saving User');
            console.log(err);
            deffered.reject('Error occured while savin user');
        }
        else {
            console.log('User saved successfully');
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}
exports.saveUser = saveUser;
function saveCompany(compProps) {
    var deffered = q.defer();
    var company = new companyModel(compProps);
    //company.AdminId=company._id;
    company.save(function (err, data) {
        company.save(function (err, data) {
        });
        if (err) {
            console.log('Error in saving Company');
            console.log(err);
            deffered.reject('Error occured while savin Company');
        }
        else {
            console.log(data);
            // UserModel.update({_id:data._id},{$set:{CompanyId:data._id}},function(e,d){
            //     //console.log(e,d)
            // })
            console.log('Company saved successfully');
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}
exports.saveCompany = saveCompany;
function findUser(query) {
    var deffered = q.defer();
    UserModel
        .findOne(query, function (err, record) {
        if (err) {
            console.log('Error in finding User');
            console.log(err);
            deffered.reject("Error in finding User through deffered");
        }
        else {
            deffered.resolve(record);
        }
    });
    return deffered.promise;
}
exports.findUser = findUser;
function findCompany(query) {
    var deffered = q.defer();
    companyModel
        .findOne(query, function (err, record) {
        if (err) {
            console.log('Error in finding User');
            console.log(err);
            deffered.reject("Error in finding User through deffered");
        }
        else {
            deffered.resolve(record);
        }
    });
    return deffered.promise;
}
exports.findCompany = findCompany;
var Salesmen = mongoose.model('Salesmen', SalesmenSchema);
function saveSalesmen(salesmenProps) {
    var deffered = q.defer();
    var user = new Salesmen(salesmenProps);
    user.save(function (err, data) {
        if (err) {
            console.log('Error in saving User');
            console.log(err);
            deffered.reject('Error occured while savin user');
        }
        else {
            console.log('User saved successfully');
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}
exports.saveSalesmen = saveSalesmen;
var order = mongoose.model('Order', OrderSchema);
function saveOrder(orderProps) {
    var deffered = q.defer();
    var user = new order(orderProps);
    user.save(function (err, data) {
        if (err) {
            console.log('Error in saveing User');
            console.log(err);
            deffered.reject('Error occured in saving user');
        }
        else {
            console.log('Order saved Successfully');
            deffered.resolve(data);
        }
    });
}
exports.userModel = UserModel;
exports.userSchema = UserSchema;
