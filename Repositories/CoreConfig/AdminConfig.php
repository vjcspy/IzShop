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
            'list_product_url' => 'izshop/products'
        ];
    }
}