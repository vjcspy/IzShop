(function (angular) {
    "use strict";
    angular.module('app')
        .directive('categoryTree', function () {
            return {
                restrict: "EAC",
                scope: {
                    categories: '=',
                    canEdit: '@'
                },
                templateUrl: "modules/themes/admin.default/assets/views/shop/directives/ui-tree.html",
                controller: ['$scope', function ($scope) {
                    $scope.cateData = {};
                    $scope.cateData.canEdit = $scope.canEdit == 'true';
                    $scope.cateData.collapsed = true;
                    $scope.remove = function (scope) {
                        scope.remove();
                    };

                    $scope.toggle = function (scope) {
                        scope.toggle();
                    };

                    $scope.moveLastToTheBeginning = function () {
                        var a = $scope.data.pop();
                        $scope.data.splice(0, 0, a);
                    };

                    $scope.newSubItem = function (scope) {
                        var nodeData = scope.$modelValue;
                        nodeData.nodes.push({
                            id: nodeData.id * 10 + nodeData.nodes.length,
                            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                            nodes: []
                        });
                    };

                    $scope.collapseAll = function () {
                        $scope.$broadcast('angular-ui-tree:collapse-all');
                    };

                    $scope.expandAll = function () {
                        $scope.$broadcast('angular-ui-tree:expand-all');
                    };

                    $scope.collapseAll();

                }]
            };
        });
})(angular);