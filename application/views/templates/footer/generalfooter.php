    </div>
    <!-- EDN App -->

  <?php /* General JS Scripts */ ?>
  <script src="<?=base_url();?>assets/admin/modules/jquery.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/popper.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/bootstrap/js/bootstrap.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/nicescroll/jquery.nicescroll.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/moment.min.js"></script>
  <script src="<?=base_url();?>assets/admin/js/stisla.js"></script> 

  <?php /* JS Libraies */ ?>
  <script src="<?=base_url();?>assets/admin/modules/jquery-sparkline/jquery.sparkline.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/chart.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/owlcarousel2/dist/owl.carousel.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/summernote/dist/summernote-bs4.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/chocolat/dist/js/jquery.chocolat.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/datatables/datatables.min.js"></script>
  <script src="<?=base_url();?>assets/admin/modules/select2/select2.min.js" type="text/javascript"></script>
  
  <script src="<?=base_url();?>assets/admin/modules/autonumeric/autoNumeric.js" type="text/javascript"></script>

  <?php /* Template JS File */ ?>
  <script src="<?=base_url();?>assets/admin/js/scripts.js"></script>
  <script src="<?=base_url();?>assets/admin/js/custom.js"></script>


  <script>
    $(document).ready(function() {

      <?php /* Select2 */ ?>
      jQuery("select.form-select").select2({
        width: '100%'
      });
      
    });      
  </script>


</body>
</html>