var base_url;
var csrf_token;
var csrf_hash;

var data_tampil_sahabat;
var urutkan_berdasar_sahabat;
var urutkan_dari_sahabat;
var pencarian_keyword_sahabat;
var halaman_sekarang_sahabat;
var halaman_maksimal_sahabat;

var data_tampil_kelompok;
var urutkan_berdasar_kelompok;
var urutkan_dari_kelompok;
var pencarian_keyword_kelompok;
var halaman_sekarang_kelompok;
var halaman_maksimal_kelompok;

var idbank;

var anggotakelompok = [];

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

    halaman_sekarang_sahabat = 1;
    halaman_maksimal_sahabat = 1;

    idbank = args_idbank;

    halaman_sekarang_kelompok = 1;
    halaman_maksimal_kelompok = 1;
    
    init_view();
    init_data();
    init_listener();
}

function init_view() {
    
}

function init_data( ) {
    $("#add-idbank-sahabat").val(idbank);
    $("#edit-idbank-sahabat").val(idbank);
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
    $("#now-pagination-sahabat").inputFilter(function(value) {
        return /^\d*$/.test(value);// Cek digits menggunakan RegExp
    });
    $("#now-pagination-sahabat").attr({"max":halaman_maksimal_sahabat, "min":1, "step":1});
    $("#now-pagination-sahabat").val(halaman_sekarang_sahabat);
    
    $("#max-pagination-sahabat").html(halaman_maksimal_sahabat);
    $("#prev-pagination-sahabat").click(function() {
        if(halaman_sekarang_sahabat-1 > 0) {
            halaman_sekarang_sahabat--;
            $("#now-pagination-sahabat").val(halaman_sekarang_sahabat);
            init_datatables();
        }
    });
    $("#next-pagination-sahabat").click(function() {       
        if(+halaman_sekarang_sahabat+1 <= halaman_maksimal_sahabat) {
            halaman_sekarang_sahabat++;
            $("#now-pagination-sahabat").val(halaman_sekarang_sahabat);
            init_datatables();
        }
    });
    $("#first-pagination-sahabat").click(function() {
        halaman_sekarang_sahabat = 1;
        $("#now-pagination-sahabat").val(1);
        init_datatables();
    });
    $("#last-pagination-sahabat").click(function() {
        halaman_sekarang_sahabat = halaman_maksimal_sahabat;
        $("#now-pagination-sahabat").val(halaman_maksimal_sahabat);
        init_datatables();
    });
    $("#now-pagination-sahabat").on("change", function() {
        if($("#now-pagination-sahabat").val() < 1) {
            $("#now-pagination-sahabat").val(1);
        }
        else if(+$("#now-pagination-sahabat").val() > halaman_maksimal_sahabat) {
            $("#now-pagination-sahabat").val(halaman_maksimal_sahabat);
        }
        halaman_sekarang_sahabat = $("#now-pagination-sahabat").val();
        init_datatables();
    });

    $("#filter-button-sahabat").click(function() {
        halaman_sekarang_sahabat = 1;
        $("#now-pagination-sahabat").val(1);
        init_datatables();
    });


    //KELOMPOK
    $("#now-pagination-kelompok").inputFilter(function(value) {
        return /^\d*$/.test(value);// Cek digits menggunakan RegExp
    });
    $("#now-pagination-kelompok").attr({"max":halaman_maksimal_kelompok, "min":1, "step":1});
    $("#now-pagination-kelompok").val(halaman_sekarang_kelompok);
    $("#max-pagination-kelompok").html(halaman_maksimal_kelompok);
    $("#prev-pagination-kelompok").click(function() {
        if(halaman_sekarang_kelompok-1 > 0) {
            halaman_sekarang_kelompok--;
            $("#now-pagination-kelompok").val(halaman_sekarang_kelompok);
            init_datatables();
        }
    });
    $("#next-pagination-kelompok").click(function() {
        if(+halaman_sekarang_kelompok+1 <= halaman_maksimal_kelompok) {
            halaman_sekarang_kelompok++;
            $("#now-pagination-kelompok").val(halaman_sekarang_kelompok);
        }
    });
    $("#first-pagination-kelompok").click(function() {
        halaman_sekarang_kelompok = 1;
        $("#now-pagination-kelompok").val(1);
    });
    $("#last-pagination-kelompok").click(function() {
        halaman_sekarang_kelompok = halaman_maksimal_kelompok;
        $("#now-pagination-kelompok").val(halaman_maksimal_kelompok);
    });
    $("#now-pagination-kelompok").on("change", function() {
        if($("#now-pagination-kelompok").val() < 1) {
            $("#now-pagination-kelompok").val(1);
        }
        else if(+$("#now-pagination-kelompok").val() > halaman_maksimal_kelompok) {
            $("#now-pagination-kelompok").val(halaman_maksimal_kelompok);
        }
        halaman_sekarang_kelompok = $("#now-pagination-kelompok").val();
        init_datatables();
    });

}

function init_datatables() {
    $("#datatables-sahabat tbody tr").remove();    
    data_tampil_sahabat = $("#filter-datatampil-sahabat").val();
    urutkan_berdasar_sahabat = $("#filter-urutkanberdasar-sahabat").val();
    urutkan_dari_sahabat = $("#filter-urutkandari-sahabat").val();
    pencarian_keyword_sahabat = $("#filter-pencariankeyword-sahabat").val();
    halaman_sekarang_sahabat = $("#now-pagination-sahabat").val();
    $.ajax({
        url: base_url+"Sahabatinfaq/get_datatables_sahabat",
        type: "POST",
        data: {
            "pencarian":pencarian_keyword_sahabat,
            "urutkan": urutkan_berdasar_sahabat,
            "order": urutkan_dari_sahabat,
            "datatampil": data_tampil_sahabat,
            "halaman_sekarang": halaman_sekarang_sahabat,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            halaman_maksimal_sahabat = Math.ceil(res.data_filtered/data_tampil_sahabat);
            $("#max-pagination-sahabat").html(halaman_maksimal_sahabat);
            $("#datatables-sahabat tbody").append(res.data);
            init_datatables_kelompok();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");
        }
    });
}

function init_datatables_kelompok() {
    //KELOMPOK
    $("#datatables-kelompok tbody tr").remove();    
    data_tampil_kelompok = $("#filter-datatampil-kelompok").val();
    urutkan_berdasar_kelompok = $("#filter-urutkanberdasar-kelompok").val();
    urutkan_dari_kelompok = $("#filter-urutkandari-kelompok").val();
    pencarian_keyword_kelompok = $("#filter-pencariankeyword-kelompok").val();
    halaman_sekarang_kelompok = $("#now-pagination-kelompok").val();
    $.ajax({
        url: base_url+"Sahabatinfaq/get_datatables_kelompok",
        type: "POST",
        data: {
            "pencarian-kelompok":pencarian_keyword_kelompok,
            "urutkan-kelompok": urutkan_berdasar_kelompok,
            "order-kelompok": urutkan_dari_kelompok,
            "datatampil-kelompok": data_tampil_kelompok,
            "halaman_sekarang-kelompok": halaman_sekarang_kelompok,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            halaman_maksimal_kelompok = Math.ceil(res.data_filtered/data_tampil_kelompok);
            $("#max-pagination-kelompok").html(halaman_maksimal_kelompok);
            $("#datatables-kelompok tbody").append(res.data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
        }
    });

}

function init_listener() {

    $("#tambah-button-sahabat").click(function() {
        open_tambah_modal();
    });

    $("#add-simpan-sahabat").click(function() {
        tambah();
    });

    $("#edit-simpan-sahabat").click(function() {
        ubah();
    });


    $("#tambah-button-kelompok").click(function() {
        open_tambah_kelompok_modal();
    });

    $("#tambah-pinjaman-anggotakelompok").change(function(){
        init_kelompok_jumlahcicilan();
    });

    $("#add-simpan-kelompok").click(function(){
        tambah_kelompok();
    });

    // $("#tambah-button-anggotakelompok").click(function() {
    //     tambah_kelompokanggota_table();
    // });

    $("#tambah-tipebank-anggotakelompok").click(function(){
        $("#tambah-namabanklabel-anggotakelompok").show();
        $("#tambah-namabank-anggotakelompok").show();
    });
    $("#tambah-tipetunai-anggotakelompok").click(function(){        
        $("#tambah-namabanklabel-anggotakelompok").hide();
        $("#tambah-namabank-anggotakelompok").hide();
    });

}


function init_data_lihat(id) {
    $.ajax({
        url: base_url+"Sahabatinfaq/get_sahabatinfaq_by_id",
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $("#lihat-id-sahabat").val(res.data[0]["id"]);
            $("#lihat-idbank-sahabat").val(res.data[0]["idbank"]);
            $("#lihat-nik-sahabat").val(res.data[0]["nik"]);
            $("#lihat-statussahabat-sahabat").val(res.data[0]["statussahabat"]);
            $("#lihat-nama-sahabat").val(res.data[0]["nama"]);
            $("#lihat-jeniskelamin-sahabat").val(res.data[0]["jeniskelamin"]);
            $("#lihat-nohp-sahabat").val(res.data[0]["nohp"]);
            $("#lihat-profesi-sahabat").val(res.data[0]["profesi"]);
            $("#lihat-statuspendidikan-sahabat").val(res.data[0]["statuspendidikan"]);
            $("#lihat-tenagakerja-sahabat").val(res.data[0]["tenagakerja"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function init_data_ubah(id) {
    $.ajax({
        url: base_url+"Sahabatinfaq/get_sahabatinfaq_by_id",
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            $("#edit-id-sahabat").val(res.data[0]["id"]);
            $("#edit-idbank-sahabat").val(res.data[0]["idbank"]);
            $("#edit-nik-sahabat").val(res.data[0]["nik"]);
            $("#edit-statussahabat-sahabat").val(res.data[0]["statussahabat"]);
            $("#edit-nama-sahabat").val(res.data[0]["nama"]);
            $('input[name="edit-jeniskelamin-sahabat"][value="' + res.data[0]["jeniskelamin"] + '"]').prop('checked', true);
            $("#edit-nohp-sahabat").val(res.data[0]["nohp"]);
            $("#edit-profesi-sahabat").val(res.data[0]["profesi"]);
            $("#edit-statuspendidikan-sahabat").val(res.data[0]["statuspendidikan"]);
            $("#edit-tenagakerja-sahabat").val(res.data[0]["tenagakerja"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function open_lihat_modal(id) {
    $('#form-lihat-sahabat')[0].reset();
    $('#modal-lihat-sahabat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Lihat Data');
    init_data_lihat(id);
}

function open_tambah_modal() {
    $('#form-tambah-sahabat')[0].reset();
    $('#modal-tambah-sahabat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
}

function open_ubah_modal(id) {
    $('#form-ubah-sahabat')[0].reset();
    $('#modal-ubah-sahabat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Ubah Data');
    init_data_ubah(id);
}

function tambah() {
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    var form = $("#form-tambah-sahabat")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    $.ajax({
        url: base_url+"Sahabatinfaq/add",
        type: "POST",
        data: data,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            if(res.status == 200){
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('.modal-title').text('Form Tambah Data');
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-tambah-sahabat').modal('hide');  
                location.reload();
            }
            else{
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");      
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text("Terjadi Kesalahan");
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
           location.reload();
        }
    });
}

function ubah() {
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    var form = $("#form-ubah-sahabat")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    $.ajax({
        url: base_url+"Sahabatinfaq/edit",
        type: "POST",
        data: data,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            if(res.status == 200){
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('.modal-title').text('Form Ubah Data');
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-ubah-sahabat').modal('hide');
                location.reload();
            }
            else{
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("Terjadi Kesalahan");            
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text("Terjadi Kesalahan");
            location.reload();
        }
    });
}


// KELOMPOK //
function open_tambah_kelompok_modal() {
    $('#form-tambah-kelompok')[0].reset();
    $("#datatables-tambah-anggotakelompok tbody tr").remove();
    $("#datatables-pilih-anggotakelompok tbody tr").remove();
    $("#tambah-listanggota-anggotakelompok").empty();
    $('#modal-tambah-kelompok').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
}


function init_kelompok_jumlahcicilan(){   
    
        if($('#tambah-pinjaman-anggotakelompok').val() == 500000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="10000">Rp. 10.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="12500">Rp. 12.500</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="20000">Rp. 20.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="25000">Rp. 25.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="50000">Rp. 50.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
        }
        else if ($('#tambah-pinjaman-anggotakelompok').val() == 1000000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="20000">Rp. 20.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="25000">Rp. 25.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="40000">Rp. 40.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="50000">Rp. 50.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 1500000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="30000">Rp. 30.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="50000">Rp. 50.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="60000">Rp. 60.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="75000">Rp. 75.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="150000">Rp. 150.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="300000">Rp. 300.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 2000000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="40000">Rp. 40.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="50000">Rp. 50.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="80000">Rp. 80.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="400000">Rp. 400.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 2500000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="50000">Rp. 50.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="125000">Rp. 125.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="250000">Rp. 250.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="500000">Rp. 500.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 3000000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="60000">Rp. 60.000</option>');//50
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="75000">Rp. 75.000</option>');//40
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');//30
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="120000">Rp. 120.000</option>');//
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="150000">Rp. 150.000</option>');//
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');//
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="300000">Rp. 300.000</option>');//
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="600000">Rp. 600.000</option>');//
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 3500000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="70000">Rp. 70.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="140000">Rp. 140.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="175000">Rp. 175.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="350000">Rp. 350.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="700000">Rp. 700.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 4000000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="80000">Rp. 80.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="160000">Rp. 160.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="400000">Rp. 400.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="800000">Rp. 800.000</option>');
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 4500000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="90000">Rp. 90.000</option>');//50
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');//45
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="150000">Rp. 150.000</option>');//30
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="180000">Rp. 180.000</option>');//25
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="225000">Rp. 225.000</option>');//20
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="300000">Rp. 300.000</option>');//15
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="450000">Rp. 450.000</option>');//10
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="900000">Rp. 900.000</option>');//5
        }else if ($('#tambah-pinjaman-anggotakelompok').val() == 5000000){
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="125000">Rp. 125.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="250000">Rp. 250.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="500000">Rp. 500.000</option>');
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="1000000">Rp. 1.000.000</option>');
        }
        else if ($('#tambah-pinjaman-anggotakelompok').val() > 5000000){
            var i;
            var nominal = $('#tambah-pinjaman-anggotakelompok').val();
            $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            for(i = 50; i >= 5; i-=5){
                if(nominal%i == 0){
                    var value = nominal/i;
                    if(value%5000 == 0){
                        $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="'+value+'">Rp.'+numberWithCommas(value)+'</option>');
                    }                    
                }
            }
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').empty();
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="100000">Rp. 100.000</option>');
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="125000">Rp. 125.000</option>');
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="200000">Rp. 200.000</option>');
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="250000">Rp. 250.000</option>');
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="500000">Rp. 500.000</option>');
            // $('select[name="tambah-jumlahcicilan-anggotakelompok"').append('<option value="1100000">Rp. 1.100.000</option>');
        }
        init_kelomopokanggota_by_pinjaman();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function init_kelomopokanggota_by_pinjaman(){
    var bmpa = $('#tambah-pinjaman-anggotakelompok').val();
    $("#datatables-pilih-anggotakelompok tbody tr").remove();
    $.ajax({
        url: base_url+"Sahabatinfaq/get_tablekelompok_by_pinjaman",
        type: "POST",
        data: {
            "bmpa":bmpa,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            // halaman_maksimal = Math.ceil(res.data_filtered/data_tampil);
            // $("#max-pagination-kelompok").html(halaman_maksimal);
            $("#datatables-pilih-anggotakelompok tbody").append(res.data);
            // $('#datatables-pilih-anggotakelompok').DataTable({
            //     "processing": true,
            //     "serverSide": false,
                
            // });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
        }
    });
}

function tambah_kelompokanggota_table(id, nik, nama, bmpa){
    $("#tambah-listanggota-anggotakelompok").append('<input type="hidden" class="form-control" placeholder="Titel" name="tambah-anggotakelompok-anggotakelompok[idsahabat]['+id+']" value="'+id+'">');
    $("#tambah-kelompokanggota-row-"+id).remove();
    var row_open = "<tr id='tambah-row-listanggota-"+id+"'>";
    var kolom1 = '<th scope="row">'+'<a onclick="hapus_kelompokanggota_table(\''+id+'\')" href="#" class="mt-1 mb-1 btn btn-sm btn-icon icon-center btn-danger"><i class="fas fa-backspace"></i> </a>'+'</th>';
    var kolom2 = '<td style="display:none;" id="tambah-nik-listanggota-'+id+'">'+nik+'</td>';
    var kolom3 = '<td id="tambah-nama-listanggota-'+id+'">'+nama+'</td>';
    var kolom4 = '<td id="tambah-bmpa-listanggota-'+id+'">'+bmpa+'</td>';
    var row_close = "</tr>";
    var row = row_open+kolom1+kolom2+kolom3+kolom4+row_close;    
    $("#datatables-tambah-anggotakelompok tbody").append(row);

    

}

function hapus_kelompokanggota_table(id){
    var nik = $("#tambah-nik-listanggota-"+id).text();
    var nama = $("#tambah-nama-listanggota-"+id).text();
    var bmpa = $("#tambah-bmpa-listanggota-"+id).text();
    // var kelompok_anggota = "<option value='"+id+"'>" + kelompokanggota_nik+" - "+kelompokanggota_nama+ " - " +kelompokanggota_bmpa + "<option>";
    // $("#tambah-anggota-anggotakelompok").append(kelompok_anggota).trigger("change");
    var row_open = '<tr id="tambah-kelompokanggota-row-'+id+'">';
    var kolom1 = '<th scope="row">' +'<a onclick="tambah_kelompokanggota_table(\''+id+'\', \''+nik+'\', \''+nama+'\', \''+bmpa+'\')" href="#" class="mr-1 mb-1 mt-1 btn btn-sm btn-icon icon-center btn-primary" ><i class="fas fa-plus-circle"></i> </a>'+'</th>';
    var kolom2 = '<td style="display:none;">'+nik+'</td>';
    var kolom3 = '<td>'+nama+'</td>';
    var kolom4 = '<td>'+bmpa+'</td>';
    var row_close = "</tr>";
    var row = row_open+kolom1+kolom2+kolom3+kolom4+row_close;    
    $("#datatables-pilih-anggotakelompok tbody").append(row);
    $("input[name='tambah-anggotakelompok-anggotakelompok[idsahabat]["+id+"]']").remove();
    $("#tambah-row-listanggota-"+id).remove();

}


function tambah_kelompok() {
    $jumlahcalonanggota = $("#datatables-tambah-anggotakelompok tbody tr").length;
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    if($jumlahcalonanggota >= 5){
        var form = $("#form-tambah-kelompok")[0];
        var data = new FormData(form);
        data.append(csrf_token, csrf_hash);
        $.ajax({
            url: base_url+"Sahabatinfaq/add_kelompok",
            type: "POST",
            data: data,
            dataType: "JSON",
            processData: false,
            contentType: false,
            success: function (res) {
                csrf_token = res.csrf_token;
                csrf_hash = res.csrf_hash;
                console.log("INI RES : "+res.data);
                if(res.status == 200){
                    init_datatables();
                    $('.modal-title').text('Form Tambah Data');
                    $('#pesan-tipe').addClass("alert-success");
                    $('#pesan-title').text('Pesan');
                    $('#pesan-content').text(res.message);                    
                    $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                    $('#modal-tambah-kelompok').modal('hide'); 
                    // location.reload();
                }
                else{
                    $('#pesan-tipe').addClass("alert-danger");
                    $('#pesan-title').text('Pesan');
                    $('#pesan-content').text(res.message);
                    $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text("Terjadi Kesalahan");
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            //    location.reload();
            }
        });
    }
    else {
        $('#pesan-tipe').addClass("alert-danger");
        $('#pesan-title').text('Jumlah Anggota Minimal 5.');
        $('#pesan-content').text("");
        $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
    }
}