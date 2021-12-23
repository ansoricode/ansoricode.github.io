<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Datamenu {

    public $sidemenu_pusat = array(
        "Dashboard" => array(
            "RekapInfaq"    => array(),
            "RekapZakat"    => array(),
            "RekapBUMY"     => array(),
            "BankInfaq"     => array(),
            "SahabatInfaq"  => array(),
        ),
        "BankInfaq" => array(

        ),
        "SahabatInfaq" => array(

        ),
        "LaporanKeuangan" => array(

        ),
        "File" => array(

        ),
        "Manajemen" => array(

        ),
        "User" => array(

        ),
        "Helpdesk" => array(

        ),
    );

    public $sidemenu_cabang = array(
        "Penerimaan" => array(
            "CicilanPinjaman" => array(),
            "PengembalianPinajamanBUMY"  => array(),
            "ZakatMaalProduktif" => array(),
            "InfaqRutinKotak" => array(),
            "InfaqSukarelaKelompok" => array(),
            "InfaqKhususNonAnggota" => array(),
            "InfaqKhususAnggota" => array(),
            "InfaqKhususManajemen" => array(),
        ),
        "Pengeluaran" => array(),
        "DownloadFile" => array(),
        "HelpDesk" => array(),
    );

}