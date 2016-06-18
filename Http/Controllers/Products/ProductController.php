<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/11/16
 * Time: 3:14 PM
 */

namespace Modules\IzShop\Http\Controllers\Products;


use Illuminate\Http\Request;
use Modules\IzCore\Http\Controllers\ImageUpload;
use Modules\IzShop\Http\Controllers\DataTable\DataTableWithMagentoApiAbstractController;
use GuzzleHttp\Client;
use Carbon\Carbon;

class ProductController extends DataTableWithMagentoApiAbstractController {

    use ImageUpload;

    public function getIndex(Request $request) {
        $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_search_product'));

        return parent::getIndex($request); // TODO: Change the autogenerated stub
    }

    public function getProductById(Request $request) {
        try {
            $params = $request->all();
            if (!isset($params['product_id']) || !$params['product_id'])
                throw new \Exception('Must have param product_id');

            $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_product_detail'));

            $response = $this->magentoSearchApi
                ->addSearchCriteria('product_id', $params['product_id'])
                ->setForceMode(1)
                ->authenticate()
                ->resolve();

            $product = $response->getItems();

            /*Check date-time*/
            $product = $this->checkDateTimeProductData($product);

            $this->setResponseData($product);

        }
        catch (\Exception $e) {
            $this->setErrorData($e->getMessage());
        }

        return $this->responseJson();
    }

    public function getTaxClass() {
        try {
            $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_xtax-class'));
            $response = $this
                ->magentoSearchApi
                ->setCurrentPage(1)
                ->setPageSize(100)
                ->authenticate()
                ->resolve();
            $this->setResponseData($response->getItems());
        }
        catch (\Exception $e) {
            $this->setErrorData($e->getMessage());
        }

        return $this->responseJson();
    }

    public function getProductAttrSet() {
        $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_product_attr_set'));
        $items = $this->magentoSearchApi
            ->addSearchCriteria('nothing', 'here')
            ->authenticate()
            ->resolve()
            ->getItems();

        return $this->outputJson($items);
    }

    public function getUploadImage() {
        $client       = new Client();
        $imageContent = fopen('images/a0.jpg', 'r');
        $response     = $client->request(
            'POST',
            "http://mage1.dev/index.php/admin/catalog_product_gallery/upload",
            [
                'multipart' => [
                    [
                        'name'     => 'other_file',
                        'contents' => $imageContent,
                        'filename' => 'filename.txt',
                        'headers'  => [
                            'X-Foo' => 'this is an extra header to include'
                        ]
                    ]
                ]
            ]);

        var_dump($response->getBody());
    }

    public function getCountryOfManufacture() {
        try {
            $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_country_of_manufacture'));
            $response = $this->magentoSearchApi
                ->setForceMode(1)
                ->authenticate()
                ->resolve();

            $this->setResponseData($response->getItems());
        }
        catch (\Exception $e) {
            $this->setErrorData($e->getMessage());
        }

        return $this->responseJson();
    }

    public function postSaveProduct(Request $request) {
        $data = $this->getRequestData($request);
        if (isset($data['categories']) && is_array($data['categories']) && count($data['categories']) > 0) {
            $data['category_ids'] = '';
            foreach ($data['categories'] as $category) {
                $data['category_ids'] .= "," . $category;
            }
        }
        try {
            $client = $this->magentoSearchApi->getClient();
            $r      = $client->request(
                'POST',
                $this->getApiUrl('magento_save_product'),
                [
                    'form_params' => $data,
                    'headers'     => [
                        'Black-Hole' => 'demo'
                    ]
                ]);
            $this->setResponseData($r->getBody());
        }
        catch (\Exception $e) {
            $this->setErrorData($e->getMessage());
        }

        return $this->responseJson();
    }

    private function checkDateTimeProductData($product) {
        $product = $product[0];
        if ($product['news_from_date'] != '') {
            $dt                        = Carbon::parse($product['news_from_date']);
            $product['news_from_date'] = $dt->format('m/d/Y');
        }
        if ($product['news_to_date'] != '') {
            $dt                      = Carbon::parse($product['news_to_date']);
            $product['news_to_date'] = $dt->format('m/d/Y');
        }
        if ($product['special_from_date'] != '') {
            $dt                           = Carbon::parse($product['special_from_date']);
            $product['special_from_date'] = $dt->format('m/d/Y');
        }
        if ($product['special_to_date'] != '') {
            $dt                         = Carbon::parse($product['special_to_date']);
            $product['special_to_date'] = $dt->format('m/d/Y');
        }

        return $product;
    }
}