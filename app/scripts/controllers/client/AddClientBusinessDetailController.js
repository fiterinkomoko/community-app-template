(function (module) {
    mifosX.controllers = _.extend(module, {
        AddClientBusinessDetailController: function (scope, $rootScope, resourceFactory, location, dateFilter,WizardHandler, translate,routeParams) {
            scope.restrictDate = new Date();
            scope.formData = {};
            scope.showOrHideValue = "show";
            scope.date = {};
            scope.clientId = routeParams.clientId;

            resourceFactory.clientBusinessDetailTemplate.get({clientId:scope.clientId},function (data) {
                scope.clientbusinessDetails = data;
                scope.businessTypeOptions = data.businessType;
                scope.sourceOfCapitalOptions = data.sourceOfCapital;
                scope.bestMonthOptions = data.bestMonth;
                scope.worstMonthOptions = data.worstMonth;

                if (data.clientAccount) {
                    scope.clientName = data.clientAccount.displayName;
                }

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
                location.path('/addbusinessdetail/'+scope.clientId);
            };


            scope.submit = function () {
                var reqFirstDate = dateFilter(scope.date.first, scope.df);
                var reqSecondDate = dateFilter(scope.date.second, scope.df);
                resourceFactory.clientBusinessDetailResource.save({clientId:scope.clientId},this.formData, function (data) {
                    location.path('/viewClientBusinessDetails/' + data.resourceId);
                });
            };


        }
    });
    mifosX.ng.application.controller('AddClientBusinessDetailController', ['$scope','$rootScope', 'ResourceFactory', '$location', 'dateFilter','WizardHandler', '$translate','$routeParams', mifosX.controllers.AddClientBusinessDetailController]).run(function ($log) {
        $log.info("AddClientBusinessDetailController initialized");
    });
}(mifosX.controllers || {}));
