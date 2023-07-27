(function (module) {
    mifosX.controllers = _.extend(module, {
        EditClientCollateralController: function (scope, resourceFactory, routeParams, location) {

            scope.formData = {};
            scope.clientId = routeParams.id;
            scope.collateralId = routeParams.collateralId;
            scope.collateralDataRequestBody = {};
            scope.additionalCollateralDetailsEnabled = false;
            scope.additionalDetailsAddOrRemove = false;
            scope.additionalDetails = {};

            resourceFactory.clientcollateralResource.get({clientId: scope.clientId, collateralParamId: scope.collateralId}, function (data) {
                scope.collaterals = data;
                scope.additionalCollateralDetailsEnabled = data.additionalDetailsEnabled;
                scope.existingAdditionalDetails = data.additionalDetails;
                scope.formData = {
                    name: data.name,
                    quantity: data.quantity,
                    total: data.total,
                    totalCollateral: data.totalCollateral
                }
                if(scope.existingAdditionalDetails && scope.additionalCollateralDetailsEnabled){
                    scope.additionalDetailsAddOrRemove = true;
                    scope.additionalDetails = {
                        upiNo: scope.existingAdditionalDetails.upiNo,
                        chassisNo: scope.existingAdditionalDetails.chassisNo,
                        collateralOwnerFirst: scope.existingAdditionalDetails.collateralOwnerFirst,
                        idNoOfCollateralOwnerFirst: scope.existingAdditionalDetails.idNoOfCollateralOwnerFirst,
                        collateralOwnerSecond: scope.existingAdditionalDetails.collateralOwnerSecond,
                        idNoOfCollateralOwnerSecond: scope.existingAdditionalDetails.idNoOfCollateralOwnerSecond,
                        worthOfCollateral: scope.existingAdditionalDetails.worthOfCollateral,
                        provinceId: scope.existingAdditionalDetails.province.id,
                        districtId: scope.existingAdditionalDetails.district.id,
                        sectorId: scope.existingAdditionalDetails.sector.id
                        cellId: scope.existingAdditionalDetails.cell.id,
                        villageId: scope.existingAdditionalDetails.village.id
                    }
                }
            });
            scope.createAdditionalDetails = function () {
             if(scope.additionalDetailsAddOrRemove && scope.additionalCollateralDetailsEnabled){
                this.formData.upiNo = scope.additionalDetails.upiNo;
                this.formData.chassisNo = scope.additionalDetails.chassisNo;
                this.formData.collateralOwnerFirst = scope.additionalDetails.collateralOwnerFirst;
                this.formData.idNoOfCollateralOwnerFirst = scope.additionalDetails.idNoOfCollateralOwnerFirst;
                this.formData.collateralOwnerSecond = scope.additionalDetails.collateralOwnerSecond;
                this.formData.idNoOfCollateralOwnerSecond = scope.additionalDetails.idNoOfCollateralOwnerSecond;
                this.formData.worthOfCollateral = scope.additionalDetails.worthOfCollateral;
                this.formData.provinceId = scope.additionalDetails.provinceId;
                this.formData.districtId = scope.additionalDetails.districtId;
                this.formData.sectorId = scope.additionalDetails.sectorId;
                this.formData.villageId = scope.additionalDetails.villageId;
                this.formData.cellId = scope.additionalDetails.cellId;
             }
            }
            resourceFactory.configurationResourceByName.get({name:'Enable-Client-Collateral-Addition_Details'},function (data) {
                scope.additionalCollateralDetailsEnabled = data.enabled;
            });

            scope.cancel = function () {
                location.path('/viewclient/' + scope.clientId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                scope.collateralDataRequestBody.collateralId = scope.collateralId;
                scope.collateralDataRequestBody.quantity = this.formData.quantity;
                scope.collateralDataRequestBody.locale = this.formData.locale;
                if(!angular.equals(scope.existingAdditionalDetails, scope.additionalDetails)){
                    createAdditionalDetails();
                }
                resourceFactory.clientcollateralResource.update({clientId: scope.clientId, collateralParamId: scope.collateralId}, scope.collateralDataRequestBody, function (data) {
                    location.path('/viewclient/' + scope.clientId + '/viewclientcollateral/' + data.resourceId);
                });
            };

        }
    });
    mifosX.ng.application.controller('EditClientCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.EditClientCollateralController]).run(function ($log) {
        $log.info("EditClientCollateralController initialized");
    });
}(mifosX.controllers || {}));
