// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(function($urlRouterProvider,$stateProvider,$httpProvider,$ionicConfigProvider){
     
    $stateProvider
    .state('signin',{
        url:'/signin',
        templateUrl:'/adminPortal/templates/signin.html',
        controller:'signinController'
    })
    .state('signup',{
        url:'/signup',
        templateUrl:'/adminPortal/templates/signup.html',
        controller:'signupController'
    })
    .state('home',{
        url:'/',
        templateUrl:'/adminPortal/templates/home.html',
        controller:'homeController',
        
    })
//     .state('home.reg-company',{
//         url:'/reg-company',
//         views:{
//             'homeContent':{
//            templateUrl:'/adminPortal/templates/reg-company.html',
//         }
// }
        
//     })
    .state('regCompany',{
        url:'/company',
        templateUrl:'/adminPortal/templates/reg-company.html',
        controller:'regcompanyController'
    })
    .state('salesmen',{
        url:'/salesmen',
        templateUrl:'/adminPortal/templates/salesmen.html',
        controller:'salesmenController'
    })
     .state('sminfo',{
        url:'/sminfo',
        templateUrl:'/adminPortal/templates/sminfo.html',
        controller:'sminfoController'
    })
    .state('company',{
        url:'companyDetail',
        templateUrl:'adminPortal/templates/company.html',
        controller:'viewCompany'
    })
      .state('order',{
        url:'/order',
        templateUrl:'adminPortal/templates/order.html',
        controller:'orderController'
    })
    
    $urlRouterProvider.otherwise('/signup')
    $httpProvider.interceptors.push('httpInterceptor');
})
.run(function($rootScope,$state){
    $rootScope.$on('$stateChangeStart',function(event,toState){
        var firebaseLocalToken=localStorage.getItem('token');
        if(toState.loginCompulsory && !firebaseLocalToken){
            event.preventDefault();
            $state.go('signin');
        }
    });
})
.factory('httpInterceptor',function(){
    return{
        request:function(config){
            var token = localStorage.getItem('token');
            if(token){
                config.url=config.url+"?token="+token;
            }
        return config;
        }
    }
})