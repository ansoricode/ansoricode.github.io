var base_url;
var csrf_token;
var csrf_hash;

var data_tampil;
var urutkan_berdasar;
var urutkan_dari;
var pencarian_keyword;
var halaman_sekarang;
var halaman_maksimal;

var url_datatables;
var url_add;
var url_edit;
var url_delete;
var url_saldo;
var url_data;
var url_koreksi;
var url_approval;

var idbank;

function index(
    args_base_url,
    args_csrf_token,
    args_csrf_hash,
    args_halaman_sekarang,
    args_halaman_maksimal,
    args_idbank
) {
    base_url = args_base_url;
    csrf_token = args_csrf_token;
    csrf_hash = args_csrf_hash;

    url_datatables = base_url + "Laporankeuangan/get_datatables_adjustmentbank";
    url_add = base_url + "Laporankeuangan/add_adjustmentbank";
    url_saldo = base_url + "Transaksi/get_saldo";
    url_data = base_url + "Laporankeuangan/get_adjustmentbank";
    url_koreksi = base_url + "Transaksi/koreksi";

    halaman_sekarang = 1;
    halaman_maksimal = 1;

    idbank = args_idbank;

    init_view();
    init_data();
    init_listener();
}

function init_view() {
    
}

function init_data( ) {
    init_pagination();    
    init_datatables();
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
            init_datatables();
        }
    });
    $("#next-pagination").click(function() {       
        if(+halaman_sekarang+1 <= halaman_maksimal) {
            halaman_sekarang++;
            $("#now-pagination").val(halaman_sekarang);
            init_datatables();
        }
    });
    $("#first-pagination").click(function() {
        halaman_sekarang = 1;
        $("#now-pagination").val(1);
        init_datatables();
    });
    $("#last-pagination").click(function() {
        halaman_sekarang = halaman_maksimal;
        $("#now-pagination").val(halaman_maksimal);
        init_datatables();
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

    var idbank = $("input[name='add-idbank']").val();
    var tipe  = $("input[name='add-tipe']").val();
    var jenistransaksi  = $("input[name='add-jenistransaksi']").val();

    $.ajax({
        url: url_datatables,
        type: "POST",
        data: {
            "pencarian":pencarian_keyword,
            "urutkan": urutkan_berdasar,
            "order": urutkan_dari,
            "datatampil": data_tampil,
            "halaman_sekarang": halaman_sekarang,
            "idbank": idbank,
            "tipe": tipe,
            "jenistransaksi": jenistransaksi,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            halaman_maksimal = Math.ceil(res.data_filtered/data_tampil);
            $("#max-pagination").html(halaman_maksimal);
            $("#datatables tbody").append(res.data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function init_listener(){
    $("#add-button").click(function() {
        tambah();
    });
    $("#modal-tambah-button").click(function() {
        open_tambah_modal();
    });
    $("#koreksi-button").click(function() {
        koreksi();
    });
}

function open_lihat_modal(id){
    $.ajax({
        url: url_data,
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res.data);
            $("input[name='see-idtransaksi'").val(res.data[0].idtransaksi);
            $("input[name='see-tanggal'").val(res.data[0].tanggal);
            if(res.data[0]['jenis'] == "debit"){
                $("input[name='see-uraian'").val("Pendapatan");
            }
            else if(res.data[0]['jenis'] == "kredit"){
                $("input[name='see-uraian'").val("Biaya");
            }
            
            $("input[name='see-jumlah']").val("Rp."+numberWithCommas(res.data[0].jumlah));
            $("input[name='see-keterangan'").val(res.data[0].keterangan);
            if(res.data[0].tipe == "bank"){
                $("input[name='see-namabank'").val(res.data[0].namabank);
            }
            $("input[name='approval-tipetransaksi']").val(res.data[0].tipe);
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $('#modal-approval').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Koreksi Data');            
            url_approval = base_url + "Transaksi/approve_infaqdaribankinfaqlain";
            $("#approval-button").click(function() {
                approval();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function open_approve_modal(id){
    $.ajax({
        url: url_data,
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res.data);
            $("input[name='approval-idtransaksi'").val(res.data[0].id);
            $("input[name='approval-jumlahtransaksi']").val(res.data[0].jumlah);
            // $("input[name='approval-tipetransaksi']").val(res.data[0].tipe);
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $('#modal-approval').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Koreksi Data');            
            url_approval = base_url + "Transaksi/approve_infaqdaribankinfaqlain";
            $("#approval-button").click(function() {
                approval();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function approval(){
    var url;
    var data;
    $('.btn-submit').text('Proses...');
    $('.btn-submit').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-danger");
    $('#pesan-tipe').removeClass("alert-success");
    var form = $("#approval-form")[0];
    data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    url = url_approval;
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
            $('#modal-approval').modal('hide');
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false }); 
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text(errorThrown);
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
            $('#modal-approval').modal('hide');
        }
    });
}

function open_koreksi_modal(id){
    $.ajax({
        url: url_data,
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            $("input[name='koreksi-id'").val(res.data[0].id);
            $("input[name='koreksi-jenis']").val(res.data[0].jenis);
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $('#modal-koreksi').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Koreksi Data');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function koreksi() {
    var url;
    var data;
    $('.btn-submit').text('Proses...');
    $('.btn-submit').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-danger");
    $('#pesan-tipe').removeClass("alert-success");
    var form = $("#koreksi-form")[0];
    data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    url = url_koreksi;
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
            $('#modal-koreksi').modal('hide');
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false }); 
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text(errorThrown);
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
            $('#modal-koreksi').modal('hide');
        }
    });
}

function init_tambah_modal(){
    var idbank = $("input[name='add-idbank']").val();
    var tipe  = $("input[name='add-tipe']").val();
    var jenistransaksi  = $("input[name='add-jenistransaksi']").val();
    $("#add-saldo").html("");
    $.ajax({
        url: url_saldo,
        type: "POST",
        data: {
            "add-idbank": idbank,
            "add-tipe": tipe,
            "add-jenistransaksi": jenistransaksi,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $("#add-saldo").html(res.data.pesan + "Rp."+ numberWithCommas(res.data.saldo));
            $('#add-form')[0].reset();
            $('#modal-tambah').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Tambah Data');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function open_tambah_modal() {
    var page = $("input[name='add-page'").val();
    var jenistransaksi  = $("input[name='add-jenistransaksi']").val();
    $('#add-form')[0].reset();
    $('#modal-tambah').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
}


function tambah(){
    var url;
    var data;
    $('.btn-submit').text('Proses...');
    $('.btn-submit').attr('disabled', true);
    $('#pesan-tipe').removeClass("alert-danger");
    $('#pesan-tipe').removeClass("alert-success");
    var form = $("#add-form")[0];
    data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    url = url_add;
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function (res) {
            // console.log(res);
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
            $('#modal-tambah').modal('hide');
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false }); 
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text(errorThrown);
            $('.btn-submit').text('Simpan');
            $('.btn-submit').attr('disabled', false);
            $('#modal-tambah').modal('hide');
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}