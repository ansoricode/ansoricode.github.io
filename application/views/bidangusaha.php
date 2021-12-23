<!-- Main Content -->
<div class="main-content">
    <section class="section">
        <div class="section-header">
            <h1>Bidang Usaha</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item">Data Master</div>
                <div class="breadcrumb-item active">Bidang Usaha</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Data Tabel</h4>
                            <div class="card-header-action">
                            <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modal-add" data-backdrop="static" data-keyboard="false"><i class="fas fa-plus-square"></i> Tambah Data </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped display" id="data-table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>ID</th>
                                            <th>Nama</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr>
                                            <td>1</td>
                                            <td>1001</td>
                                            <td>Otomotif</td>
                                            <td><span class="badge badge-success m-1">Aktif</span></td>
                                            <td>
                                                <button class="btn btn-icon icon-left btn-primary m-1" data-toggle="modal" data-target="#modal-see" data-backdrop="static" data-keyboard="false"><i class="fas fa-eye"></i> Detail</button>
                                                <button class="btn btn-icon icon-left btn-info m-1" data-toggle="modal" data-target="#modal-edit" data-backdrop="static" data-keyboard="false"><i class="fas fa-edit"></i> Edit</button>
                                                <button class="btn btn-icon icon-left btn-danger m-1" data-toggle="modal" data-target="#modal-delete" data-backdrop="static" data-keyboard="false"><i class="fas fa-times"></i> Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>ID</th>
                                            <th>Nama</th>
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
                                    <label>Nama</label>
                                    <input id="see-nama" name="see-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="see-jenisakun" name="see-jenisakun" class="form-control">
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
                                    <label>Nama</label>
                                    <input id="add-nama" name="add-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="add-jenisakun" name="add-jenisakun" class="form-control">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Non-Aktif</option>
                                    </select>
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
                                    <label>Nama</label>
                                    <input id="edit-nama" name="edit-nama" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="edit-jenisakun" name="edit-jenisakun" class="form-control">
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


</div>