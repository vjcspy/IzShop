<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 14/06/2016
 * Time: 11:50
 */

namespace modules\IzShop\Http\Controllers\Category;


use Modules\IzShop\Http\Controllers\Magento\MagentoApiSearchAbstractController;

class CategoryController extends MagentoApiSearchAbstractController {

    public function getCategoryNodes() {
        $this->magentoSearchApi->setApiUrl($this->getApiUrl('magento_category_nodes'));
        $items = $this->magentoSearchApi->setPageSize(500)->authenticate()->resolve()->getItems();

        return $this->outputJson($items);
    }
}