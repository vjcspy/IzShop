/**
 * Created by vjcspy on 13/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .controller('CrudProductCtrl', ['$scope', 'Category', 'TaxClass', 'IzAdminConfigService', 'currentProductData',
            function ($scope, Category, TaxClass, IzAdminConfigService, currentProductData) {
                $scope.Category = Category;
                $scope.TaxClass = TaxClass;

                $scope.config = {
                    flowConfig: {
                        target: IzAdminConfigService.getConfig('image_product_upload_url', 'admin')
                    }
                };

                if (currentProductData !== false) {
                    //edit product
                    $scope.product = currentProductData[0];
                }
                else
                    $scope.product = {};
            }]);
})(angular);