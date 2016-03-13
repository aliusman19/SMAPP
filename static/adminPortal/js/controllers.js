
angular.module('starter')
.controller('signinController',function($scope,$http,$state,$rootScope){
    $scope.user={};
     
    $scope.login=function(user){
        $scope.user.AdminId=user._id;
        $http.post('/api/signin',{data:user})
        .success(function(response){
            localStorage.setItem('AdminId',response.user._id) 

            console.log(response.user._id) ;         
            if(response.token){
                localStorage.setItem('token',response.token);

                $rootScope.currentUser=response.user;
                // console.log($rootScope.currentUser)              
                $state.go('regCompany')
            }else{
                alert("'please Enter Correct Email and Password")
                $scope.user="";
            }
        })
        .error(function(err){
            console.log(err)
        })
    }
})

.controller('signupController',function($scope,$http,$state,$rootScope){
    $scope.user={};
    
    $scope.signupUser=function(user){
    $scope.user.AdminId=user._id;
     
    $http.post('/api/signup',{data:user})
    
    .success(function(response){ 
              
          $rootScope.currentUser=response.user;

        $state.go('signin');
    })
    .error(function(err){
        console.log(err)
    });    
    };
    
})
.controller('signoutController',function($scope,$http,$state){
    $scope.signout=function(){
        localStorage.removeItem('token')
        $state.go('signin');
    }
})

.controller('homeController',function($scope,$http,$rootScope,$state,salesService){
            
         salesService.getUserInfo().then(function(userInfo){
            $scope.userInfo=userInfo;
               
          })
          
          //-------------------------------------------
            $scope.logout=function(){
                 localStorage.removeItem('token')
                 localStorage.removeItem('AdminId')
                    $state.go('signin');
                        
            }
            
})
    
.controller('regcompanyController',function($scope,$http,$state,$rootScope,salesService){
    
     $scope.company={};
    $scope.saveCompany=function(company){
       $scope.company.AdminId=localStorage.getItem('AdminId')
    $http.post('/api/company',{data:company})
    .success(function(response){

        $rootScope.currentCompany=response.data;

        $state.go('home');
    })
    .error(function(err){
        console.log(err)
    });    
    };
})

.controller('viewCompany',function($scope,$http,$rootScope,salesService){
     salesService.getCompanyInfo().then(function(companyInfo){
         $scope.companyInfo=companyInfo;
     })
    
})

.controller('salesmenController',function($scope,$http,$state,$rootScope){
    $scope.salesmen={};
    $scope.saveSalesmen=function(salesmen){
        $scope.saveSalesmen.AdminId=localStorage.getItem('AdminId');
    $http.post('/api/salesmen',{data:salesmen})
    .success(function(response){
        console.log(response)
        $rootScope.salesmen=response.data;
        $state.go('home');
    })
    .error(function(err){
        console.log(err)
    });    

    };
})
.controller('sminfoController',function($scope,$http,$state,salesService){
       salesService.getSmInfo().then(function(sminfo){
           $scope.sminfo = sminfo;
       })
    
})
.controller('orderController',function($scope,$http,$state,$rootScope){
    $scope.order={};
    $scope.saveOrder=function(order){
        $scope.saveSalesmen.AdminId=localStorage.getItem('AdminId');
    $http.post('/api/salesmen',{data:order})
    .success(function(response){
        console.log(response)
        $rootScope.order=response.data;
       
    })
    .error(function(err){
        console.log(err)
    });    

    };
})
