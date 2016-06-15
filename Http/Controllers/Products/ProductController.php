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

class ProductController extends DataTableWithMagentoApiAbstractController {

    use ImageUpload;

    public function getIndex(Request $request) {
        $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_search_product'));

        return parent::getIndex($request); // TODO: Change the autogenerated stub
    }

    public function getProductById(Request $request) {
        try {
            $params = $request->all();

            $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_search_product'));

            $response = $this->magentoSearchApi
                ->addSearchCriteria('product_id', $params['id'])
                ->resolve();

            $this->setResponseData($response->getItems());

        } catch (\Exception $e) {
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
}