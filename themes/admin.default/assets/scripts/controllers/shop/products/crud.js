/**
 * Created by vjcspy on 13/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .controller('CrudProductCtrl', ['$scope', 'Category', function ($scope, Category) {
            $scope.Category = Category;
        }]);
})(angular);