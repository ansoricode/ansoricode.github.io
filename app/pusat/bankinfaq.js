var base_url;
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
    csrf_token = args_csrf_token;
    csrf_hash = args_csrf_hash;
    halaman_sekarang = args_halaman_sekarang;
    halaman_maksimal = args_halaman_maksimal;
    init_view();
    init_data();
    init_listener();
}

function init_view() {
    $("#selanjutnya1").hide();
    $("#add-kotakab-formgroup").hide();
    $("#add-kecamatan-formgroup").hide();
    $("#add-kelurahan-formgroup").hide();
    $("#pane3").css({"display":"none"});
    $("#pane2").css({"display":"none"});
    $("#pane1").show({"display":"block"});
    $("#labelpane3").removeClass("wizard-step-active");
    $("#labelpane2").removeClass("wizard-step-active");
    $("#labelpane1").addClass("wizard-step-active");
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
        url: base_url+"Bankinfaq/get_datatables",
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
            $("#datatables tbody").append(res.data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
        }
    });
}

function init_data_add_provinsi() {
    $.ajax({
        url: base_url+"Alamat/provinsi",
        type: "POST",
        data: {[csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#add-provinsi").empty();
            $("#add-provinsi").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#add-provinsi").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function init_data_add_kotakab() {
    provinsi = $("#add-provinsi").val();
    $.ajax({
        url: base_url+"Alamat/kotakab",
        type: "POST",
        data: {"provinsi": provinsi, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#add-kotakab").empty();
            $("#add-kotakab").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#add-kotakab").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function init_data_add_kecamatan() {
    kotakab = $("#add-kotakab").val();
    $.ajax({
        url: base_url+"Alamat/kecamatan",
        type: "POST",
        data: {"kotakab": kotakab, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#add-kecamatan").empty();
            $("#add-kecamatan").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#add-kecamatan").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}


function init_data_add_kelurahan() {
    kecamatan = $("#add-kecamatan").val();
    $.ajax({
        url: base_url+"Alamat/kelurahan",
        type: "POST",
        data: {"kecamatan": kecamatan, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#add-kelurahan").empty();
            $("#add-kelurahan").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#add-kelurahan").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}



function init_data_bankinfaqlain() {
    $.ajax({
        url: base_url+"Bankinfaq/get_bank_infaq_all",
        type: "POST",
        data: {[csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#add-bankinfaqlain").empty();
            $("#add-bankinfaqlain").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#add-bankinfaqlain").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["kodebank"] + " - " + res.data[i]["nama"] + "</option>" );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}


function init_listener() {

    $("#tambah-button").click(function() {
        open_tambah_modal();
    });

    $("#selanjutnya1").click(function() {
        $("#pane1").css({"display":"none"});
        $("#pane2").show({"display":"block"});
        $("#labelpane1").removeClass("wizard-step-active");
        $("#labelpane2").addClass("wizard-step-active");
    });
    $("#sebelumnya2").click(function() {
        $("#pane2").css({"display":"none"});
        $("#pane1").show({"display":"block"});
        $("#labelpane2").removeClass("wizard-step-active");
        $("#labelpane1").addClass("wizard-step-active");
    });
    $("#selanjutnya2").click(function() {
        $("#pane2").css({"display":"none"});
        $("#pane3").show({"display":"block"});
        $("#labelpane2").removeClass("wizard-step-active");
        $("#labelpane3").addClass("wizard-step-active");
        init_data_bankinfaqlain();
    });
    $("#sebelumnya3").click(function() {
        $("#pane3").css({"display":"none"});
        $("#pane2").show({"display":"block"});
        $("#labelpane3").removeClass("wizard-step-active");
        $("#labelpane2").addClass("wizard-step-active");
    });
    $("#selanjutnya3").click(function() {
        $("#sebelumnya3").css({"display":"none"});
        tambah();
    });
    $("#add-provinsi").change(function() {
        if($("#add-provinsi").val() != "") {
            $("#add-kotakab-formgroup").show();
            init_data_add_kotakab();
        }
    });
    $("#add-kotakab").change(function() {
        if($("#add-kotakab").val() != "") {
            $("#add-kecamatan-formgroup").show();
            init_data_add_kecamatan();
        }
    });
    $("#add-kecamatan").change(function() {
        if($("#add-kecamatan").val() != "") {
            $("#add-kelurahan-formgroup").show();
            init_data_add_kelurahan();
        }
    });
    $("#add-kelurahan").change(function() {
        if($("#add-kelurahan").val() != "") {
            $("#selanjutnya1").show();
        }
    });

    $("#add-tipebank-infaqbankinfaqlain").click(function() {
        $("#add-namabanklabel-infaqbankinfaqlain").show();
        $("#add-namabank-infaqbankinfaqlain").show();
    });
    $("#add-tipetunai-infaqbankinfaqlain").click(function() {
        $("#add-namabanklabel-infaqbankinfaqlain").hide();
        $("#add-namabank-infaqbankinfaqlain").hide();
    });
    $("#add-tipebank-infaqbaru").click(function(){
        $("#add-namabanklabel-infaqbaru").show();
        $("#add-namabank-infaqbaru").show();
    });
    $("#add-tipetunai-infaqbaru").click(function(){
        $("#add-namabanklabel-infaqbaru").hide();
        $("#add-namabank-infaqbaru").hide();
    });

    $("#ubah-provinsi").change(function() {
        if($("#ubah-provinsi").val() != "") {
            $("#ubah-kotakab-formgroup").show();
            init_data_ubah_kotakab();
        }
    });
    $("#ubah-kotakab").change(function() {
        if($("#ubah-kotakab").val() != "") {
            $("#ubah-kecamatan-formgroup").show();
            init_data_ubah_kecamatan();
        }
    });
    $("#ubah-kecamatan").change(function() {
        if($("#ubah-kecamatan").val() != "") {
            $("#ubah-kelurahan-formgroup").show();
            init_data_ubah_kelurahan();
        }
    });

    $("#ubah-simpan").click(function() {
        ubah();
    });

    $("#add-tipeumkmradiobutton").click(function() {
        $("#add-minpinjaman").val('500000');
        $("#add-minpinjaman").prop("disabled", false);
    });
    $("#add-tipeproradiobutton").click(function() {
        $("#add-minpinjaman").val('1000000');
        $("#add-minpinjaman").prop("disabled", true);
    });

}


function open_tambah_modal() {
    $('#form-tambah')[0].reset();    
    init_view();
    $('#modal-tambah').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
    init_data_add_provinsi();
}

function tambah() {
    // var data = $("#form-tambah").serialize() + "&"+[csrf_token]+"="+csrf_hash;
    // var data = $("#form-tambah").serializeArray();
    // data.push({name: csrf_token, value: csrf_hash});
    $('#pesan-tipe').removeClass("alert-success");
    $('#pesan-tipe').removeClass("alert-danger");
    var form = $("#form-tambah")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    console.log(data);
    $.ajax({
        url: base_url+"Bankinfaq/add",
        type: "POST",
        data: data,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            if(res.status == 200){
                console.log(res); 
                init_datatables();
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
                $('.modal-title').text('Form Tambah Data');
                $('#pesan-tipe').addClass("alert-success");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-tambah').modal('hide');  
                $("#sebelumnya3").show();
                $("#pane3").css({"display":"none"});
                $("#pane1").show({"display":"block"});
                $("#labelpane3").removeClass("wizard-step-active");
                $("#labelpane1").addClass("wizard-step-active");
            }
            else{
                $('#pesan-tipe').addClass("alert-danger");
                $('#pesan-title').text('Pesan');
                $('#pesan-content').text(res.message);
                $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });                
                $("#sebelumnya3").show();
            }
            console.log(res);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);     
            // alert("Terjadi Kesalahan");      
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text("Terjadi Kesalahan");
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            location.reload();
        }
    });
}




function init_data_ubah_provinsi() {
    $.ajax({
        url: base_url+"Alamat/provinsi",
        type: "POST",
        data: {[csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#ubah-provinsi").empty();
            $("#ubah-provinsi").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#ubah-provinsi").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
            // $("#ubah-provinsi").val(res.data[0]["alamat_provinsi"]).trigger('change');
            init_data_ubah_kotakab();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function init_data_ubah_kotakab() {
    provinsi = $("#ubah-provinsi").val();
    $.ajax({
        url: base_url+"Alamat/kotakab",
        type: "POST",
        data: {"provinsi": provinsi, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#ubah-kotakab").empty();
            $("#ubah-kotakab").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#ubah-kotakab").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
            // $("#ubah-kotakab").val(res.data[0]["alamat_kotakab"]).trigger('change');
            init_data_ubah_kecamatan();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}

function init_data_ubah_kecamatan() {
    kotakab = $("#ubah-kotakab").val();
    $.ajax({
        url: base_url+"Alamat/kecamatan",
        type: "POST",
        data: {"kotakab": kotakab, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#ubah-kecamatan").empty();
            $("#ubah-kecamatan").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#ubah-kecamatan").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }
            // $("#ubah-kecamatan").val(res.data[0]["alamat_kecamatan"]).trigger('change');
            init_data_ubah_kelurahan();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}


function init_data_ubah_kelurahan() {
    kecamatan = $("#ubah-kecamatan").val();
    $.ajax({
        url: base_url+"Alamat/kelurahan",
        type: "POST",
        data: {"kecamatan": kecamatan, [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#ubah-kelurahan").empty();
            $("#ubah-kelurahan").append( "<option value=''>---Pilih Data----</option>" );
            for(i = 0; i < res.data.length; i++) {
                $("#ubah-kelurahan").append( "<option value='" + res.data[i]["id"] + "'>" + res.data[i]["name"] + "</option>" );
            }            
            // $("#ubah-kelurahan").val(res.data[0]["alamat_kelurahan"]).trigger('change');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}



function open_ubah_modal(id) {
    $('#form-ubah')[0].reset();
    $('#modal-ubah').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Ubah Data');
    init_data_ubah(id);
}

function init_data_ubah(id) {
    $.ajax({
        url: base_url+"Bankinfaq/get_bank_infaq_by_id",
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#ubah-id").val(res.data[0]["id"]);
            $("#ubah-nama").val(res.data[0]["nama"]);
            init_data_ubah_provinsi();
            $("#ubah-alamat").val(res.data[0]["alamat"]);
            $("#ubah-telepon").val(res.data[0]["telepon"]);
            $("#ubah-email").val(res.data[0]["email"]);
            // $('input[name="ubah-tipebankinfaq"][value="' + res.data[0]["tipebank"] + '"]').prop('checked', true);
            // $("#ubah-minpinjaman").val(res.data[0]["minpinjaman"]);
            // $("#ubah-maxpinjaman").val(res.data[0]["maxpinjaman"]);
            // $('input[name="ubah-tipepinjamanbank"][value="' + res.data[0]["tipepinjaman"] + '"]').prop('checked', true);
            $("#ubah-kegiatanmingguan").val(res.data[0]["kegiatanmingguan"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}


function ubah() {
    var form = $("#form-ubah")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    console.log(data);
    $.ajax({
        url: base_url+"Bankinfaq/edit",
        type: "POST",
        data: data,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res); 
            init_datatables();
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Ubah Data');
            $('#pesan-tipe').addClass("alert-success");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text(res.message);
            $('#modal-ubah').modal('hide');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);     
            alert("Terjadi Kesalahan");      
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text("Terjadi Kesalahan");
           location.reload();
        }
    });
}

function open_lihat_modal(id) {
    $('#form-lihat')[0].reset();
    $('#modal-lihat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Lihat Data');
    init_data_lihat(id);
}

function init_data_lihat(id) {
    $.ajax({
        url: base_url+"Bankinfaq/get_bank_infaq_by_id",
        type: "POST",
        data: {
            "id": id,
            [csrf_token]: csrf_hash},
        dataType: "JSON",
        success: function (res) {
            csrf_token = res.csrf_token;
            csrf_hash = res.csrf_hash;
            console.log(res);
            $("#lihat-id").val(res.data[0]["id"]);
            $("#lihat-nama").val(res.data[0]["nama"]);
            $("#lihat-tanggal").val(res.data[0]["date_created"]);
            init_data_ubah_provinsi();
            $("#lihat-alamat").val(res.data[0]["alamat"]);
            $("#lihat-telepon").val(res.data[0]["telepon"]);
            $("#lihat-email").val(res.data[0]["email"]);
            $('input[name="lihat-tipebankinfaq"][value="' + res.data[0]["tipebank"] + '"]').prop('checked', true);
            $("#lihat-minpinjaman").val(res.data[0]["minpinjaman"]);
            $("#lihat-maxpinjaman").val(res.data[0]["maxpinjaman"]);
            $('input[name="lihat-tipepinjamanbank"][value="' + res.data[0]["tipepinjaman"] + '"]').prop('checked', true);
            $("#lihat-kegiatanmingguan").val(res.data[0]["kegiatanmingguan"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}