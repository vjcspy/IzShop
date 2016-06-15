/**
 * Created by vjcspy on 13/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .controller('CrudProductCtrl', ['$scope', 'Category', 'IzAdminConfigService', 'currentProductData',
            function ($scope, Category, IzAdminConfigService, currentProductData) {
                $scope.Category = Category;

                $scope.config = {
                    flowConfig: {
                        target: IzAdminConfigService.getConfig('image_product_upload_url', 'admin')
                    }
                };

                if (currentProductData !== false) {
                 //edit product
                }
            }]);
})(angular);