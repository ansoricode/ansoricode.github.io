<?php /* TOP NAVBAR  */ ?>
<div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
    <form class="form-inline mr-auto">
        <ul class="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars text-secondary"></i></a></li>
        </ul>
        
    </form>
    <ul class="navbar-nav navbar-right">
        
        
        <li class="dropdown"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user text-secondary">
        <img alt="image" src="<?= base_url();?>assets/img/avatar/avatar-1.png" class="rounded-circle mr-1">
        <div class="d-sm-none d-lg-inline-block text-secondary">Hi, Admin</div></a>
        <div class="dropdown-menu dropdown-menu-right">
            <a href="<?=base_url();?>Authenticator/logout" class="dropdown-item has-icon text-primary">
            <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </div>
        </li>
    </ul>
</nav>


<?php /* MENU SIDEBAR  */ ?>
<div class="main-sidebar">
    <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
        <!-- <a href="index.html">DEPOK</a> -->
            <a href="<?=base_url();?>" class="navbar-brand "><img class="d-inline-block align-top" height=45 src="<?=base_url();?>/assets/img/logo.png" alt="DEPOK"></a>
        </div>
        <div class="sidebar-brand sidebar-brand-sm mt-2">
            <a href="<?=base_url();?>" class="navbar-brand "><img class="d-inline-block align-top" height=25 src="<?=base_url();?>/assets/img/logo.png" alt="DEPOK"></a>
        </div>
        <ul class="sidebar-menu">
            <li <?php if(isset($dashboardmenulink)){ echo "class='".$dashboardmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Beranda/"><i class="fas fa-home"></i> <span>Beranda</span></a></li>
            
            <li class="nav-item dropdown <?php if(isset($perusahaanmenulink)){ echo $perusahaanmenulink;}?>">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-building"></i> <span>Profil Perusahaan</span></a>
                <ul class="dropdown-menu">
                    <li <?php if(isset($pendaftaranperusahaanmenulink)){ echo "class='".$pendaftaranperusahaanmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Perusahaan/pendaftaran">Pendaftaran Perusahaan</a></li>
                    <li <?php if(isset($profilperusahaanmenulink)){ echo "class='".$profilperusahaanmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Perusahaan/profil">Profil Perusahaan</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown <?php if(isset($pkwtmenulink)){ echo $pkwtmenulink;}?>">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-user-tie"></i> <span>Data PKWT</span></a>
                <ul class="dropdown-menu">
                    <li <?php if(isset($datapkwtmenulink)){ echo "class='".$datapkwtmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Pkwt/datapkwt">Data PKWT</a></li>
                    <li <?php if(isset($laporanpkwtmenulink)){ echo "class='".$laporanpkwtmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Pkwt/laporanpkwt">Laporan PKWT</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown <?php if(isset($laporanmenulink)){ echo $laporanmenulink;}?>">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-file-invoice"></i> <span>Laporan</span></a>
                <ul class="dropdown-menu">
                    <li <?php if(isset($rekapperusahaanmenulilnk)){ echo "class='".$rekapperusahaanmenulilnk."'";}?>><a class="nav-link" href="<?=base_url();?>Laporan/rekapperusahaan">Rekap Perusahaan</a></li>
                    <li <?php if(isset($rekappkwtmenulink)){ echo "class='".$rekappkwtmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Laporan/rekappkwt">Rekap PKWT</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown <?php if(isset($pesanmenulink)){ echo $pesanmenulink;}?>">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-envelope"></i> <span>Pesan</span></a>
                <ul class="dropdown-menu">
                    <li <?php if(isset($kirimpesanmenulink)){ echo "class='".$kirimpesanmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Pesan/kirimpesan">Kirim Pesan</a></li>
                    <li <?php if(isset($statuspesanmenulink)){ echo "class='".$statuspesanmenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Pesan/statuspesan">Status Pesan</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown <?php if(isset($datamastermenulink)){ echo $datamastermenulink;}?>">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-cog"></i> <span>Data Master</span></a>
                <ul class="dropdown-menu">                    
                    <li <?php if(isset($usermenulink)){ echo "class='".$usermenulink."'";}?>><a class="nav-link" href="<?=base_url();?>User/">User</a></li>
                    <li <?php if(isset($bidangusahamenulink)){ echo "class='".$bidangusahamenulink."'";}?>><a class="nav-link" href="<?=base_url();?>Bidangusaha/">Bidang Usaha</a></li>
                </ul>
            </li>            
            
        </ul>

    </aside>
</div>