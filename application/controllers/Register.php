<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

    public function __construct() {
        parent::__construct();
        // $this->load->model("Muser","muser");
    }

    public function index() {
        if($this->session->has_userdata('user_logged')) {
            redirect(base_url()."Beranda");
        }
        else {
            $csrf = array(
                'name' => $this->security->get_csrf_token_name(),
                'hash' => $this->security->get_csrf_hash()
            );
            $this->load->view('registration',$csrf);
        }
    }

}