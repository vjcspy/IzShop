<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 07/06/2016
 * Time: 11:59
 */

namespace Modules\IzShop\Providers;


use Illuminate\Support\ServiceProvider;
use Modules\IzCore\Repositories\IzMenu;

class OverMenuServiceProvider extends ServiceProvider {

    public function boot() {
        /** @var IzMenu $izMenu */
        $izMenu = $this->app['izMenu'];

        $izAdminNav = $izMenu->getMenu('izAdminNav');

        if ($izMenu->getParentNamePosition($izAdminNav, 'shop_products')) {

        }
        else {
            $izMenu->addMenu(
                'izAdminNav',
                [
                    [
                        'name_id'       => 'shop_products',
                        'name'          => 'Products',
                        'url'           => 'shop_products',
                        'badge'         => '3',
                        'icon-class'    => 'icon mdi-action-settings i-20',
                        'priority'      => 5,
                        'active-router' => 'shop_products',
                        'children'      => [
                            [
                                'name'     => 'List',
                                'url'      => 'shop_products.list',
                                'priority' => 1
                            ]
                        ]
                    ],
                ]);
        }
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
        // TODO: Implement register() method.
    }
}