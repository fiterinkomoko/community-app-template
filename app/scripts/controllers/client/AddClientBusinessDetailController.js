(function (module) {
    mifosX.controllers = _.extend(module, {
        AddClientBusinessDetailController: function (scope, $rootScope, resourceFactory, location, dateFilter,WizardHandler, translate,routeParams) {
            scope.restrictDate = new Date();
            scope.formData = {};
            scope.showOrHideValue = "show";
            scope.date = {};
            clientId = routeParams.clientId;

            resourceFactory.clientBusinessDetailTemplate.get({resourceType: 'template'}, function (data) {
                scope.clientbusinessDetails = data;
                console.log(scope.clientbusiness);
                scope.businessDetails = angular.copy(scope.formData);
                scope.isClicked = false;

            });

             scope.$watch('formData',function(newVal){
                scope.businessDetails = angular.extend(scope.businessDetails,newVal);
             },true);

             $rootScope.formValue = function(array,model,findattr,retAttr){
                 findattr = findattr ? findattr : 'id';
                 retAttr = retAttr ? retAttr : 'value';
                 console.log(findattr,retAttr,model);
                 return _.find(array, function (obj) {
                    return obj[findattr] === model;
                 })[retAttr];
            };

            scope.goNext = function(form){
                WizardHandler.wizard().checkValid(form);
                scope.isClicked = true;
            }

            scope.cancel = function () {
                location.path('/addbusinessdetail/'+clientId);
            };


            scope.submit = function () {
                var reqFirstDate = dateFilter(scope.date.first, scope.df);
                var reqSecondDate = dateFilter(scope.date.second, scope.df);
                resourceFactory.clientBusinessDetailResource.save({clientId:clientId},this.formData, function (data) {
                    location.path('/viewClientBusinessDetails/' + data.resourceId);
                });
            };


        }
    });
    mifosX.ng.application.controller('AddClientBusinessDetailController', ['$scope','$rootScope', 'ResourceFactory', '$location', 'dateFilter','WizardHandler', '$translate','$routeParams', mifosX.controllers.AddClientBusinessDetailController]).run(function ($log) {
        $log.info("AddClientBusinessDetailController initialized");
    });
}(mifosX.controllers || {}));
