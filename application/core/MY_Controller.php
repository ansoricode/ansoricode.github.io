<?php  
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        if($this->session->has_userdata('user_logged') == FALSE) {
            $newsession_alertmessages = array(
                'alert_messages' => 'Anda tidak memiliki hak akses pada halaman tersebut.<br>Mohon untuk login terlebih dahulu. Terimakasih.',
                'alert_type' => 'warning',
                'alert_icon' => 'fas fa-exclamation-triangle',
            );
            $this->session->set_flashdata($newsession_alertmessages);
            redirect(base_url(), 'refresh');
            exit('Anda tidak memiliki hak akses halaman tersebut.<br>Mohon login terlebih dahulu. Terimakasih.');
        }
    }

}