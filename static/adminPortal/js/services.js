angular.module("starter")
    .service("salesService", function ($http, $state, $q, $location) {
        var userInfo = {};
        var companyInfo={};
        var sminfo = {};
        var orinfo = {};

        this.getUserInfo = function () {
            var deferred = $q.defer();
            
           var firebaseToken=localStorage.getItem('token')
        $http.get('/api/'+ firebaseToken).then(
                function (success) {
                    userInfo = success.data;
                    
                    
                    deferred.resolve(userInfo);
                    
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        }
        
    //******************************************//    
        this.getCompanyInfo = function () {
           var deferred = $q.defer();
            
           var AdminId=localStorage.getItem('AdminId')
           
        $http.get('/api/companyDetail:'+AdminId).then(

                function (success) {
                    companyInfo = success.data;                   
                    // companyInfo.adminId = userInfo.AdminId;
                    deferred.resolve(companyInfo);
                    
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        }

         
    //  *************************************** //
    
    // Salesman information //
    
    this.getSmInfo = function () {
           var deferred = $q.defer();
            
           var AdminId=localStorage.getItem('AdminId')
           
        $http.get('/api/sminfo:'+AdminId).then(

                function (success) {
                    sminfo = success.data;                   
                    // companyInfo.adminId = userInfo.AdminId;
                    deferred.resolve(sminfo);
                    
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        }
         
    
    //+++++++++++++++++++++++++++++++++++++++++//
    //Order information//
    
     this.getSmInfo = function () {
           var deferred = $q.defer();
            
           var AdminId=localStorage.getItem('AdminId')
           
        $http.get('/api/orinfo:'+AdminId).then(

                function (success) {
                    orinfo = success.data;                   
                    // companyInfo.adminId = userInfo.AdminId;
                    deferred.resolve(orinfo);
                    
                },
                function (err) {
                    deferred.resolve(err);
                });
            return deferred.promise;
        }
         
     });