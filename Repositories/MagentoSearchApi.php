<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/10/16
 * Time: 10:53 PM
 */

namespace Modules\IzShop\Repositories;


use Modules\IzCore\Repositories\Object\IzObject;

class MagentoSearchApi extends IzObject {

    /**
     * @var string $apiUrl
     */
    protected $apiUrl;

    /**
     * MagentoSearchApi constructor.
     *
     * @param array $data
     */
    public function __construct(array $data = []) { parent::__construct($data); }

    /**
     * @return string | null
     */
    public function getApiUrl() {
        return $this->apiUrl;
    }

    /**
     * @param string $apiUrl
     *
     * @return $this
     */
    public function setApiUrl($apiUrl) {
        $this->apiUrl = $apiUrl;

        return $this;
    }

    /**
     * @param $name
     * @param $value
     *
     * @throws \Exception
     */
    public function addSearchCriteria($name, $value) {
        if (!filter_var($this->getApiUrl(), FILTER_VALIDATE_URL) === false) {
            if (preg_match('/\?/', $this->getApiUrl())) {
                $this->setApiUrl($this->getApiUrl() . '&searchCriteria[' . $name . ']=' . $value);
            }
            else {
                $this->setApiUrl($this->getApiUrl() . '?searchCriteria[' . $name . ']=' . $value);
            }
        }
        else {
            throw new \Exception('ApiUrl is not a valid URL');
        }

    }
}