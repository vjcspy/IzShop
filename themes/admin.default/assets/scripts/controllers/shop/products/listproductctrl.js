angular.module('app')
    .controller('ListProductCtrl', ['$scope', 'IzAdminConfigService', function ($scope, IzAdminConfigService) {
        var dataCurrency = [];

        /*Config Data table*/
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
                    {"data": "id"},
                    {"data": "origin_image"},
                    {"data": "name"},
                    {"data": "type_id"},
                    {"data": "attribute_set_id"},
                    {"data": "sku"},
                    {"data": "price"},
                    {"data": "stock_items"},
                    {"data": "visibility"},
                    {"data": "status"}
                ],
                "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                    {className: "id", "targets": [0]},
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
                    {className: "attribute_set_id", "targets": [4]},
                    {className: "sku", "targets": [5]},
                    {
                        className: "price",
                        targets: [6],
                        render: function (data, type, row) {
                            return parseFloat(data).toFixed(2);
                        },
                    },
                    {
                        className: "stock_items",
                        targets: [7],
                        render: function (data, type, row) {
                            return parseInt(data.qty);
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
                                return 'Bật'
                            else
                                return 'Tắt'
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
                    columnId: "id",
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
                }
            ],
            editorOptions: [
                {
                    id: "id",
                    title: "Id",
                    type: 'text',
                    editAble: false
                },
                {
                    id: "name",
                    title: "Tên",
                    type: 'text',
                    editAble: true
                },
                {
                    id: "sku",
                    title: "Mã",
                    type: 'text',
                    editAble: true
                },
                {
                    id: "description",
                    title: "Mô tả",
                    type: 'editor',
                    editAble: true
                },
                {
                    id: "price",
                    title: "Giá",
                    type: 'text',
                    editAble: true
                }, {
                    id: "currency",
                    title: "Tiền tệ",
                    type: 'select',
                    optionsData: dataCurrency,
                    editAble: true
                },
                {
                    id: "image_url",
                    title: "Ảnh",
                    type: 'fileUpload',
                    editAble: true
                },
                {
                    id: "cost",
                    title: "Chi phí",
                    type: 'text',
                    editAble: true
                },
                {
                    id: "qty",
                    title: "Số lượng",
                    type: 'text',
                    editAble: true
                },
                {
                    id: "link",
                    title: "Link",
                    type: 'text',
                    editAble: true
                },
                {
                    id: "comment",
                    title: "Chú thích",
                    type: 'textarea',
                    editAble: true
                }
            ]
        };

        $scope.configDataTable = {};
        $scope.configDataTable.isSupportNewRecord = false;
    }
    ]);
