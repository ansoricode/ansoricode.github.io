<div class="main-content">
    <section class="section">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card card-statistic-2">
                    <div class="card-container">
                        <div class="card-icon shadow-primary bg-primary">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header">
                                <h4>Jumlah Perusahaan</h4>
                            </div>
                            <div class="card-body">
                                <?php if(isset($perusahaan)){ echo sizeof($perusahaan);} else{echo "0";}  ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card card-statistic-2">
                    <div class="card-container">
                        <div class="card-icon shadow-primary bg-primary">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="card-wrap">
                            <div class="card-header">
                                <h4>Jumlah PKWT</h4>
                            </div>
                            <div class="card-body">
                                <?php if(isset($pkwt)) { echo $pkwt['totalpkwt']; } else{echo "0";} ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>



    </section>
</div>