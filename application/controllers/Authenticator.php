<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Authenticator extends CI_Controller {

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
            // $this->load->view('admin/template/header/generalheader');
            $this->load->view('login',$csrf);
            // $this->load->view('admin/template/footer/generalfooter');
        }
    }

    public function login() {
        $nib = $this->input->post('nib');
        // $checkuser = $this->muser->get_user(array("username"=> $username));
        // if(sizeof($checkuser) == 1 && $checkuser[0]["status"] == "Activated"){
        //     $salt = $checkuser[0]["salt"];
        //     $password_encrypted = $checkuser[0]["password"];
        //     $password = hash_hmac('sha256',$this->input->post('password'),$salt);
        //     if(hash_equals($password, $password_encrypted)){
                $newsession = array(
                    'data_username' => $nib,
                    // 'data_idbank' => $checkuser[0]['idbank'],
                    // 'data_banklevel' => $checkuser[0]['level'] ,
                    // 'data_jenisakun' => $checkuser[0]['jenisakun'],
                    'user_logged' => TRUE,
                );
                $this->session->set_userdata($newsession);
        //     }
        //     else{
        //         $newsession_alertmessages = array(
        //             'alert_messages' => 'Proses Autentifikasi dan Autoriasi <b> Gagal </b><br>Username dan Password Anda tidak sesuai.',
        //             'alert_type' => 'danger',
        //             'alert_icon' => 'fas fa-times-circle',
        //         );
        //         $this->session->set_flashdata($newsession_alertmessages);
        //     }
        // }
        // else {
        //     $newsession_alertmessages = array(
        //         'alert_messages' => 'Proses Autentifikasi dan Autoriasi <b> Gagal </b><br>Username tidak terdaftar.',
        //         'alert_type' => 'danger',
        //         'alert_icon' => 'fas fa-times-circle',
        //     );
        //     $this->session->set_flashdata($newsession_alertmessages);
        // }
        redirect(base_url(), 'refresh');
    }

    public function logout() {
        $newsession = array(
            'data_username',
            'data_banklevel',
            'user_logged',
        );
        $this->session->unset_userdata($newsession);
        $newsession_alertmessages = array(
            'alert_messages' => 'Proses Logout <b> Berhasil </b><br>',
            'alert_type' => 'success',
            'alert_icon' => 'fas fa-check-circle',
        );
        $this->session->set_flashdata($newsession_alertmessages);
        redirect(base_url(), 'refresh');
    }

    // public function lupapassword() {
    //     $csrf = array(
    //         'name' => $this->security->get_csrf_token_name(),
    //         'hash' => $this->security->get_csrf_hash()
    //     );
    //     $this->load->view('admin/template/header/generalheader');
    //     $this->load->view('admin/lupapassword', $csrf);
    //     $this->load->view('admin/template/footer/generalfooter');
    // }

    // public function resetpassword() {
    //     $csrf = array(
    //         'name' => $this->security->get_csrf_token_name(),
    //         'hash' => $this->security->get_csrf_hash()
    //     );
    //     $this->load->view('admin/template/header/generalheader');
    //     $this->load->view('admin/resetpassword', $csrf);
    //     $this->load->view('admin/template/footer/generalfooter');
    // }

    // public function salt(){
    //     $salt = uniqid();
    //     $password = hash_hmac("sha256","pusat123",$salt);
    //     echo "salt: ".$salt;
    //     echo "<br>Password: ".$password;
    // }

}