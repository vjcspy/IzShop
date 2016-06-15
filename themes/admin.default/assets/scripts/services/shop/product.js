/**
 * Created by vjcspy on 15/06/2016.
 */
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
        }]);
})(angular);