(function (angular) {
    "use strict";
    angular.module('app')
        .controller('CrudProductCtrl', ['$scope', 'Category', 'TaxClass', 'IzAdminConfigService', 'currentProductData', '$state', 'AnotherData', 'Product', 'toastr',
            function ($scope, Category, TaxClass, IzAdminConfigService, currentProductData, $state, AnotherData, Product, toastr) {
                $scope.Category = Category;
                $scope.TaxClass = TaxClass;
                $scope.AnotherData = AnotherData;

                $scope.config = {
                    flowConfig: {
                        target: IzAdminConfigService.getConfig('image_product_upload_url', 'admin')
                    },
                    datePicker: {
                        autoApply: true,
                        singleDatePicker: true,
                        showDropdowns: true,
                        locale: {
                            format: 'MM/DD/YYYY',
                            cancelLabel: 'Xóa'
                        },
                        autoUpdateInput: false
                    }
                };

                if (currentProductData !== false) {
                    $scope.product = currentProductData;
                }
                else
                    $scope.product = {};

                $scope.uploadFileSuccess = function ($file, $message, $flow) {
                    var data = (JSON.parse($message));
                    Product.saveProductImage({
                        image_path: data.pathFile,
                        product_id: $scope.product.entity_id
                    }).then(function (res) {
                        $scope.product.image_gallery = res.data.image_gallery;
                        toastr.info('Luu anh thanh cong');
                    })
                };

                $scope.saveProduct = function () {
                    Product.saveProductToServer($scope.product).then(function (res) {
                        toastr.success('Luu thanh cong');
                    });
                }
            }]);
})(angular);