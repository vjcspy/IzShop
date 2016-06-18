(function (angular) {
    "use strict";
    angular.module('app')
        .service('Product', ['$q', 'IzAdminConfigService', '$http', function ($q, IzAdminConfigService, $http) {
            this.getProductDataById = function (productId) {
                var defer = $q.defer();
                var url = IzAdminConfigService.getConfig('product_by_id_url', 'admin') + '?product_id=' + productId;
                $http.get(url).then(function (res) {
                    return defer.resolve(res.data);
                });

                return defer.promise;
            };

            this.saveProductToServer = function (productData) {
                var url = IzAdminConfigService.getConfig('product_save_url', 'admin');

                return $http.post(url, productData);
            }
        }]);
})(angular);