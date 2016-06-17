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
            this.getCountryOfManufactureFromSv = function () {
                var defer = $q.defer();
                $http.get(IzAdminConfigService.getConfig('magento_country_of_manufacture', 'admin')).then(function (res) {
                    countryOfManufacture = res.data;
                    return defer.resolve(res.data);
                });
                return defer.promise;
            };
            this.getCountryOfManufacture = function () {
                return countryOfManufacture;
            }
        }]);
})(angular);