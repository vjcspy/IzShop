<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/11/16
 * Time: 5:21 PM
 */

namespace Modules\IzShop\Http\Controllers\DataTable;


use Illuminate\Http\Request;
use Response;
use Modules\IzShop\Http\Controllers\Magento\MagentoApiSearchAbstractController;

abstract class DataTableWithMagentoApiAbstractController extends MagentoApiSearchAbstractController {

    protected $dataTableRecord;

    protected $requestData;

    public function getIndex(Request $request) {
        $this->dataTableRecord['recordsTotal']    = 10;
        $this->dataTableRecord['recordsFiltered'] = 10;
        $this->requestData                        = $request->all();

        $this->processSearch()
             ->processPaging();

        $response = $this->magentoSearchApi->authenticate()->resolve();

        $data
            = [
            "draw"            => $this->requestData['draw'],
            "recordsTotal"    => $response->getTotalCount(),
            "recordsFiltered" => $response->getTotalCount(),
            "data"            => $response->getItems()
        ];

        return Response::json($data);
    }

    protected function processSearch() {
        if (isset($this->requestData['columns'])) {
            foreach ($this->requestData['columns'] as $column) {

            }
        }

        return $this;
    }

    protected function processPaging() {
        $this->magentoSearchApi
            ->setForceMode()
            ->setPageSize($this->requestData['length'])
            ->setCurrentPage($this->requestData['start'] / $this->requestData['length'] + 1);

        return $this;
    }
}