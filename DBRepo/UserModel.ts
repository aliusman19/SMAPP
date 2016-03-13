import mongoose = require('mongoose');
import q = require('q');
import bcrypt = require('bcrypt-nodejs')

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    FirstName:String,
    LastName:String,
    Email:{type:String,unique:true,required:true},
    Password:String,
    CreatedOn:{type:Date,default:Date.now()},  
    AdminId:String,
    CompanyId:String,
    UserId:{type:[]},
    FirebaseToken:String
})

let companySchema = new Schema({
    CompanyName:{type:String,require:true},
    CompanyAddress:String,
    UserId:String,
    AdminId:String,    
    CompanyCreatedOn:{type:Date,default:Date.now()},  
})

let SalesmenSchema = new Schema({
    name:String,
    email:{type:String,require:true},
    salesmanCreatedOn:{type:Date,default:Date.now()},
    password:String,
    location:String,
})
let OrderSchema = new Schema({
    name:String,
    quntity:Number,
    AdminId:String,
    SalesmanId:String,
    OrderOn:{type:Date,defoul:Date.now()}
    
})

let companyModel=mongoose.model('companies',companySchema);

let SALT_FACTOR;
let noop = function() {};

UserSchema.pre("save", function(done) {
  let user = this;

  if (!user.isModified("Password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.Password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.Password = hashedPassword;
      done();
    });
  });
});


let UserModel = mongoose.model('users',UserSchema);
var user;
function saveUser(userProps){
    let deffered = q.defer();
    user = new UserModel(userProps);
    
    user.save((err,data)=>{
        if(err){
            console.log('Error in saving User');
            console.log(err);
            deffered.reject('Error occured while savin user')
        }else{
            console.log('User saved successfully')
            deffered.resolve(data)
        }
    });
    return deffered.promise;
}

function saveCompany(compProps){
    let deffered = q.defer();
    let company = new companyModel(compProps);
   //company.AdminId=company._id;
    company.save((err,data)=>{
        company.save(function (err, data) {     
    });
        if(err){
            console.log('Error in saving Company');
            console.log(err);
            deffered.reject('Error occured while savin Company')
        }else{
            
            console.log(data)
            // UserModel.update({_id:data._id},{$set:{CompanyId:data._id}},function(e,d){
            //     //console.log(e,d)
            // })
            console.log('Company saved successfully')
            deffered.resolve(data)
        }
    });
    return deffered.promise;
}

function findUser(query){
    let deffered = q.defer();
    UserModel
    .findOne(query,function(err,record){
        if(err){
            console.log('Error in finding User');
            console.log(err);
            deffered.reject("Error in finding User through deffered");
        }
        else{
            deffered.resolve(record);
        }
    });
    return deffered.promise;
}
function findCompany(query){
    let deffered = q.defer();
    companyModel
    .findOne(query,function(err,record){
        if(err){
            console.log('Error in finding User');
            console.log(err);
            deffered.reject("Error in finding User through deffered");
        }
        else{
            deffered.resolve(record);
        }
    });
    return deffered.promise;
}



let Salesmen =mongoose.model('Salesmen',SalesmenSchema)

function saveSalesmen(salesmenProps){
    let deffered = q.defer();
    let user = new Salesmen(salesmenProps);
    
    user.save((err,data)=>{
        if(err){
            console.log('Error in saving User');
            console.log(err);
            deffered.reject('Error occured while savin user')
        }else{
            console.log('User saved successfully')
            deffered.resolve(data)
        }
    });
    return deffered.promise;
}
let order = mongoose.model('Order',OrderSchema)
function saveOrder(orderProps){
    let deffered = q.defer();
    let user = new order(orderProps);
    user.save((err,data)=>{
        if(err){
            console.log('Error in saveing User')
            console.log(err);
            deffered.reject('Error occured in saving user')
        }else{
            console.log('Order saved Successfully')
            deffered.resolve(data)
        }
    })
}

export {saveUser,findUser,saveCompany,saveSalesmen,findCompany}

exports.userModel=UserModel;
exports.userSchema = UserSchema;