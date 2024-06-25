(function (module) {
    mifosX.controllers = _.extend(module, {
        ClientOtherInfoController: function (scope, resourceFactory, routeParams,dateFilter, location, route) {

            scope.first = {};
            scope.first.date = new Date();
             scope.first.submitondate = new Date ();
            scope.formData = {};
            scope.clientId = routeParams.clientId;
            scope.otherInfoData = {};
            scope.exists= false;
            scope.yearArrivedRequired = true;

            resourceFactory.clientOtherInfoTemplateResource.get({clientId:routeParams.clientId}, function(data){
                scope.strataOptions = data.strataOptions;
                scope.nationalityOptions = data.nationalityOptions;
            });

            resourceFactory.clientOtherInfoResource.getAll({clientId:routeParams.clientId}, function(data){
                scope.otherInfoData = data[0];
                if(scope.otherInfoData){
                 scope.exists = true;
                }

            });

            scope.cancel = function () {
                location.path('/viewclient/' + scope.clientId);
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

                if (scope.first.submitondate) {
                    reqDate = dateFilter(scope.first.submitondate, scope.df);
                    this.formData.yearArrivedInHostCountry = reqDate;
                 }

                resourceFactory.clientOtherInfoResource.save({clientId: scope.clientId}, this.formData, function (data) {
                    route.reload();
                });
            };

        }
    });
    mifosX.ng.application.controller('ClientOtherInfoController', ['$scope', 'ResourceFactory', '$routeParams','dateFilter', '$location', '$route', mifosX.controllers.ClientOtherInfoController]).run(function ($log) {
        $log.info("ClientOtherInfoController initialized");
    });
}(mifosX.controllers || {}));
