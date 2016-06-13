/**
 * Created by vjcspy on 13/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .service('ProductEav', ['$q', '$http', 'IzAdminConfigService', '_',
            function ($q, $http, IzAdminConfigService, _) {
                var productAttrSet = false;
                this.getProductAttrSetFromServer = function () {
                    var defer = $q.defer();
                    $http.get(IzAdminConfigService.getConfig('product_attr_set_url', 'admin')).then(function (res) {
                        productAttrSet = defer.resolve(res.data);
                        return defer.resolve(productAttrSet);
                    });
                    return defer.promise;
                };
                this.getProductAttrSet = function () {
                    return productAttrSet;
                };

                this.getAttrSetOptionsArray = function (_productAttrSet) {
                    productAttrSet = _productAttrSet || productAttrSet;
                    var optionsArray = [];
                    _.forEach(productAttrSet, function (val) {
                        optionsArray.push(
                            {
                                label: val['attribute_set_name'],
                                value: val['attribute_set_id'],
                                id: val['attribute_set_id'],
                                name: val['attribute_set_name']
                            }
                        );
                    });
                    return optionsArray;
                }
            }]);
})(angular);