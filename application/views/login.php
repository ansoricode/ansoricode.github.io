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
  <link rel="stylesheet" href="<?=base_url();?>assets/css/style.css?v=1.0.0c">
  <link rel="stylesheet" href="<?=base_url();?>assets/css/components.css">
</head>

<body>
    <!-- START APP -->
    <div id="app">

        <section class="mff-section">
            <div class="mff-container">
                              

                <div class="card card-primary mff-form">
                    <div class="card-header row">
                        <div class="mff-brand">
                            <img src="<?=base_url();?>assets/img/depok.png" alt="logo" class="image-brand">
                        </div>
                        <h2 class="col-lg-12 text-primary mff-title" style="text-align:center;" >Selamat Datang!</h2>
                        <p class="col-lg-12 text-muted mff-subtitle" style="text-align:center;font-size:1.2rem;">Sistem Database Perusahaan</p>
                    </div>

                    <div class="card-body">
                        <?php /*  <form method="POST" action="<?=base_url()?>Authenticator/login" class="needs-validation" novalidate="">  */ ?>
                        <form method="POST" action="<?=base_url()?>Beranda" class="needs-validation" novalidate="">
                            <div class="form-group">
                                <input type="hidden" name="<?=$name;?>" value="<?=$hash;?>">
                                <label for="nib">NIB</label>                
                                <input id="nib" type="text" class="form-control" name="nib" tabindex="1" required autofocus>
                                <div class="invalid-feedback">
                                Mohon masukkan NIB Anda
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-block">
                                <label for="password" class="control-label">Password</label>
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

                            <?php /*  
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                                Login
                                </button>
                            </div>
                             */ ?>

                            <div class="form-group">
                                <a href=" <?=base_url();?>Authenticator/login" class="btn btn-primary btn-lg btn-block" tabindex="4">
                                Login
                                </a>
                            </div>

                        </form>
                        <div class="float-left">
                            Tidak punya akun?
                            <a href="<?=base_url()?>Register/" class="text-small">
                                Daftar disini
                            </a>
                        </div>
                        <br>
                        <?php if($this->session->has_userdata('alert_messages')) { ?>
                            <div class="alert alert-<?= $this->session->userdata('alert_type');?> alert-has-icon mt-2 mb-0">
                                <div class="alert-icon"><i class="<?= $this->session->userdata('alert_icon');?>"></i></div>
                                <div class="alert-body">
                                <div class="alert-title">Pesan</div>
                                <?= $this->session->userdata('alert_messages'); ?>
                                </div>
                            </div>
                        <?php } ?>
                        <br>
                        <div class="login-footer">
                            Copyright &copy; <a href="<?=base_url();?>">DISNAKER DEPOK</a> <?= date('Y');?>
                        </div>
                        
                    </div>
                </div>

                

                

                    
            </div>
        </section>

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

<!-- Template JS File -->
<script src="<?=base_url();?>assets/js/scripts.js"></script>
<script src="<?=base_url();?>assets/js/custom.js"></script>

<!-- Page Specific JS File -->
</body>
</html>