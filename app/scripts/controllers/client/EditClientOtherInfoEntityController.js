(function (module) {
    mifosX.controllers = _.extend(module, {
        EditClientOtherInfoEntityController: function (scope, resourceFactory, routeParams, location) {

            scope.formData = {};
            scope.clientId = routeParams.clientId;
            scope.otherInfoId = routeParams.otherInfoId;
            scope.otherInfoData = {};

            resourceFactory.clientOtherInfoTemplateResource.get({clientId:routeParams.clientId}, function(data){
                scope.strataOptions = data.strataOptions;
            });

            resourceFactory.otherInfoEntityResource.get({clientId:routeParams.clientId, otherInfoId: routeParams.otherInfoId}, function(data){
                scope.otherInfoData = data;
                scope.formData = {
                      strataId: data.strata.id,
                      businessLocation: data.businessLocation,
                      taxIdentificationNumber: data.taxIdentificationNumber,
                      coSignorsName: data.coSignors == "" ? undefined: data.coSignors,
                      guarantor: data.guarantor == "" ? undefined: data.guarantor,
                      incomeGeneratingActivity: data.incomeGeneratingActivity == 0 ? undefined: data.incomeGeneratingActivity,
                      incomeGeneratingActivityMonthlyAmount: data.incomeGeneratingActivityMonthlyAmount,
                      telephoneNo: data.telephoneNumber,
                      bankAccountNumber: data.bankAccountNumber,
                      bankName: data.bankName,   
                }
            });

            scope.cancel = function () {
                location.path('/clientOtherInfo/' + scope.clientId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;

                resourceFactory.otherInfoResource.put({clientId: scope.clientId, otherInfoId: routeParams.otherInfoId}, this.formData, function (data) {
                    location.path('/clientOtherInfoEntity/' + scope.clientId);
                });
            };

        }
    });
    mifosX.ng.application.controller('EditClientOtherInfoEntityController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.EditClientOtherInfoEntityController]).run(function ($log) {
        $log.info("EditClientOtherInfoEntityController initialized");
    });
}(mifosX.controllers || {}));
