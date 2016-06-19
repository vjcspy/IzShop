<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 6/10/16
 * Time: 10:53 PM
 */

namespace Modules\IzShop\Repositories;


use GuzzleHttp\Client;
use Modules\IzCore\Repositories\Object\IzObject;
use Psr\Http\Message\ResponseInterface;

class MagentoSearchApi extends IzObject {

    /**
     * @var string $apiUrl
     */
    protected $apiUrl;

    /**
     * @var Client $client
     */
    protected $client;

    /**
     * @var ResponseInterface
     */
    protected $response;

    /**
     * Response converted to array
     *
     * @var array
     */
    protected $responseF;

    /**
     * @var
     */
    protected $requestHeader;

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
     * @return $this
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

        return $this;
    }

    /**
     * Resolve Request
     *
     * @return $this
     */
    public function resolve() {
        $this->response = $this->getClient()->get($this->getApiUrl(), $this->requestHeader);

        return $this;
    }

    /**
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \Exception
     */
    public function getResponse() {
        if (is_null($this->responseF)) {
            $this->responseF = json_decode($this->response->getBody(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception("Can't convert to JSON");
            }
        }

        return $this->responseF;
    }

    /**
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getOriginResponse() {
        return $this->response;
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function getItems() {
        return $this->getResponse()['items'];
    }

    /**
     * @return string
     * @throws \Exception
     */
    public function getTotalCount() {
        return $this->getResponse()['total_count'];
    }

    /**
     * Get GuzzlePhp Client
     *
     * @return Client
     */
    public function getClient() {
        if (is_null($this->client))
            $this->client = new Client();

        return $this->client;
    }

    public function setForceMode($force = 1) {
        $this->addSearchCriteria('forceMode', $force);

        return $this;
    }

    public function setPageSize($pageSize = 20) {
        $this->addSearchCriteria('pageSize', $pageSize);

        return $this;
    }

    public function setCurrentPage($currentPage = 1) {
        $this->addSearchCriteria('currentPage', $currentPage);

        return $this;
    }

    /**
     * TODO: Need check authentication
     *
     * @return $this
     */
    public function authenticate() {
        $this->requestHeader = [
            'headers' => [
                'Black-Hole' => 'demo'
            ]
        ];

        return $this;
    }
}