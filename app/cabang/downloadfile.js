var base_url;
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
    url_datatables = base_url+"Downloadfile/get_datatables_cabang";

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
    init_pagination();    
}

function init_data( ) {
    init_datatables();
}


function init_listener() {

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
            "idbank": idbank,
            [csrf_token]: csrf_hash,
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res);
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