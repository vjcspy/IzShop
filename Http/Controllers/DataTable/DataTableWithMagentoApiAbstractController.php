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

    /**
     * @var
     */
    protected $dataTableRecord;

    /**
     * @var
     */
    protected $requestData;

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function getIndex(Request $request) {
        $this->requestData = $request->all();

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

    /**
     * @return $this
     * @throws \Exception
     */
    protected function processSearch() {

        // search data
        if (isset($this->requestData['columns'])) {
            foreach ($this->requestData['columns'] as $column) {
                if ($column['searchable'] && $column['search']['value']) {
                    $this->magentoSearchApi->addSearchCriteria($column['data'], $column['search']['value']);
                }
            }
        }

        //order
        if (isset($this->requestData['order'])) {
            foreach ($this->requestData['order'] as $order) {
                if (in_array($order['dir'], ['asc', 'desc'])) {
                    $this->magentoSearchApi->addSearchCriteria('dir', strtoupper($order['dir']));
                    $this->magentoSearchApi->addSearchCriteria('orderColumn', $this->requestData['columns'][$order['column']]['data']);
                    break;
                }
            }
        }

        return $this;
    }

    /**
     * @return $this
     */
    protected function processPaging() {
        $this->magentoSearchApi
            ->setForceMode()
            ->setPageSize($this->requestData['length'])
            ->setCurrentPage($this->requestData['start'] / $this->requestData['length'] + 1);

        return $this;
    }
}