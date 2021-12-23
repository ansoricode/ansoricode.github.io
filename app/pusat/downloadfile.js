var base_url;
var url_add;
var url_edit;
var url_delete;
var url_getdata;

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
    url_datatables = base_url+"Downloadfile/get_datatables";
    url_add = base_url+"Downloadfile/add";
    url_edit = base_url+"Downloadfile/edit";
    url_delete = base_url+"Downloadfile/delete";
    url_getdata = base_url+"Downloadfile/get_data";

    csrf_token = args_csrf_token;
    csrf_hash = args_csrf_hash;
    
    halaman_sekarang = args_halaman_sekarang;
    halaman_maksimal = args_halaman_maksimal;
    
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
    $("#filter-button").click(function() {
        halaman_sekarang = 1;
        $("#now-pagination").val(1);
        init_datatables();
    });
}

function init_datatables() {
    $("#datatables tbody tr").remove();    
    data_tampil = $("#filter-datatampil").val();
    urutkan_berdasar = $("#filter-urutkanberdasar").val();
    urutkan_dari = $("#filter-urutkandari").val();
    pencarian_keyword = $("#filter-pencariankeyword").val();
    halaman_sekarang = $("#now-pagination").val();
    $.ajax({
        url: url_datatables,
        type: "POST",
        data: {
            "pencarian":pencarian_keyword,
            "urutkan": urutkan_berdasar,
            "order": urutkan_dari,
            "datatampil": data_tampil,
            "halaman_sekarang": halaman_sekarang,
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
    document.getElementById("add-filelabel").innerHTML = "";
    $('#modal-add').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah');     
}

function open_modal_ubah(id) {
    save_method = 'edit';
    $('#edit-form')[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    document.getElementById("edit-filelabel").innerHTML = "";
    $.ajax({
        url: url_getdata,
        type: "POST",
        dataType: "JSON",
        data: {
            'id': id
        },
        success: function (data) {
            $('[name="edit-id"]').val(data.data.id);
            $('[name="edit-nama"]').val(data.data.nama);
            $('[name="edit-tipebank"]').val(data.data.tipebank);
            $('#modal-edit').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Edit');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('#pesan-title').text("Terjadi Kesalahan");
        }
    });
}

function open_modal_hapus(id) {
    save_method = 'delete';
    $('#hapus-form')[0].reset();
    $('[name="delete-id"]').val(id);
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#modal-delete').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Hapus');
}

function simpan() {
    var url;
    var data;
    $('.btn-submit').text('Proses...');
    $('.btn-submit').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-danger");
    $('#pesan-tipe').removeClass("alert-danger");
    if (save_method == 'add') {
        var form = $("#add-form")[0];
        var files = $('#add-file')[0].files;
        data = new FormData(form);
        data.append(csrf_token, csrf_hash);
        data.append('file', files[0]);
        url = url_add;
    } else {
        var form = $("#edit-form")[0];
        var files = $('#edit-file')[0].files;
        data = new FormData(form);
        data.append(csrf_token, csrf_hash);
        data.append('file', files[0]);
        url = url_edit;
    }
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                csrf_token = res.csrf_token;
                csrf_hash = res.csrf_hash;
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text(res.message);
            }
            else {
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text(res.message);
            }
            $('#modal-'+save_method).modal('hide');
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
    var id = $('[name="delete-id"]').val();      
    $('#pesan-tipe').removeClass("alert-danger");
    $('#pesan-tipe').removeClass("alert-danger");
    $('#delete-button').text('Proses...');
    $('#delete-button').attr('disabled', true);
    $.ajax({
        url: url_delete,
        type: "POST",
        dataType: "JSON",
        data: {
            'delete-id': id
        },
        success: function (res) {
            if(res.status == 200){
                $('#delete-button').text('Hapus');
                $('#delete-button').attr('disabled', false);
                init_datatables();
                $('#modal-delete').modal('hide');
            }
            else {
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text(res.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting data');
        }
    });
}
