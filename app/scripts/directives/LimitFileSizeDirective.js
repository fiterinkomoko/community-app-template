(function (module) {
    mifosX.directives = _.extend(module, {
        LimitFileSizeDirective: function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attr, ctrl) {
                    if (attr.type === 'radio' || attr.type === 'checkbox' || attr.type ==='input') return;
                    elm.bind('change', function () {
                        scope.$apply(function () {
                            var fileSize = elm[0].files[0].size;
                            var sizeInMb = fileSize / 1024 / 1024;
                            var maxSize = 1;
                            if(attr.limitFileSize !== "") {
                                maxSize = parseInt(attr.limitFileSize);
                            } else {
                                attr.limitFileSize = 1;
                            }

                            if (sizeInMb > maxSize) {
                                ctrl.$setValidity('fileSize', false);
                            } else {
                                ctrl.$setValidity('fileSize', true);
                            }
                        });
                    });
                }
            };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("limitFileSize", [mifosX.directives.LimitFileSizeDirective]).run(function ($log) {
    $log.info("LimitFileSizeDirective initialized");
});