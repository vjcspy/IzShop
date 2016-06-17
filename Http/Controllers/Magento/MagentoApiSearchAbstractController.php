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

    const STATUS_BAD_REQUEST = 400;
    const STATUS_NOT_MODIFIED = 304;
    const STATUS_CREATED = 201;
    const STATUS_UNAUTHORIZED = 401;
    const STATUS_404 = 404;
    /**
     * @var
     */
    protected $_responseData = [];

    /**
     * @var
     */
    protected $_responseCode = 200;

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
            throw new \Exception("Can't find API URL: " . $key);

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

    /**
     * @return mixed
     */
    public function getResponseData() {
        return $this->_responseData;
    }

    /**
     * @param mixed $responseData
     */
    public function setResponseData($responseData) {
        $this->_responseData = $responseData;
    }

    /**
     * @return mixed
     */
    public function getResponseCode() {
        return $this->_responseCode;
    }

    /**
     * @param mixed $responseCode
     */
    public function setResponseCode($responseCode) {
        $this->_responseCode = $responseCode;
    }

    /**
     * Tra ve request data
     *
     * @param Request $reqest
     *
     * @return array
     */
    public function getRequestData(Request $reqest) {
        return $reqest->all();
    }

    /**
     * Tra ve nhung response co data la json
     *
     * @return mixed
     */
    public function responseJson() {
        return Response::json($this->_responseData, $this->_responseCode);
    }

    public function setErrorData($error) {
        $this->setResponseCode(self::STATUS_BAD_REQUEST);
        $this->_responseData = [
            'error' => true,
            'mess'  => $error
        ];

        return $this;
    }
}