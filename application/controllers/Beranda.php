<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beranda extends MY_Controller {


	public function __construct() {
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		// $this->load->model("Mdashboard", "mdashboard");
	}
	
	public function index() {
		$navbar = array(
            "dashboardmenulink" => "active",
        );


        $body = array(
            
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("beranda", $body);
        $this->load->view("/templates/footer/footer");
	}

}
