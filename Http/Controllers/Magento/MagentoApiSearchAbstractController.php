<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/10/16
 * Time: 10:46 PM
 */

namespace Modules\IzShop\Http\Controllers\Magento;


use Modules\IzShop\Repositories\MagentoSearchApi;
use Pingpong\Modules\Routing\Controller;

abstract class MagentoApiSearchAbstractController extends Controller {

    /**
     * @var \Modules\IzShop\Repositories\MagentoSearchApi
     */
    protected $magentoSearchApi;

    /**
     * MagentoApiSearchAbstractController constructor.
     *
     * @param \Modules\IzShop\Repositories\MagentoSearchApi $magentoSearchApi
     */
    public function __construct(
        MagentoSearchApi $magentoSearchApi
    ) {
        $this->magentoSearchApi = $magentoSearchApi;
    }
}