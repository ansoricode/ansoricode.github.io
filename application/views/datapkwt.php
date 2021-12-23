<!-- Main Content -->
<div class="main-content">
    <section class="section">
        <div class="section-header">
            <h1>Data PKWT</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item">PKWT</div>
                <div class="breadcrumb-item active">Data PKWT</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Data Tabel</h4>
                            <div class="card-header-action">
                                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modal-add" data-backdrop="static" data-keyboard="false"><i class="fas fa-plus-square"></i> Tambah PKWT </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped display" id="data-table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>Tanggal</th>
                                            <th>Nama PKWT</th>
                                            <th>Alamat</th>
                                            <th>Telepon</th>
                                            <th>Perusahaan</th>
                                            <th>NIB</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr>
                                            <td>1</td>
                                            <td>19-12-2021</td>
                                            <td>PKWT A</td>
                                            <td>Jalan Margonda, Depok</td>
                                            <td>021-123456</td>
                                            <td>Perusahaan A</td>
                                            <td>1234567890123</td>
                                            <td><span class="badge badge-success m-1">Aktif</span></td>
                                            <td>
                                                <button class="btn btn-icon icon-left btn-primary m-1" data-toggle="modal" data-target="#modal-see" data-backdrop="static" data-keyboard="false"><i class="fas fa-eye"></i> Detail</button>
                                                <button class="btn btn-icon icon-left btn-info m-1" data-toggle="modal" data-target="#modal-edit" data-backdrop="static" data-keyboard="false"><i class="fas fa-edit"></i> Edit</button>
                                                <button class="btn btn-icon icon-left btn-danger m-1" data-toggle="modal" data-target="#modal-delete" data-backdrop="static" data-keyboard="false"><i class="fas fa-times"></i> Hapus</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>Tanggal</th>
                                            <th>Nama PKWT</th>
                                            <th>Alamat</th>
                                            <th>Telepon</th>
                                            <th>Perusahaan</th>
                                            <th>NIB</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </section>

    <?php /*MODAL LIHAT*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-see">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Lihat Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="add-form" action="<?=base_url()."User/see";?>" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <div class="alert alert-info" style="display:none;">
                                    <b>Catatan!</b> Mohon Periksa Kembali Form Isian Anda!
                                </div>
                                <div class="form-group">
                                    <label>Tanggal</label>
                                    <input id="see-tanggal" name="see-tanggal" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama PKWT</label>
                                    <input id="see-nama" name="see-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input id="see-alamat" name="see-alamat" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>No. Telepon</label>
                                    <input id="see-telepon" name="see-telepon" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama Perusahaan</label>
                                    <div class="row">
                                        <select id="see-nib" name="see-nib" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="see-status" name="see-status" class="form-control">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Non-Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Batal</button>
                        <button id="see-button" type="button" class="btn btn-primary">Simpan Data</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL LIHAT*/?>


    <?php /*MODAL TAMBAH*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-add">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Tambah Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="add-form" action="<?=base_url()."User/add";?>" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <div class="alert alert-info" style="display:none;">
                                    <b>Catatan!</b> Mohon Periksa Kembali Form Isian Anda!
                                </div>
                                <div class="form-group">
                                    <label class="d-block">KTP</label>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ktp" id="ktpdepok" checked="">
                                        <label class="form-check-label" for="ktpdepok">Depok</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ktp" id="ktpluardepok">
                                        <label class="form-check-label" for="ktpluardepok">Luar Depok</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="d-block">NIK</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="" aria-label="">
                                        <div class="input-group-append">
                                        <button class="btn btn-primary" type="button">Cari</button>
                                        </div>
                                    </div>
                                    <label class="d-block">Belum memiliki AK1 silahkan Klink Link berikut: <a href="https://bkol.depok.go.id/"><b>https://bkol.depok.go.id</b></a></label>
                                </div>
                                <div class="form-divider text-warning">
                                    Profil
                                </div>
                                <div class="form-group">
                                    <label>Nama</label>
                                    <input id="add-nama" name="add-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <textarea class="form-control" name="add-alamat" id="add-alamat" required="" style="margin-top: 0px; margin-bottom: 0px; height: 107px;"></textarea>
                                    <div class="invalid-feedback">
                                        Mohon lengkapi terlebih dahulu.
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Kecamatan</label>
                                    <input id="add-kecamatan" name="add-kecamatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Kelurahan</label>
                                    <input id="add-kelurahan" name="add-kelurahan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jenis Kelamin</label>
                                    <input id="add-jeniskelamin" name="add-jeniskelamin" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Tempat Lahir</label>
                                    <input id="add-tempatlahir" name="add-tempatlahir" type="text" class="form-control">
                                </div><div class="form-group">
                                    <label>Tanggal</label>
                                    <input id="add-tanggallahir" name="add-tanggallahir" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nomor HP</label>
                                    <input id="add-nohp" name="add-nohp" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input id="add-email" name="add-email" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Pendidikan</label>
                                    <input id="add-pendidikan" name="add-pendidikan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jurusan</label>
                                    <input id="add-jurusan" name="add-jurusan" type="text" class="form-control">
                                </div>
                                <div class="form-divider text-warning">
                                    Jaminan Kesehatan
                                </div>
                                <div class="form-group">
                                    <label>Nomor BPJS Kesehatan</label>
                                    <input id="add-bpjskesehatan" name="add-bpjskesehatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nomor BPJS Ketenagakerjaan</label>
                                    <input id="add-bpjsketenagakerjaan" name="add-bpjsketenagakerjaan" type="text" class="form-control">
                                </div>
                                <div class="form-divider text-warning">
                                    Info Pekerjaan
                                    <button type="button" class="btn btn-primary float-right" onclick="openModal('modal-add-pkwt')"><i class="fas fa-plus-square"></i> Tambah </button>
                                </div>
                                <div class="form-group">
                                    <div class="table-responsive">
                                        <table class="table table-striped display" id="data-table">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">No</th>
                                                    <th>No. Kontrak</th>
                                                    <th>Tgl. Awal</th>
                                                    <th>Tgl. Akhir</th>
                                                    <th>Jabatan</th>
                                                    <th>Divisi</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>                                        
                                                <tr>
                                                    <td>1</td>
                                                    <td>002/VI/2021</td>
                                                    <td>12/06/2021</td>
                                                    <td>12/12/2021</td>
                                                    <td>Staf</td>
                                                    <td>Produksi</td>
                                                    <td><span class="badge badge-success m-1">Terdaftar</span></td>
                                                    <td>
                                                        <button class="btn btn-icon icon-left btn-danger m-1" data-toggle="modal" data-target="#modal-delete" data-backdrop="static" data-keyboard="false"><i class="fas fa-times"></i> Hapus</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th class="text-center">No</th>
                                                    <th>No. Kontrak</th>
                                                    <th>Tgl. Awal</th>
                                                    <th>Tgl. Akhir</th>
                                                    <th>Jabatan</th>
                                                    <th>Divisi</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Batal</button>
                        <button id="add-button" type="button" class="btn btn-primary">Simpan Data</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL TAMBAH*/?>

    <?php /*MODAL TAMBAH PKWT*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-add-pkwt">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Tambah PKWT</h5>
                    <button type="button" class="close" aria-label="Close" onclick="closeModal('modal-add-pkwt')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="add-form" action="<?=base_url()."User/add";?>" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <div class="alert alert-info" style="display:none;">
                                    <b>Catatan!</b> Mohon Periksa Kembali Form Isian Anda!
                                </div>
                                <div class="form-group">
                                    <label>No. Kontrak</label>
                                    <input id="add-pkwt-nokontrak" name="add-pkwt-nokontrak" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Tanggal Awal</label>
                                    <input id="add-pkwt-tanggalawal" name="add-pkwt-tanggalawal" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Tanggal Akhir</label>
                                    <input id="add-pkwt-tanggalakhir" name="add-pkwt-tanggalakhir" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jabatan</label>
                                    <input id="add-pkwt-jabatan" name="add-pkwt-jabatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Divisi</label>
                                    <input id="add-pkwt-jabatan" name="add-pkwt-jabatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="add-pkwt-status" name="add-pkwt-status" class="form-control">
                                        <option value="Terdaftar">Terdaftar</option>
                                        <option value="Tidak Terdaftar">Tidak Terdaftar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-warning" onclick="closeModal('modal-add-pkwt')">Batal</button>
                        <button id="add-pkwt-button" type="button" class="btn btn-primary" onclick="closeModal('modal-add-pkwt')">Tambah</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL TAMBAH PKWT*/?>

    <?php /*MODAL EDIT*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-edit">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Edit Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="add-form" action="<?=base_url()."User/edit";?>" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <div class="alert alert-info" style="display:none;">
                                    <b>Catatan!</b> Mohon Periksa Kembali Form Isian Anda!
                                </div>
                                <div class="form-group">
                                    <label>Tanggal</label>
                                    <input id="edit-tanggal" name="edit-tanggal" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama PKWT</label>
                                    <input id="edit-nama" name="edit-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input id="edit-alamat" name="edit-alamat" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>No. Telepon</label>
                                    <input id="edit-telepon" name="edit-telepon" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama Perusahaan</label>
                                    <div class="row">
                                        <select id="edit-nib" name="edit-nib" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="edit-status" name="edit-status" class="form-control">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Non-Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Batal</button>
                        <button id="edit-button" type="button" class="btn btn-primary">Simpan Data</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL EDIT*/?>

    <?php /*MODAL HAPUS*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-delete">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Hapus Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="delete-form" action="<?= base_url()?>/Live/delete" method="POST">
                    <input id="csrf" type="hidden" name="<?= $csrf_token; ?>" value="<?= $csrf_hash; ?>" >
                    <input id="id" name="id" type="hidden" value=""  class="form-control">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <p style="text-align:center;">Apakah anda yakin untuk menghapus data ini?</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batalkan</button>
                        <button id="delete-button" type="submit" class="btn btn-danger submit-button">Hapus</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL HAPUS*/?>

    <?php /*MODAL PESAN*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-pesan">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Pesan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-12">
                            <h4 ></h4>
                            <div id="pesan-tipe" class="alert  alert-has-icon">
                                <div class="alert-icon"><i class="far fa-envelope"></i></div>
                                <div class="alert-body">
                                    <div id="pesan-title" class="alert-title"></div>                                    
                                    <h6 id="pesan-content"></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-whitesmoke br">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>
    <?php /*END MODAL PESAN*/?>

    <?php /*MODAL TAMBAH PKWT*/?>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-add-pkwt">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Tambah PKWT</h5>
                    <button type="button" class="close" aria-label="Close" onclick="closeModal('modal-add-pkwt')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="add-form" action="<?=base_url()."User/add";?>" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">                            
                                <div class="alert alert-info" style="display:none;">
                                    <b>Catatan!</b> Mohon Periksa Kembali Form Isian Anda!
                                </div>
                                <div class="form-group">
                                    <label>No. Kontrak</label>
                                    <input id="add-pkwt-nokontrak" name="add-pkwt-nokontrak" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Tanggal Awal</label>
                                    <input id="add-pkwt-tanggalawal" name="add-pkwt-tanggalawal" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Tanggal Akhir</label>
                                    <input id="add-pkwt-tanggalakhir" name="add-pkwt-tanggalakhir" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Jabatan</label>
                                    <input id="add-pkwt-jabatan" name="add-pkwt-jabatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Divisi</label>
                                    <input id="add-pkwt-jabatan" name="add-pkwt-jabatan" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="add-pkwt-status" name="add-pkwt-status" class="form-control">
                                        <option value="Terdaftar">Terdaftar</option>
                                        <option value="Tidak Terdaftar">Tidak Terdaftar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="button" class="btn btn-warning" onclick="closeModal('modal-add-pkwt')">Batal</button>
                        <button id="add-pkwt-button" type="button" class="btn btn-primary" onclick="closeModal('modal-add-pkwt')">Tambah</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php /*END MODAL TAMBAH PKWT*/?>


</div>