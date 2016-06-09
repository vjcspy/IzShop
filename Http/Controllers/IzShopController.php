<?php namespace Modules\Izshop\Http\Controllers;

use Pingpong\Modules\Routing\Controller;

class IzShopController extends Controller {
	
	public function index()
	{
		return view('izshop::index');
	}
	
}