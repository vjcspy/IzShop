(function (angular) {
    "use strict";
    angular.module('app')
        .controller('CrudProductCtrl', ['$scope', 'Category', 'TaxClass', 'IzAdminConfigService', 'currentProductData', '$state', 'AnotherData',
            function ($scope, Category, TaxClass, IzAdminConfigService, currentProductData, $state, AnotherData) {
                $scope.Category = Category;
                $scope.TaxClass = TaxClass;
                $scope.AnotherData = AnotherData;

                $scope.config = {
                    flowConfig: {
                        target: IzAdminConfigService.getConfig('image_product_upload_url', 'admin')
                    }
                };

                if (currentProductData !== false) {
                    //edit product
                    $scope.product = currentProductData[0];
                    console.log($scope.product);
                }
                else
                    $scope.product = {};
            }]);
})(angular);