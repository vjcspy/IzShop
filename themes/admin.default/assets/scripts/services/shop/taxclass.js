/**
 * Created by vjcspy on 15/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .service('TaxClass', ['$q', '$http', 'IzAdminConfigService', '_',
            function ($q, $http, IzAdminConfigService, _) {
                var taxClass = false;
                this.getTaxClassFromServer = function () {
                    var defer = $q.defer();
                    $http.get(IzAdminConfigService.getConfig('tax_class_url', 'admin')).then(function (res) {
                        taxClass = res.data;
                        return defer.resolve(defer);
                    });

                    return defer.promise;
                };

                this.getCustomerTaxClass = function () {
                    return _.filter(taxClass, function (obj) {
                        return obj['class_type'] == 'CUSTOMER';
                    });
                };
                this.getProductTaxClass = function () {
                    return _.filter(taxClass, function (obj) {
                        return obj['class_type'] == 'PRODUCT';
                    })
                }
            }]);
})(angular);