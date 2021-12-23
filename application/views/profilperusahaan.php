<!-- Main Content -->
<div class="main-content">
    <section class="section">
        <div class="section-header">
            <h1>Profil Perusahaan</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item">Perusahaan</div>
                <div class="breadcrumb-item active">Profil Perusahaan</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Data Tabel</h4>
                            <div class="card-header-action">
                                <!-- <a href="#" class="btn btn-primary"> <i class="fas fa-plus-square"></i> Tambah Live </a> -->
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped display" id="data-table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>Tanggal</th>
                                            <th>NIB</th>
                                            <th>Nama Perusahaan</th>
                                            <th>Bidang Perusahaan</th>
                                            <th>Telepon</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr>
                                            <td>1</td>
                                            <td>19-12-2021</td>
                                            <td>1234567890123</td>
                                            <td>Perusahaan A</td>
                                            <td>Otomotif</td>
                                            <td>021-123456</td>
                                            <td><span class="badge badge-warning m-1">Belum</span></td>
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
                                            <th>NIB</th>
                                            <th>Nama Perusahaan</th>
                                            <th>Bidang Perusahaan</th>
                                            <th>Telepon</th>
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
                                    <label>NIB</label>
                                    <input id="see-nib" name="see-nib" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama Perusahaan</label>
                                    <div class="row">
                                        <select id="see-nama" name="see-nama" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Bidang Perusahaan</label>
                                    <div class="row">
                                        <select id="see-bidangperusahaan" name="see-bidangperusahaan" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
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
                                    <label>Status</label>
                                    <input id="see-status" name="see-status" type="text" class="form-control">
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
                                    <label>Tanggal</label>
                                    <input id="add-tanggal" name="add-tanggal" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>NIB</label>
                                    <input id="add-nib" name="add-nib" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama Perusahaan</label>
                                    <div class="row">
                                        <select id="add-nama" name="add-nama" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Bidang Perusahaan</label>
                                    <div class="row">
                                        <select id="add-bidangperusahaan" name="add-bidangperusahaan" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input id="add-alamat" name="add-alamat" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>No. Telepon</label>
                                    <input id="add-telepon" name="add-telepon" type="text" class="form-control">
                                </div>                                
                                <div class="form-group">
                                    <label>Status</label>
                                    <input id="add-status" name="add-status" type="text" class="form-control">
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
                                    <label>NIB</label>
                                    <input id="edit-nib" name="edit-nib" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Nama Perusahaan</label>
                                    <div class="row">
                                        <select id="edit-nama" name="edit-nama" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Bidang Perusahaan</label>
                                    <div class="row">
                                        <select id="edit-bidangperusahaan" name="edit-bidangperusahaan" class="select2 row col-lg-12 col-md-12 col-sm-12">
                                            <option value="">Pilih Data</option>
                                        </select>
                                    </div>
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
                                    <label>Status</label>
                                    <input id="edit-status" name="edit-status" type="text" class="form-control">
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


</div>