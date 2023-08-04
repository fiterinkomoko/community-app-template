(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewLoanApprovalMatrixController: function (scope, resourceFactory, location ,WizardHandler, translate, routeParams) {
             scope.matrixDetails = [];

            resourceFactory.getAllApprovalMatrixEngineResource.getAll({}, function (data) {
                            scope.matrixDetails = data;
                            console.log("Matrices   data::>"+data);
                            console.log("Matrices ::>"+scope.matrixDetails);
                        });

        }
    });
    mifosX.ng.application.controller('ViewLoanApprovalMatrixController', ['$scope', 'ResourceFactory', '$location','WizardHandler', '$translate','$routeParams', mifosX.controllers.ViewLoanApprovalMatrixController]).run(function ($log) {
        $log.info("ViewLoanApprovalMatrixController initialized");
    });
}(mifosX.controllers || {}));
