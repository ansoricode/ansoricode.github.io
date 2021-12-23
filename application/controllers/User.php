<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {


	public function __construct() {
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		// $this->load->model("Mdashboard", "mdashboard");
	}
	
	public function index() {
		$navbar = array(
            "datamastermenulink" => "active",
            "usermenulink" => "active",
        );

        $body = array(
            'csrf_token' => $this->security->get_csrf_token_name(),
            'csrf_hash' => $this->security->get_csrf_hash()
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("user", $body);
        $this->load->view("/templates/footer/footer");
	}

    

}
