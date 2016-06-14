/**
 * Created by vjcspy on 14/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .service('Category', ['$q', '$http', 'IzAdminConfigService', function ($q, $http, IzAdminConfigService) {
            var categoryNodes = false;
            this.getCategoryNodesFromServer = function () {
                var defer = $q.defer();
                $http.get(IzAdminConfigService.getConfig('category_nodes_url', 'admin')).then(function (res) {
                    categoryNodes = res.data;
                    return defer.resolve(categoryNodes);
                });
                return defer.promise;
            };

            this.getCategoryNodes = function () {
                return categoryNodes;
            }
        }]);
})(angular);