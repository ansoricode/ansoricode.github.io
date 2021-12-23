<style>
  .error {
    color: red;
    margin-top: 5px;
  }
</style>

<!-- Main Content -->
<div class="main-content">
    <section class="section">
        <div class="section-header">
          <h1>Rekap PKWT</h1>
          <div class="section-header-breadcrumb">
              <div class="breadcrumb-item active">Laporan</div>
              <div class="breadcrumb-item">Rekap PKWT</div>
          </div>
        </div>

       

        <div class="section-body">
            <div class="row">
              <div class="col-12 col-md-12 col-lg-12">
                <div class="card">
                    
                      <form id="laporan-form" class="" novalidate="" action="<?= base_url();?>Laporan/export" method="POST" enctype="multipart/form-data">
                      <input id="csrf" type="hidden" name="<?= $this->security->get_csrf_token_name();?>" value="<?= $this->security->get_csrf_hash(); ?>" >
                      <div class="card-header">
                        <h4>Form Rekap Laporan</h4>
                      </div>
                      <div class="card-body">
                        
                        <div class="form-group row">
                          <label class="col-sm-3 col-lg-12 col-form-label">Tanggal Awal</label>
                          <div class="col-sm-9 col-lg-12">
                            <input id="tanggalawal" name="tanggalawal" type="text" class="form-control datepicker"  required="">
                            <div class="invalid-feedback">
                              Mohon lengkapi terlebih dahulu.
                            </div>
                          </div>
                        </div>

                        <div class="form-group row mb-0">
                          <label class="col-sm-3 col-lg-12 col-form-label">Tanggal Akhir</label>
                          <div class="col-sm-9 col-lg-12">
                            <input id="tanggalakhir" name="tanggalakhir" type="text" class="form-control datepicker"  required="">
                            <div class="invalid-feedback">
                              Mohon lengkapi terlebih dahulu.
                            </div>
                          </div>
                        </div>



                      </div>
                      
                      <div class="card-footer mt-0 text-right ">
                        <button type="submit" class="btn btn-primary col-lg-12 col-sm-3">Export Excel</button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>

    </section>
    </div>