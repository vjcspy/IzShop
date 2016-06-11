<?php

Route::group(['middleware' => 'web', 'prefix' => 'izshop', 'namespace' => 'Modules\IzShop\Http\Controllers'], function()
{
	Route::controller('/products', 'Products\ProductController');
});