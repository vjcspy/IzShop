angular.module('app')
    .controller('ListProductCtrl', ['$scope', 'IzAdminConfigService', 'productAttrSet', '_', 'ProductEav', '$state', '$log', '$compile',
        function ($scope, IzAdminConfigService, productAttrSet, _, ProductEav, $state, $log, $compile) {

            /* ----------------Config Data table---------------- */
            $scope.dataTable = {
                article: null,
                crudId: 'product_crud', // dung de biet duoc thang nao muon them moi, boi vi nhieu thang cung dung directive nay
                tableOptions: {
                    processing: true,
                    serverSide: true,
                    //"scrollX": true,
                    "paging": true,
                    //scrollCollapse: true,
                    responsive: true,
                    ajax: IzAdminConfigService.getConfig('list_product_url', 'admin'),
                    "columns": [
                        {"data": "entity_id"},
                        {"data": "origin_image"},
                        {"data": "name"},
                        {"data": "type_id"},
                        {"data": "attribute_set_id"},
                        {"data": "sku"},
                        {"data": "price"},
                        {"data": "qty"},
                        {"data": "visibility"},
                        {"data": "status"},
                        {"data": "entity_id"}
                    ],
                    "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                        {className: "entity_id", "targets": [0]},
                        {
                            className: "origin_image",
                            targets: [1],
                            render: function (data, type, row) {
                                return '<img src="' + data + '" alt="Smiley face" height="42" width="42">';
                            }
                        },
                        {className: "name", "targets": [2]},
                        {
                            className: "type_id", targets: [3],
                            render: function (data, type, row) {
                                var output;
                                switch (data) {
                                    case 'simple':
                                        output = 'Không tùy chọn';
                                        break;
                                    case 'configurable':
                                        output = 'Tùy chọn';
                                        break;
                                }
                                return output;
                            }
                        },
                        {
                            className: "attribute_set_id",
                            targets: [4],
                            render: function (data, type, row) {
                                return _.find(productAttrSet, function (obj) {
                                    return obj.attribute_set_id == data;
                                })['attribute_set_name'];
                            }
                        },
                        {className: "sku", "targets": [5]},
                        {
                            className: "price",
                            targets: [6],
                            render: function (data, type, row) {
                                return parseFloat(data).toFixed(2);
                            },
                        },
                        {
                            className: "qty",
                            targets: [7],
                            render: function (data, type, row) {
                                return parseInt(data);
                            },
                        },
                        {
                            className: "visibility",
                            targets: [8],
                            render: function (data, type, row) {
                                var output;
                                switch (data) {
                                    case '1':
                                        output = 'Không';
                                        break;
                                    case '2':
                                        output = 'Danh mục';
                                        break;
                                    case '3':
                                        output = 'Tìm kiếm';
                                        break;
                                    case '4':
                                        output = 'Tất cả';
                                        break;
                                }
                                return output;
                            }
                        },
                        {
                            className: "status",
                            targets: [9],
                            render: function (data, type, row) {
                                if (data == 1)
                                    return 'Bật';
                                else
                                    return 'Tắt';
                            }
                        },
                        {
                            className: "action",
                            targets: [10],
                            render: function (data, type, row) {
                                return getButtonEdit();
                            }
                        }
                    ],
                    "language": {
                        "lengthMenu": "Hiển thị&nbsp _MENU_ &nbspbản ghi mỗi trang",
                        "zeroRecords": "Không tìm thấy dữ liệu...",
                        "info": "Đang hiển thị trang _PAGE_ của _PAGES_",
                        "infoEmpty": "Không tìm thấy dữ liệu...",
                        "infoFiltered": "(Lọc từ _MAX_ bản ghi)"
                    }
                },
                filterConfig: [
                    {
                        columnId: "entity_id",
                        name: "Id",
                        show: true,
                        filterType: "text",
                        filterChecked: false
                    },
                    {
                        columnId: "name",
                        name: "Tên",
                        show: true,
                        filterType: "text",
                        filterChecked: false
                    },
                    {
                        columnId: "type_id",
                        name: "Loại",
                        show: true,
                        filterType: "select",
                        dataSelect: [
                            {label: 'Không tùy chọn', value: 'simple', id: 'simple', name: 'Không tùy chọn'},
                            {label: 'Tùy chọn', value: 'configurable', id: 'configurable', name: 'Tùy chọn'}
                        ],
                        filterChecked: false
                    },
                    {
                        columnId: "attribute_set_id",
                        name: "Kiểu",
                        show: true,
                        filterType: "select",
                        dataSelect: ProductEav.getAttrSetOptionsArray(productAttrSet),
                        filterChecked: false
                    },
                    {
                        columnId: "sku",
                        name: "Mã",
                        show: true,
                        filterType: "text",
                        filterChecked: false
                    },
                    {
                        columnId: "price",
                        name: "Giá",
                        show: true,
                        filterType: "text",
                        filterChecked: false
                    },
                    {
                        columnId: "qty",
                        name: "Số lượng",
                        show: true,
                        filterType: "text",
                        filterChecked: false
                    },
                    {
                        columnId: "visibility",
                        name: "Kiểu hiển thị",
                        show: true,
                        filterType: "select",
                        dataSelect: [
                            {label: 'Không', value: '1', id: '1', name: 'Không'},
                            {label: 'Danh mục', value: '2', id: '2', name: 'Danh mục'},
                            {label: 'Tìm kiếm', value: '3', id: '3', name: 'Tìm kiếm'},
                            {label: 'Tất cả', value: '4', id: '4', name: 'Danh mục, Tìm kiếm'}
                        ],
                        filterChecked: false
                    },
                    {
                        columnId: "status",
                        name: "Trạng thái",
                        show: true,
                        filterType: "select",
                        dataSelect: [
                            {label: 'Bật', value: '1', id: '1', name: 'Bật'},
                            {label: 'Tắt', value: '0', id: '0', name: 'Tắt'}
                        ],
                        filterChecked: false
                    }
                ]
            };

            function getButtonEdit() {
                var html = '<div><md-button class="md-icon-button md-primary" aria-label="Settings"><i' +
                    ' class="fa' +
                    ' fa-pencil"' +
                    ' aria-hidden="true"></i></md-button></div>';

                var btElem = angular.element(html);
                return ($compile(btElem)($scope)[0]).innerHTML;
            }

            $scope.configDataTable = {};
            $scope.configDataTable.isSupportNewRecord = true;

            /* ----------------Communicate with view---------------- */
            var listenerCreateProduct = $scope.$on('add_new_record_izdatatable' + $scope.dataTable.crudId, function (data) {
                return $state.go('shop_products.crud', {productId: false}, {reload: true});
            });
            var listenerEditProduct = $scope.$on('click_edit_action' + $scope.dataTable.crudId, function (event, data) {
                return $state.go('shop_products.crud', {productId: data}, {reload: true});
            });
            // check de unregister listener, mot diem hay ho cua angular la khi goi lai listener thi no tu unregister
            $scope.$on('$destroy', function () {
                //event $destroy when current view $destroy
                listenerCreateProduct();
                listenerEditProduct();
            });
        }
    ]);
