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
use Response;

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

    /**
     * @param $key
     *
     * @return string
     * @throws \Exception
     */
    protected function getApiUrl($key) {
        if (!isset(config('izshop')['api'][$key]))
            throw new \Exception("Can't find api url: " . $key);

        return config('izshop')['api']['base_url'] . config('izshop')['api'][$key];
    }

    /**
     * @param $data
     *
     * @return mixed
     */
    public function outputJson($data) {
        return Response::json($data);
    }
}