<?php

return [
    'name' => 'IzShop',
    'api'  => [
        'base_url'                       => "http://mage1.dev/",
        'magento_product_detail'         => "rest/v1/xretail/product-detail",
        'magento_search_product'         => "rest/v1/xretail/product-list",
        'magento_product_attrs'          => "rest/v1/xretail/product-attrs",
        'magento_product_attr_set'       => "rest/v1/xretail/product-attr-set",
        'magento_category_nodes'         => "rest/v1/xretail/categories",
        'magento_xtax-class'             => "rest/v1/xretail/xtax-class",
        'magento_country_of_manufacture' => "rest/v1/xretail/country-of-manufacture",
        'magento_save_product'           => "rest/v1/xretail/product-save",
        'magento_save_product_image'     => "rest/v1/xretail/product-save-image"
    ]
];