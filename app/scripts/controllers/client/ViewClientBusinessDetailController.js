(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewClientBusinessDetailController: function (scope, resourceFactory, location, dateFilter,translate,routeParams) {
            scope.formData = {};
            scope.showOrHideValue = "show";
            scope.first = {};
            scope.first.businessCreationDate = new Date();
            scope.clientId = routeParams.clientId;
            scope.businessDetailId = routeParams.businessDetailId;
             scope.businessDetails = {};


            resourceFactory.clientBusinessDetailTemplate.get({clientId:scope.clientId},function (data) {
                scope.clientbusinessDetails = data;
                scope.businessTypeOptions = data.businessType;
                scope.sourceOfCapitalOptions = data.sourceOfCapital;
                scope.bestMonthOptions = data.bestMonth;
                scope.worstMonthOptions = data.worstMonth;
                scope.whenLastPurchaseOptions = data.worstMonth;

                if (data.clientAccount) {
                    scope.clientName = data.clientAccount.displayName;
                }
                if (scope.first.businessCreationDate) {
                    this.formData.businessCreationDate = dateFilter(scope.first.businessCreationDate, scope.df);
                }
                scope.businessDetails = angular.copy(scope.formData);
            });

            resourceFactory.clientBusinessDetailResource.get({clientId:scope.clientId,businessDetailId:scope.businessDetailId},function (data) {
                scope.details = data;
            });

            scope.deletebusinessDetail = function () {
                resourceFactory.clientBusinessDetailResource.delete({clientId:scope.clientId,businessDetailId:scope.businessDetailId},function (data) {
                location.path('/viewclient/'+scope.clientId);
            });

            };

        }
    });
    mifosX.ng.application.controller('ViewClientBusinessDetailController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', '$translate','$routeParams', mifosX.controllers.ViewClientBusinessDetailController]).run(function ($log) {
        $log.info("ViewClientBusinessDetailController initialized");
    });
}(mifosX.controllers || {}));
