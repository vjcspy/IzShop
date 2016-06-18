<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/11/16
 * Time: 5:15 PM
 */

namespace Modules\IzShop\Repositories\CoreConfig;


use Modules\IzCore\Repositories\CoreConfig\ConfigInterface;

class AdminConfig implements ConfigInterface {

    public function handle() {
        return [
            'list_product_url'               => 'izshop/products',
            'product_by_id_url'              => 'izshop/products/product-by-id',
            'product_attr_set_url'           => 'izshop/products/product-attr-set',
            'category_nodes_url'             => 'izshop/category/category-nodes',
            'image_product_upload_url'       => 'izshop/products/upload',
            'tax_class_url'                  => 'izshop/products/tax-class',
            'magento_country_of_manufacture' => 'izshop/products/country-of-manufacture',
            'product_save_url'               => 'izshop/products/save-product'
        ];
    }
}