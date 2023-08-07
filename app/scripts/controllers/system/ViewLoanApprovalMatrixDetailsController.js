(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewLoanApprovalMatrixDetailsController: function (scope, resourceFactory, location ,WizardHandler, translate, routeParams) {
             scope.matrixDetails = [];

            console.log(" Here in details API . Out. . - = = "});

            resourceFactory.getAllApprovalMatrixDetailsEngineResource.get({approvalMatrixId: routeParams.id}, function (data) {
            console.log(" Here in details API . . . ");
                            scope.matrixDetails = data;
                        });

        }
    });
    mifosX.ng.application.controller('ViewLoanApprovalMatrixDetailsController', ['$scope', 'ResourceFactory', '$location','WizardHandler', '$translate','$routeParams', mifosX.controllers.ViewLoanApprovalMatrixDetailsController]).run(function ($log) {
        $log.info("ViewLoanApprovalMatrixDetailsController initialized");
    });
}(mifosX.controllers || {}));
