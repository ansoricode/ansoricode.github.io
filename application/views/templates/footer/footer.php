        <footer class="main-footer">
            <!-- <div class="footer-left"> -->
            <div class="text-center">
                Copyright &copy; <a href="<?=base_url();?>">DISNAKER DEPOK</a> <?= date('Y');?>
            </div>
            
        </footer>
    </div>
  </div>

  
  
  <?php /* General JS Scripts */ ?>
  <script src="<?=base_url();?>assets/modules/jquery.min.js"></script>
  <script src="<?=base_url();?>assets/modules/popper.js"></script>
  <script src="<?=base_url();?>assets/modules/bootstrap/js/bootstrap.min.js"></script>
  <script src="<?=base_url();?>assets/modules/nicescroll/jquery.nicescroll.min.js"></script>
  <script src="<?=base_url();?>assets/modules/moment.min.js"></script>
  <script src="<?=base_url();?>assets/js/stisla.js"></script> 

  <?php /* DatePicker Library  */ ?>
  <script src="<?=base_url();?>assets/modules/datepicker-bootstrap/js/bootstrap-datepicker.min.js"></script>
  <script src="<?=base_url();?>assets/modules/datepicker-bootstrap/js/bootstrap-datetimepicker.min.js"></script>


  <?php /* JQuery Form Validation  */ ?>
  <script src="<?=base_url();?>assets/modules/jquery.validate.min.js" type="text/javascript"></script>
  <script src="<?=base_url();?>assets/modules/additional-methods.min.js" type="text/javascript"></script>

  <?php /* JS Libraies */ ?>
  <script src="<?=base_url();?>assets/modules/jquery-sparkline/jquery.sparkline.min.js"></script>
  <script src="<?=base_url();?>assets/modules/chart.min.js"></script>
  <script src="<?=base_url();?>assets/modules/owlcarousel2/dist/owl.carousel.min.js"></script>
  <script src="<?=base_url();?>assets/modules/summernote/dist/summernote-bs4.js"></script>
  <script src="<?=base_url();?>assets/modules/chocolat/dist/js/jquery.chocolat.min.js"></script>
  <script src="<?=base_url();?>assets/modules/datatables/datatables.min.js"></script>
  <script src="<?=base_url();?>assets/modules/select2/select2.min.js" type="text/javascript"></script>

  
  <script src="<?=base_url();?>assets/modules/autonumeric/autoNumeric.js" type="text/javascript"></script>

  <?php /* Template JS File */ ?>
  <script src="<?=base_url();?>assets/js/scripts.js"></script>
  <script src="<?=base_url();?>assets/js/custom.js"></script>

  <script>
    $(document).ready(function(){
      $('#data-table').DataTable({
        "ordering" : true,
        "searching" : true,
      });

      // $(".datepicker").datepicker({
      //   autoclose: true,
      //   clearBtn: false,
      //   disableTouchKeyboard: true,
      //   format: 'dd-mm-yyyy',
      //   todayBtn: false,
      //   todayHighlight: true,
      //   toggleActive: true,
      // });


      $(".datepicker").datetimepicker({
        format:'DD-MM-YYYY',
      });

      $("input.timepicker").datetimepicker({
        format: 'HH:mm',
      });

      $('.custom-file-input').change(function() {
        var file = $('.custom-file-input')[0].files[0].name;
        $(this).next('label').text(file);
      });

    });
  </script>

  <?php  if(isset($app)){ ?>
    <script src="<?=$app."?v=1.0.0";?>"></script>
    <script>
      $(document).ready(function() {
        index("<?= base_url(); ?>");
        <?php if($app == base_url()."app/tenant.js"){?>
          init_data_provinces();
        <?php } ?>
      });      
    </script>
  <?php  } ?>

  <script>
    $(document).ready(function() {
      <?php /* Select2 */ ?>
      jQuery("select.form-select").select2({
        width: '100%'
      });
    });
  </script>

  <script>
    function openModal(modalID) {
      $('.modal').css('overflow-y', 'auto');
      $('#'+modalID).modal({ backdrop: 'static', keyboard: false });
    }

    function closeModal(modalID) {
      $('.modal').css('overflow-y', 'auto');
      $("#"+modalID).modal('hide');
    }
  </script>

</body>
</html>