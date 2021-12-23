var base_url;
var url_add;
var url_edit;
var url_delete;
var url_getdata;
var url_getbank;

var save_method;

var csrf_token;
var csrf_hash;

var data_tampil;
var urutkan_berdasar;
var urutkan_dari;
var pencarian_keyword;
var halaman_sekarang;
var halaman_maksimal;

function index(
    args_base_url,
    args_csrf_token,
    args_csrf_hash,
    args_halaman_sekarang,
    args_halaman_maksimal
) {
    base_url = args_base_url;
    url_datatables = base_url+"Profesi/get_datatables";
    url_add = base_url+"Profesi/add";
    url_edit = base_url+"Profesi/edit";
    url_delete = base_url+"Profesi/delete";
    url_getdata = base_url+"Profesi/get_data";

    csrf_token = args_csrf_token;
    csrf_hash = args_csrf_hash;
    
    halaman_sekarang = 1;
    halaman_maksimal = 1;
    
    init_view();
    init_data();
    init_listener();
}

function init_view() {    
    init_pagination();    
}

function init_data( ) {
    init_datatables();
}


function init_listener() {
    $('#add-modal-button').click(function() {
        open_modal_tambah();
    });
    $('#add-button').click(function() {
        simpan();
    });
    $('#edit-button').click(function() {
        simpan();
    });
    $('#delete-button').click(function() {
        hapus();
    });
    $("#filter-button").click(function() {
        halaman_sekarang = 1;
        $("#now-pagination").val(1);
        init_datatables();
    });
}

function init_pagination() {
    //Fungsi Mencegah Input Selain Angka//
    (function($) {
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } 
                else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } 
                else {
                    this.value = "";
                }
            });
        };
    }(jQuery));
    $("#now-pagination").inputFilter(function(value) {
        return /^\d*$/.test(value);// Cek digits menggunakan RegExp
    });
    $("#now-pagination").attr({"max":halaman_maksimal, "min":1, "step":1});
    $("#now-pagination").val(halaman_sekarang);
    $("#max-pagination").html(halaman_maksimal);
    $("#prev-pagination").click(function() {
        if(halaman_sekarang-1 > 0) {
            halaman_sekarang--;
            $("#now-pagination").val(halaman_sekarang);
            init_table_data();
        }
    });
    $("#next-pagination").click(function() {
        if(+halaman_sekarang+1 <= halaman_maksimal) {
            halaman_sekarang++;
            $("#now-pagination").val(halaman_sekarang);
        }
    });
    $("#first-pagination").click(function() {
        halaman_sekarang = 1;
        $("#now-pagination").val(1);
    });
    $("#last-pagination").click(function() {
        halaman_sekarang = halaman_maksimal;
        $("#now-pagination").val(halaman_maksimal);
    });
    $("#now-pagination").on("change", function() {
        if($("#now-pagination").val() < 1) {
            $("#now-pagination").val(1);
        }
        else if(+$("#now-pagination").val() > halaman_maksimal) {
            $("#now-pagination").val(halaman_maksimal);
        }
        halaman_sekarang = $("#now-pagination").val();
        init_datatables();
    });
}

function init_datatables() {
    $("#datatables tbody tr").remove();    
    data_tampil = $("#filter-datatampil").val();
    urutkan_berdasar = $("#filter-urutkanberdasar").val();
    urutkan_dari = $("#filter-urutkandari").val();
    pencarian_keyword = $("#filter-pencariankeyword").val();
    $.ajax({
        url: url_datatables,
        type: "POST",
        data: {
            "pencarian":pencarian_keyword,
            "urutkan": urutkan_berdasar,
            "order": urutkan_dari,
            "datatampil": data_tampil,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            halaman_maksimal = Math.ceil(res.data_filtered/data_tampil);
            $("#max-pagination").html(halaman_maksimal);
            console.log(res.data_total);
            for(i = 0; i < res.data.length; i++) {
                $("#datatables tbody").append(res.data[i]);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
        }
    });
}


function open_modal_tambah() {
    save_method = 'add';
    $('#add-form')[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#modal-add').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah');     
}

function open_modal_edit(id) {
    save_method = 'edit';
    $('#edit-form')[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger"); 
    $.ajax({
        url: url_getdata,
        type: "POST",
        dataType: "JSON",
        data: {
            'id': id,
            [csrf_token]: csrf_hash,
        },
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $('[name="edit-id"]').val(res.data[0].id);
            $('[name="edit-nama"]').val(res.data[0].nama);
            $("#proses-button").show();
            $('#modal-edit').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Edit');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text(errorThrown);
        }
    });    
}

function open_modal_delete(id) {
    save_method = 'delete';
    $('#delete-form')[0].reset();    
    $('[name="delete-id"]').val(id);
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    $('#modal-hapus').modal({ backdrop: 'static', keyboard: false });
}

function open_modal_lihat(id) {
    save_method = 'see';
    $('#see-form')[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#modal-see').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Lihat Data');
    //INIT DATA
    $.ajax({
        url: url_getdata,
        type: "POST",
        dataType: "JSON",
        data: {
            'id': id,
            [csrf_token]: csrf_hash,
        },
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $('[name="see-id"]').val(res.data[0].id);
            $('[name="see-nama"]').val(res.data[0].nama);
            $("#proses-button").show();
            $('#modal-see').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Lihat Data');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text(errorThrown);
        }
    });
    //END INIT DATA
}

function simpan() {
    var url;
    var data;
    if(save_method == "add"){
        var form = $("#add-form")[0];
        data = new FormData(form);
        data.append(csrf_token, csrf_hash);
        url = url_add;
    }
    else{
        var form = $("#edit-form")[0];
        data = new FormData(form);
        data.append(csrf_token, csrf_hash);
        url = url_edit;
    }
    $('.btn-submit').text('Proses...');
    $('.btn-submit').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.status == 200) {
                csrf_token = res.csrf_token;
                csrf_hash = res.csrf_hash;
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text(res.message);                
                $('#modal-'+save_method).modal('hide');
            }
            else {
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text(res.message);
            }            
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false }); 
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text("Terjadi Kesalahan");
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
            $('#modal-'+save_method).modal('hide');
        }
    });
}

function hapus() {
    var form = $("#delete-form")[0];
    data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    url = url_delete;
    $('#delete-button').text('Hapus');
    $('#delete-button').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.status == 200) {
                csrf_token = res.csrf_token;
                csrf_hash = res.csrf_hash;
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text(res.message);                
                $('#modal-hapus').modal('hide');
            }
            else {
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text(res.message);
            }            
            $('#delete-button').text('Hapus');
            $('#delete-button').attr('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false }); 
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text("Terjadi Kesalahan");
            $('#delete-button').text('Hapus');
            $('#delete-button').attr('disabled', false);
            $('#modal-hapus').modal('hide');
        }
    });
}