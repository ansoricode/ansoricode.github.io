<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
  <title>Disnaker Depok | Login</title>

  <link rel="shortcut icon" type="image/x-icon" href="<?=base_url();?>assets/img/favicon.ico" />

  <!-- General CSS Files -->
  <link rel="stylesheet" href="<?=base_url();?>assets/modules/bootstrap/css/bootstrap-login.min.css">
  <link rel="stylesheet" href="<?=base_url();?>assets/modules/fontawesome/css/all.min.css">

  <!-- CSS Libraries -->
  <?php /*<link rel="stylesheet" href="<?=base_url();?>assets/bootstrap-social/bootstrap-social.css"> */ ?>

  <!-- Template CSS -->
  <link rel="stylesheet" href="<?=base_url();?>assets/css/style.css?v=1.0.0f">
  <link rel="stylesheet" href="<?=base_url();?>assets/css/components.css">
</head>

<body>
    <!-- START APP -->
    <div id="app">

        <section class="mff-section">
            <div class="mff-container">
                              

                <div class="card card-primary mff-form" id="pendaftaran-form">
                    <div class="card-header row">
                        <div class="mff-brand">
                            <img src="<?=base_url();?>assets/img/depok.png" alt="logo" class="image-brand">
                        </div>
                        <h2 class="col-lg-12 text-primary mff-title" style="text-align:center;">Form Pendaftaran</h2>
                        <p class="col-lg-12 text-muted mff-subtitle" style="text-align:center;font-size:1.2rem;">Sistem Database Perusahaan</p>
                    </div>

                    <div class="card-body">


                        <?php /*  
                            <div class="form-group">                               
                                <a href="#" class="btn btn-primary btn-lg btn-block" tabindex="4" data-toggle="modal" data-target="#modal-see">
                                Daftar
                                </a>
                            </div>
                            
                        */ ?>

                        <form method="POST" action="<?=base_url()?>Authenticator/login" class="needs-validation" novalidate="">
                            
                             
                            <div class="form-divider text-warning">
                                Data Pengguna
                            </div>
                            

                            <div class="form-group">
                                <input type="hidden" name="<?=$name;?>" value="<?=$hash;?>">
                                <label for="nib"><?= ucwords("NIB"); ?></label>                
                                <input id="nib" type="text" class="form-control" name="nib" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                    Mohon masukkan NIB Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-block">
                                <label for="password" class="control-label"><?= ucwords("Password"); ?></label>
                                <div class="float-right">
                                    <a href="<?=base_url();?>Authenticator/lupapassword" class="text-small">
                                    <?php /*  Lupa Password? */ ?>
                                    </a>
                                </div>
                                </div>
                                <input id="password" type="password" class="form-control" name="password" tabindex="2" required>
                                <div class="invalid-feedback">
                                    Mohon masukkan password Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-block">
                                    <label for="password" class="control-label"><?= ucwords("Konfirmasi Password"); ?></label>
                                </div>
                                <input id="konfirmasipassword" type="konfirmasipassword" class="form-control" name="konfirmasipassword" tabindex="2" required>
                                <div class="invalid-feedback">
                                    Password tidak sesuai.
                                </div>
                            </div>

                            <div class="form-divider text-warning">
                                Data Perusahaan
                            </div>

                            <div class="form-group">
                                <label for="namaperusahaan"><?= ucwords("nama perusahaan"); ?></label>                
                                <input id="namaperusahaan" type="text" class="form-control" name="namaperusahaan" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan namaperusahaan Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="bidangperusahaan"><?= ucwords("bidang perusahaan"); ?></label>                
                                <input id="aaaa" type="text" class="form-control" name="bidangperusahaan" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan bidangperusahaan Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email"><?= ucwords("email"); ?></label>                
                                <input id="email" type="text" class="form-control" name="email" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan email Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="telepon"><?= ucwords("telepon"); ?></label>                
                                <input id="telepon" type="text" class="form-control" name="telepon" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan telepon Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="provinsi"><?= ucwords("provinsi"); ?></label>                
                                <input id="provinsi" type="text" class="form-control" name="provinsi" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan provinsi Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="kota"><?= ucwords("kota"); ?></label>                
                                <input id="kota" type="text" class="form-control" name="kota" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan kota Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="kecamatan"><?= ucwords("kecamatan"); ?></label>                
                                <input id="kecamatan" type="text" class="form-control" name="kecamatan" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan kecamatan Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="kelurahan"><?= ucwords("kelurahan"); ?></label>                
                                <input id="kelurahan" type="text" class="form-control" name="kelurahan" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan kelurahan Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="alamat"><?= ucwords("alamat"); ?></label>                
                                <input id="alamat" type="text" class="form-control" name="alamat" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan alamat Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="kodepos"><?= ucwords("kode pos"); ?></label>                
                                <input id="kodepos" type="text" class="form-control" name="kodepos" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan kode pos Anda
                                </div>
                            </div>
                            

                            <div class="form-divider text-warning">
                                Data Pemberi Kerja (PIC)
                            </div>


                            <div class="form-group">
                                <label for="namalengkap"><?= ucwords("nama lengkap"); ?></label>                
                                <input id="namalengkap" type="text" class="form-control" name="namalengkap" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan nama lengkap Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="jabatan"><?= ucwords("jabatan"); ?></label>                
                                <input id="jabatan" type="text" class="form-control" name="jabatan" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan jabatan Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="nohp"><?= ucwords("No. HP"); ?></label>                
                                <input id="nohp" type="text" class="form-control" name="nohp" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan no.hp Anda
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="emailpic"><?= ucwords("email PIC"); ?></label>                
                                <input id="emailpic" type="text" class="form-control" name="emailpic" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan email Anda
                                </div>
                            </div>
                            
                            <?php /*   
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                                Daftar
                                </button>
                            </div>
                            */ ?>
                            <div class="form-group">
                                <?php /*   
                                <a href="<?=base_url();?>Authenticator/" class="btn btn-primary btn-lg btn-block" tabindex="4" >
                                */ ?>
                                <a href="#" class="btn btn-primary btn-lg btn-block" tabindex="4" data-toggle="modal" data-target="#modal-see" data-backdrop="static" data-keyboard="false">
                                Daftar
                                </a>
                            </div>
                        </form>
                        <div class="float-left">
                            Sudah punya akun?
                            <a href="<?=base_url()?>Authenticator/" class="text-small">
                                Login
                            </a>
                        </div>
                        <br>
                        <div class="login-footer">
                            Copyright &copy; <a href="<?=base_url();?>">DISNAKER DEPOK</a> <?= date('Y');?>
                        </div>
                        
                    </div>
                </div>

                <?php if($this->session->has_userdata('alert_messages')) { ?>
                <div class="alert alert-<?= $this->session->userdata('alert_type');?> alert-has-icon">
                    <div class="alert-icon"><i class="<?= $this->session->userdata('alert_icon');?>"></i></div>
                    <div class="alert-body">
                    <div class="alert-title">Pesan</div>
                    <?= $this->session->userdata('alert_messages'); ?>
                    </div>
                </div>
                <?php } ?>

                

                    
            </div>
        </section>

        <?php /*MODAL LIHAT*/?>
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-see">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Bukti Pengajuan Pendaftaran</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body" id="modal-content" style="overflow:scroll;">
                        <div class="print-content" style="width:21cm;height:29cm;">
                            <div class="print-header">
                                <div class="print-header-logo">
                                    <img src="<?=base_url();?>assets/img/depok.png" alt="logo" class="print-header-logo-img">
                                </div>
                                <div class="print-header-text">
                                    <p class="print-header-title">BUKTI PENGAJUAN PENDAFTARAN</p>
                                    <p class="print-header-title">SISTEM DATABASE PERUSAHAAN</p>
                                    <p class="print-header-title">DINAS TENAGA KERJA DEPOK</p>
                                </div>
                            </div>
                            <div class="print-body">
                                <div class="row mt-5 print-body-content">
                                    <div class="col-3">NIB</div>
                                    <div class="col-9">: 392392929292929</div>
                                </div>
                                <div class="row print-body-content">
                                    <div class="col-3">Nama Perusahaan</div>
                                    <div class="col-9">: Perusahaan A B C D E F G H I J K L M N O</div>
                                </div>
                                <div class="row print-body-content">
                                    <div class="col-3">Nomor Telepon</div>
                                    <div class="col-9">: 021-123456</div>
                                </div>
                                <div class="row print-body-content">
                                    <div class="col-3">Waktu Pendaftaran</div>
                                    <div class="col-9">: 20-12-2021</div>
                                </div>
                                <div class="row mt-3 print-body-content">
                                    <div class="col-12">Terimakasih atas pengajuan pendaftaran perusahaan Saudara/i, berikut merupakan bukti pengajuan pendaftaran.</div>
                                </div>
                                <div class="row mt-3 print-body-content">
                                    <div class="col-12">
                                        <img src="<?=base_url();?>assets/img/5f26574945cee.png" alt="" class="print-body-qrcode float-right">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <?php /*  <button type="button" class="btn btn-warning" data-dismiss="modal">Print</button> */ ?>
                        <button onclick="printData('print-content')" type="button" class="btn btn-primary">Print</button>
                    </div>
                </div>
            </div>
        </div>
        <?php /*END MODAL LIHAT*/?>

    </div>
    <!-- EDN App -->

<!-- General JS Scripts -->
<script src="<?=base_url();?>assets/modules/jquery.min.js"></script>
<script src="<?=base_url();?>assets/modules/popper.js"></script>
<script src="<?=base_url();?>assets/modules/bootstrap/js/bootstrap.min.js"></script>
<script src="<?=base_url();?>assets/modules/nicescroll/jquery.nicescroll.min.js"></script>
<script src="<?=base_url();?>assets/modules/moment.min.js"></script>
<script src="<?=base_url();?>assets/js/stisla.js"></script> 

<!-- JS Libraies -->
<!-- PRINT THIS -->
<script src="<?=base_url();?>assets/modules/printthis/printThis.js"></script>

<!-- Template JS File -->
<script src="<?=base_url();?>assets/js/scripts.js"></script>
<script src="<?=base_url();?>assets/js/custom.js"></script>

<script>
    function printData(divID) {

        $("."+divID).printThis({
            debug: false,               // show the iframe for debugging
            importCSS: true,            // import parent page css
            importStyle: false,         // import style tags
            printContainer: false,       // print outer container/$.selector
            loadCSS: "<?=base_url();?>assets/css/style.css",                // path to additional css file - use an array [] for multiple
            pageTitle: false,              // add title to print page
            removeInline: false,        // remove inline styles from print elements
            removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
            printDelay: 333,            // variable print delay
            header: null,               // prefix to html
            footer: null,               // postfix to html
            base: false,                // preserve the BASE tag or accept a string for the URL
            formValues: true,           // preserve input/form values
            canvas: false,              // copy canvas content
            doctypeString: '',       // enter a different doctype for older markup
            removeScripts: false,       // remove script tags from print content
            copyTagClasses: false,      // copy classes from the html & body tag
            beforePrintEvent: null,     // function for printEvent in iframe
            beforePrint: null,          // function called before iframe is filled
            afterPrint: null            // function called before iframe is removed
        });

    }
</script>

<!-- Page Specific JS File -->
</body>
</html>