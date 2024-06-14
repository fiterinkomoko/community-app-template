(function (module) {
    mifosX.controllers = _.extend(module, {
        EditClientOtherInfoEntityController: function (scope, resourceFactory, routeParams, location) {

            scope.formData = {};
            scope.clientId = routeParams.clientId;
            scope.otherInfoId = routeParams.otherInfoId;
            scope.otherInfoData = {};
            scope.yearArrivedRequired = true;

            resourceFactory.clientOtherInfoTemplateResource.get({clientId:routeParams.clientId}, function(data){
                scope.strataOptions = data.strataOptions;
                scope.yearArrivedInHostCountryOptions = data.yearArrivedInHostCountryOptions;
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
                      telephoneNo: parseInt(data.telephoneNumber),
                      bankAccountNumber: data.bankAccountNumber,
                      bankName: data.bankName,
                      yearArrivedInHostCountryId: data.yearArrivedInHostCountry.id === 0 ? undefined: data.yearArrivedInHostCountry.id,   
                }
            });

            scope.checkIfHostCommunitySelected = function () {
                if (scope.strataOptions && this.formData.strataId != undefined) {
                    var selectedObj = scope.strataOptions.filter(x => x.id === this.formData.strataId).at(0);
                    scope.yearArrivedRequired = !(selectedObj.name.toUpperCase() === 'HOST COMMUNITY');
                    return scope.yearArrivedRequired;
                } else {
                    scope.yearArrivedRequired = true;
                    return scope.yearArrivedRequired;
                }
            };

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
