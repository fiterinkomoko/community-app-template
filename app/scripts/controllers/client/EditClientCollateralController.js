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

            resourceFactory.clientAdditionalCollateralTemplateResource.get({clientId: scope.clientId}, function (data) {
                 scope.provinceOptions = data.provinces;
                 scope.districtOptions = data.districts;
                 scope.sectorOptions = data.sectors;
                 scope.villageOptions = data.villages;
                 scope.cellOptions = data.cells;
            });
            resourceFactory.clientcollateralResource.get({clientId: scope.clientId, collateralParamId: scope.collateralId}, function (data) {
                scope.collaterals = data;
                console.log(data);
                scope.additionalCollateralDetailsEnabled = data.additionalDetailsEnabled;
                scope.existingAdditionalDetails = data.additionalDetails;
                scope.formData = {
                    name: data.name,
                    quantity: data.quantity,
                    total: data.total,
                    totalCollateral: data.totalCollateral,
                    provinceId: data.additionalDetails.province !=null ? data.additionalDetails.province.id: null,
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
                        districtId: scope.existingAdditionalDetails.district !=null ? scope.existingAdditionalDetails.district.id: null,
                        sectorId: scope.existingAdditionalDetails.sector !=null ? scope.existingAdditionalDetails.sector.id: null,
                        cellId: scope.existingAdditionalDetails.cell != null? scope.existingAdditionalDetails.cell.id : null,
                        villageId: scope.existingAdditionalDetails.village != null ? scope.existingAdditionalDetails.village.id : null
                    }
                    console.log(scope.additionalDetails);
                }
            });
            scope.createAdditionalDetails = function () {
             if(scope.additionalDetailsAddOrRemove && scope.additionalCollateralDetailsEnabled){
                scope.collateralDataRequestBody.upiNo = scope.additionalDetails.upiNo;
                scope.collateralDataRequestBody.chassisNo = scope.additionalDetails.chassisNo;
                scope.collateralDataRequestBody.collateralOwnerFirst = scope.additionalDetails.collateralOwnerFirst;
                scope.collateralDataRequestBody.idNoOfCollateralOwnerFirst = scope.additionalDetails.idNoOfCollateralOwnerFirst;
                scope.collateralDataRequestBody.collateralOwnerSecond = scope.additionalDetails.collateralOwnerSecond;
                scope.collateralDataRequestBody.idNoOfCollateralOwnerSecond = scope.additionalDetails.idNoOfCollateralOwnerSecond;
                scope.collateralDataRequestBody.worthOfCollateral = scope.additionalDetails.worthOfCollateral;
                scope.collateralDataRequestBody.provinceId = scope.additionalDetails.provinceId;
                scope.collateralDataRequestBody.districtId = scope.additionalDetails.districtId;
                scope.collateralDataRequestBody.sectorId = scope.additionalDetails.sectorId;
                scope.collateralDataRequestBody.villageId = scope.additionalDetails.villageId;
                scope.collateralDataRequestBody.cellId = scope.additionalDetails.cellId;
             }
            }

            scope.addAdditionalDetails = function () {
               scope.additionalDetailsAddOrRemove =  scope.additionalDetailsAddOrRemove == true ? false : true;
               scope.additionalDetails = {};
            }

            scope.cancel = function () {
                location.path('/viewclient/' + scope.clientId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                scope.collateralDataRequestBody.collateralId = scope.collateralId;
                scope.collateralDataRequestBody.quantity = this.formData.quantity;
                scope.collateralDataRequestBody.locale = this.formData.locale;
                console.log(angular.equals(scope.existingAdditionalDetails, scope.additionalDetails));
                if(scope.additionalDetails){
                    scope.createAdditionalDetails();
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
