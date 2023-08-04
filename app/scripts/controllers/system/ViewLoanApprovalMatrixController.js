(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewLoanApprovalMatrixController: function (scope, resourceFactory, location ,WizardHandler, translate, routeParams) {
            scope.formData = {};
            scope.showOrHideValue = "show";
             scope.matrixDetails = {};

            resourceFactory.getApprovalMatrixEngineTemplateResource.get({}, function (data) {
                            scope.matrixDetails = data;
                            scope.formData.currency = scope.matrixDetails.currencyOptions[0].code;
                        });


             scope.$watch('formData',function(newVal){
                scope.matrixDetails = angular.extend(scope.matrixDetails,newVal);
             },true);

             scope.formValue = function(array,model,findattr,retAttr){
                 findattr = findattr ? findattr : 'id';
                 retAttr = retAttr ? retAttr : 'value';
                 console.log(findattr,retAttr,model);
                 return _.find(array, function (obj) {
                    return obj[findattr] === model;
                 })[retAttr];
            };


        }
    });
    mifosX.ng.application.controller('ViewLoanApprovalMatrixController', ['$scope', 'ResourceFactory', '$location','WizardHandler', '$translate','$routeParams', mifosX.controllers.ViewLoanApprovalMatrixController]).run(function ($log) {
        $log.info("ViewLoanApprovalMatrixController initialized");
    });
}(mifosX.controllers || {}));
