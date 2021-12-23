<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Perusahaan extends MY_Controller {


	public function __construct() {
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		// $this->load->model("Mdashboard", "mdashboard");
	}
	
	public function index() {
		redirect(base_url()."Perusahaan/pendaftaran",'refresh');
	}

    public function pendaftaran() {
        $navbar = array(
            "perusahaanmenulink" => "active",
            "pendaftaranperusahaanmenulink" => "active",
        );

        $body = array(
            'csrf_token' => $this->security->get_csrf_token_name(),
            'csrf_hash' => $this->security->get_csrf_hash()
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("pendaftaranperusahaan", $body);
        $this->load->view("/templates/footer/footer");
    }

    public function profil() {
        $navbar = array(
            "perusahaanmenulink" => "active",
            "profilperusahaanmenulink" => "active",
        );

        $body = array(
            'csrf_token' => $this->security->get_csrf_token_name(),
            'csrf_hash' => $this->security->get_csrf_hash()
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("profilperusahaan", $body);
        $this->load->view("/templates/footer/footer");
    }

}
