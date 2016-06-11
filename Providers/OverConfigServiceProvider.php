<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 07/06/2016
 * Time: 11:37
 */

namespace Modules\IzShop\Providers;


use Illuminate\Support\ServiceProvider;
use Modules\IzCore\Repositories\CoreConfig;

class OverConfigServiceProvider extends ServiceProvider {

    /**
     *Declare Config in IzAdmin
     * return void
     */
    public function boot() {
        /** @var CoreConfig $coreConfig */
        $coreConfig = $this->app['coreConfig'];
        $coreConfig->addConfigProvider('\Modules\IzShop\Repositories\CoreConfig\AdminConfig', 'admin', 0);
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