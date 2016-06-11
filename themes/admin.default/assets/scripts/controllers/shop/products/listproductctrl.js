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
                    {"data": "name"},
                    {"data": "sku"},
                    {"data": "price"}
                ],
                "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                    {className: "id", "targets": [0]},
                    {className: "name", "targets": [1]},
                    {className: "sku", "targets": [2]},
                    {className: "price", "targets": [3]}
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
