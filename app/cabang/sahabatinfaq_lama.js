var base_url;
var csrf_token;
var csrf_hash;
var data_tampil;
var urutkan_berdasar;
var urutkan_dari;
var pencarian_keyword;
var halaman_sekarang;
var halaman_maksimal;
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
    halaman_sekarang = args_halaman_sekarang;
    halaman_maksimal = args_halaman_maksimal;
    idbank = args_idbank;
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
    $("#datatables-sahabat tbody tr").remove();    
    data_tampil = $("#filter-datatampil-sahabat").val();
    urutkan_berdasar = $("#filter-urutkanberdasar-sahabat").val();
    urutkan_dari = $("#filter-urutkandari-sahabat").val();
    pencarian_keyword = $("#filter-pencariankeyword-sahabat").val();
    $.ajax({
        url: base_url+"Sahabatinfaq/get_datatables",
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
            for(i = 0; i < res.data.length; i++) {
                row_open = "<tr>";
                kolom_aksi_lihat = '<a onclick="open_lihat_modal('+'\''+res.data[i]['idsahabat']+'\''+')" href="#" class="btn btn-sm btn-icon icon-center btn-primary m-1"><i class="far fa-eye"></i></a>';
                kolom_aksi_edit = '<a onclick="open_ubah_modal('+'\''+res.data[i]['idsahabat']+'\''+')" href="#" class="btn btn-sm btn-icon icon-center btn-warning m-1"><i class="far fa-edit"></i></a>';
                kolom_aksi_hapus = '';//'<a href="#" class="btn btn-sm btn-icon icon-center btn-danger m-1" data-toggle="modal" data-target="#modal-hapus" data-backdrop="static" data-keyboard="false"><i class="fas fa-backspace"></i></a>';
                kolom_aksi = '<td>' + kolom_aksi_lihat + kolom_aksi_edit + kolom_aksi_hapus + '</td>';
                kolom_1 = '<td>' +res.data[i]['nik']+ '</td>';
                kolom_2 = '<td>' +res.data[i]['nama']+ '</td>';
                kolom_3 = '<td>' +res.data[i]['nohp']+ '</td>';
                kolom_4 = '<td>' +(res.data[i]['bmpa'])+ '</td>';
                kolom_5 = '<td>' +res.data[i]['kelompokaktif']+ '</td>';
                kolom_6 = '<td>' +res.data[i]['pinjamanaktif']+ '</td>';           
                row_close = "</tr>";
                $("#datatables-sahabat tbody").append(
                    row_open+
                    kolom_aksi+
                    kolom_1+
                    kolom_2+
                    kolom_3+
                    kolom_4+
                    kolom_5+
                    kolom_6+
                    row_close
                );
            }
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

    $("#tambah-button-anggotakelompok").click(function() {
        tambah_kelompokanggota_table();
    });

    $("#tambah-tipebank-anggotakelompok").click(function(){
        $("#tambah-namabanklabel-anggotakelompok").show();
        $("#tambah-namabank-anggotakelompok").show();
    });
    $("#tambah-tipetunai-anggotakelompok").click(function(){        
        $("#tambah-namabanklabel-anggotakelompok").hide();
        $("#tambah-namabank-anggotakelompok").hide();
    });


}

function tambah_kelompokanggota_table(){
    var anggota_terpilih = $("#tambah-anggota-anggotakelompok").val();
    var detail_anggota_terpilih = $("#tambah-anggota-anggotakelompok option[value='"+anggota_terpilih+"']").text();
    $("#tambah-anggota-anggotakelompok option[value='"+anggota_terpilih+"']").remove();
    $("#tambah-anggota-anggotakelompok").trigger("change");
    data_anggota_terpilih = detail_anggota_terpilih.split("-");
    $("#tambah-listanggota-anggotakelompok").append('<input type="hidden" class="form-control" placeholder="Titel" name="tambah-anggotakelompok-anggotakelompok[idsahabat]['+anggota_terpilih+']" value="'+anggota_terpilih+'">');
    var row_open = "<tr id='tambah-row-listanggota-"+anggota_terpilih+"'>";
    var kolom1 = '<th scope="row">'+'<a onclick="hapus_kelompokanggota_table(\''+anggota_terpilih+'\')" href="#" class="mt-1 mb-1 btn btn-sm btn-icon icon-center btn-danger"><i class="fas fa-backspace"></i> </a>'+'</th>';
    var kolom2 = '<td id="tambah-nik-listanggota-'+anggota_terpilih+'">'+data_anggota_terpilih[0]+'</td>';
    var kolom3 = '<td id="tambah-nama-listanggota-'+anggota_terpilih+'">'+data_anggota_terpilih[1]+'</td>';
    var kolom4 = '<td id="tambah-bmpa-listanggota-'+anggota_terpilih+'">'+data_anggota_terpilih[2]+'</td>';
    var row_close = "</tr>";
    var row = row_open+kolom1+kolom2+kolom3+kolom4+row_close;    
    $("#datatables-tambah-anggotakelompok tbody").append(row);
}

function hapus_kelompokanggota_table(id){
    alert(id);
    var kelompokanggota_nik = $("#tambah-nik-listanggota-"+id).text();
    var kelompokanggota_nama = $("#tambah-nama-listanggota-"+id).text();
    var kelompokanggota_bmpa = $("#tambah-bmpa-listanggota-"+id).text();
    var kelompok_anggota = "<option value='"+id+"'>" + kelompokanggota_nik+" - "+kelompokanggota_nama+ " - " +kelompokanggota_bmpa + "<option>";
    $("#tambah-anggota-anggotakelompok").append(kelompok_anggota).trigger("change");
    $("input[name='tambah-anggotakelompok-anggotakelompok[idsahabat]["+id+"]']").remove();
    $("#tambah-row-listanggota-"+id).remove();
}


function open_tambah_modal() {
    $('#form-tambah-sahabat')[0].reset();
    $('#modal-tambah-sahabat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
}

function tambah() {
    var form = $("#form-tambah-sahabat")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    console.log(data);
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
            console.log(res); 
            init_datatables();
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Tambah Data');
            $('#pesan-tipe').addClass("alert-success");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text(res.message);
            $('#modal-tambah-sahabat').modal('hide');  
            location.reload();
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


function open_ubah_modal(id) {
    $('#form-ubah-sahabat')[0].reset();
    $('#modal-ubah-sahabat').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Ubah Data');
    init_data_ubah(id);
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
            console.log(res);
            $("#edit-id-sahabat").val(res.data[0]["id"]);
            $("#edit-idbank-sahabat").val(res.data[0]["idbank"]);
            $("#edit-nik-sahabat").val(res.data[0]["nik"]);
            $("#edit-nama-sahabat").val(res.data[0]["nama"]);
            $("#edit-nohp-sahabat").val(res.data[0]["nohp"]);
            $("#edit-profesi-sahabat").val(res.data[0]["profesi"]);
            $("#edit-tenagakerja-sahabat").val(res.data[0]["tenagakerja"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}


function ubah() {
    var form = $("#form-ubah-sahabat")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    console.log(data);
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
            console.log(res); 
            init_datatables();
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Ubah Data');
            $('#pesan-tipe').addClass("alert-success");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text(res.message);
            $('#modal-ubah-sahabat').modal('hide');
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);     
            alert("Terjadi Kesalahan");            
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('#pesan-tipe').addClass("alert-danger");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text("Terjadi Kesalahan");
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

function init_data_lihat(id) {
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
            console.log(res);
            $("#lihat-id-sahabat").val(res.data[0]["id"]);
            $("#lihat-idbank-sahabat").val(res.data[0]["idbank"]);
            $("#lihat-nik-sahabat").val(res.data[0]["nik"]);
            $("#lihat-nama-sahabat").val(res.data[0]["nama"]);
            $("#lihat-nohp-sahabat").val(res.data[0]["nohp"]);
            $("#lihat-profesi-sahabat").val(res.data[0]["profesi"]);
            $("#lihat-tenagakerja-sahabat").val(res.data[0]["tenagakerja"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Terjadi Kesalahan");
            location.reload();
        }
    });
}





/* KELOMPOK */

function init_kelompok_option(){
    function init_data_add_provinsi() {
        $.ajax({
            url: base_url+"Sahabatinfaq/get_freeanggota_all_by_idbank",
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
}

function open_tambah_kelompok_modal() {
    $('#form-tambah-kelompok')[0].reset();
    $('#modal-tambah-kelompok').modal({ backdrop: 'static', keyboard: false });
    $('.modal-title').text('Form Tambah Data');
}

function tambah_kelompok() {
    
    var form = $("#form-tambah-sahabat")[0];
    var data = new FormData(form);
    data.append(csrf_token, csrf_hash);
    console.log(data);
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
            console.log(res); 
            init_datatables();
            $('#modal-pesan').modal({ backdrop: 'static', keyboard: false });
            $('.modal-title').text('Form Tambah Data');
            $('#pesan-tipe').addClass("alert-success");
            $('#pesan-title').text('Pesan');
            $('#pesan-content').text(res.message);
            $('#modal-tambah-sahabat').modal('hide');  
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