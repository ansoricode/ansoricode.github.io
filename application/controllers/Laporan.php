<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan extends MY_Controller {


	public function __construct() {
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		// $this->load->model("Mdashboard", "mdashboard");
	}
	
	public function index() {
		redirect(base_url()."Laporan/rekapperusahaan",'refresh');
	}

    public function rekapperusahaan () {
        $navbar = array(
            "laporanmenulink" => "active",
            "rekapperusahaanmenulilnk" => "active",
        );

        $body = array(
            'csrf_token' => $this->security->get_csrf_token_name(),
            'csrf_hash' => $this->security->get_csrf_hash()
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("rekapperusahaan", $body);
        $this->load->view("/templates/footer/footer");
    }

    public function rekappkwt() {
        $navbar = array(
            "laporanmenulink" => "active",
            "rekappkwtmenulink" => "active",
        );

        $body = array(
            'csrf_token' => $this->security->get_csrf_token_name(),
            'csrf_hash' => $this->security->get_csrf_hash()
        );

        $this->load->view("/templates/header/header");
        $this->load->view("/templates/navbar/navbar", $navbar);
        $this->load->view("rekappkwt", $body);
        $this->load->view("/templates/footer/footer");
    }

}
