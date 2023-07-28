(function (module) {
    mifosX.controllers = _.extend(module, {
        ApproveLoanDueDiligenceController: function (scope, resourceFactory, routeParams, location) {

            scope.loandetails = [];
            scope.formData = {};
            scope.loanId = routeParams.id;
            scope.inparams = {resourceType: 'template', activeOnly: 'true'};


            resourceFactory.dueDiligenceLoanDecisionEngineResource.getTemplate({loanId: scope.loanId}, function (data) {
                scope.loandetails = data;
                scope.productId = data.loanProductId;
            });


            scope.cancel = function () {
                location.path('/viewloanaccount/' + scope.loanId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                resourceFactory.dueDiligenceLoanDecisionEngineResource.approveDueDiligence({loanId: scope.loanId}, this.formData, function (data) {
                    location.path('/viewloanaccount/' + data.loanId );
                });
            };

        }
    });
    mifosX.ng.application.controller('ApproveLoanDueDiligenceController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.ApproveLoanDueDiligenceController]).run(function ($log) {
        $log.info("ApproveLoanDueDiligenceController initialized");
    });
}(mifosX.controllers || {}));
