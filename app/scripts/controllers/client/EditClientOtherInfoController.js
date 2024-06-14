(function (module) {
    mifosX.controllers = _.extend(module, {
        EditClientOtherInfoController: function (scope, resourceFactory, routeParams, location) {

            scope.formData = {};
            scope.clientId = routeParams.clientId;
            scope.otherInfoId = routeParams.otherInfoId;
            scope.otherInfoData = {};
            scope.yearArrivedRequired = true;

            resourceFactory.clientOtherInfoTemplateResource.get({clientId:routeParams.clientId}, function(data){
                scope.strataOptions = data.strataOptions;
                scope.nationalityOptions = data.nationalityOptions;
                scope.yearArrivedInHostCountryOptions = data.yearArrivedInHostCountryOptions;
            });

            resourceFactory.otherInfoResource.get({clientId:routeParams.clientId, otherInfoId: routeParams.otherInfoId}, function(data){
                scope.otherInfoData = data;
                scope.formData = {
                      strataId: data.strata.id,
                      nationalityId: data.nationality.id,
                      yearArrivedInHostCountryId: data.yearArrivedInHostCountry.id,
                      numberOfDependents: data.numberOfDependents,
                      numberOfChildren: data.numberOfChildren,
                      nationalIdentificationNumber: data.nationalIdentificationNumber,
                      passportNumber: data.passportNumber,
                      bankAccountNumber: data.bankAccountNumber,
                      bankName: data.bankName,
                      telephoneNo: parseInt(data.telephoneNumber)
                }
            });

            scope.cancel = function () {
                location.path('/clientOtherInfo/' + scope.clientId);
            };

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

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;

                resourceFactory.otherInfoResource.put({clientId: scope.clientId, otherInfoId: routeParams.otherInfoId}, this.formData, function (data) {
                    location.path('/clientOtherInfo/' + scope.clientId);
                });
            };

        }
    });
    mifosX.ng.application.controller('EditClientOtherInfoController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.EditClientOtherInfoController]).run(function ($log) {
        $log.info("EditClientOtherInfoController initialized");
    });
}(mifosX.controllers || {}));
