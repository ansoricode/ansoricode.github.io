<!-- Main Content -->
<div class="main-content">
    <section class="section">
        <div class="section-header">
            <h1>Status Pesan</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item">Pesan</div>
                <div class="breadcrumb-item active">Status Pesan</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Data Tabel</h4>
                            <div class="card-header-action">
                                <!-- <a href="#" class="btn btn-primary"> <i class="fas fa-plus-square"></i> Tambah PKWT </a> -->
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped display" id="data-table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No</th>
                                            <th>Tanggal</th>
                                            <th>Kepada</th>
                                            <th>Subjek</th>
                                            <th>Isi Pesan</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr>
                                            <td>1</td>
                                            <td>19-12-2021</td>
                                            <td>Perusahaan A</td>
                                            <td>Pengumuman</td>
                                            <td>Sehubungan dengan ...</td>
                                            <td><span class="badge badge-success m-1">Terkirim</span></td>
                                            <td>
                                            <button class="btn btn-icon icon-left btn-primary m-1" data-toggle="modal" data-target="#modal-see" data-backdrop="static" data-keyboard="false"><i class="fas fa-eye"></i> Detail</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                        <th class="text-center">No</th>
                                            <th>Tanggal</th>
                                            <th>Kepada</th>
                                            <th>Subjek</th>
                                            <th>Isi Pesan</th>
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
                    <h5 class="modal-title">Form Detail Data</h5>
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
                                    <label>Kepada</label>
                                    <input id="see-kepada" name="see-kepada" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Subjek</label>
                                    <input id="see-subjek" name="see-subjek" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Isi Pesan</label>
                                    <input id="see-isipesan" name="see-isipesan" type="text" class="form-control">
                                </div>
                                <?php /*
                                <div class="form-group">
                                    <label>Status</label>
                                    <input id="see-status" name="see-status" type="text" class="form-control">
                                </div>
                                */ ?>
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