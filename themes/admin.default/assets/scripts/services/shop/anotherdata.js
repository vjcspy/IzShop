/*
 * Nhung data thuoc kieu nay la chi lay ve 1 lan va su dung, khong phai update.
 * Bao gom:
 * - Du lieu country
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .service('AnotherData', ['$q', '$http', 'IzAdminConfigService', '$timeout', function ($q, $http, IzAdminConfigService, $timeout) {
            var countryOfManufacture = false;
            this.getCountryOfManufacture = function () {
                var defer = $q.defer();

                if (countryOfManufacture == false) {
                    $http.get(IzAdminConfigService.getConfig('magento_country_of_manufacture', 'admin')).then(function (res) {
                        return defer.resolve(res.data);
                    });
                } else {
                    $timeout(function () {
                        return defer.resolve(countryOfManufacture);
                    }, 500);
                }
                return defer.promise;
            }
        }]);
})(angular);