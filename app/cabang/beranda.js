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
    
}

function init_data( ) {
    var nominal = (100000000);
    // var infaqmasuk_ctx = document.getElementById("dashboard-infaqmasuk").getContext('2d');
    // var dashboard_infaqmasuk = new Chart(infaqmasuk_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });

    // var infaqmasuk_ctx = document.getElementById("dashboard-infaqantarbank").getContext('2d');
    // var dashboard_infaqantarbank = new Chart(infaqmasuk_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });

    // var zakatmasuk_ctx = document.getElementById("dashboard-zakatmasuk").getContext('2d');
    // var dashboard_zakatmasuk = new Chart(zakatmasuk_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });


    var pertumbuhanbulanan_ctx = document.getElementById("dashboard-pertumbuhanbulanan").getContext('2d');
    var dashboard_pertumbuhanbulanan = new Chart(pertumbuhanbulanan_ctx, {
        type: 'bar',
        data: {
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          datasets: [{
            label: 'Kas',
            data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
            borderWidth: 2,
            backgroundColor: 'rgba(63,82,227,.8)',
            borderWidth: 0,
            borderColor: 'transparent',
            pointBorderWidth: 0,
            pointRadius: 3.5,
            pointBackgroundColor: 'transparent',
            pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
          },
          {
            label: 'Bank',
            data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
            borderWidth: 2,
            backgroundColor: 'rgba(254,86,83,.7)',
            borderWidth: 0,
            borderColor: 'transparent',
            pointBorderWidth: 0 ,
            pointRadius: 3.5,
            pointBackgroundColor: 'transparent',
            pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                // display: false,
                drawBorder: false,
                color: '#f2f2f2',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 10000000,
                callback: function(value, index, values) {
                  return 'Rp.' + numberWithCommas(value);
                }
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
                tickMarkLength: 10,
              }
            }]
          },
        }
    });

    // var perputarandanainfaq_ctx = document.getElementById("dashboard-perputarandanainfaq").getContext('2d');
    // var dashboard_perputarandanainfaq = new Chart(perputarandanainfaq_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });

    // var pinjamandiberikan_ctx = document.getElementById("dashboard-pinjamandiberikan").getContext('2d');
    // var dashboard_pinjamandiberikan = new Chart(pinjamandiberikan_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });


    // var gagalbayar_ctx = document.getElementById("dashboard-gagalbayar").getContext('2d');
    // var dashboard_gagalbayar = new Chart(gagalbayar_ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    //       datasets: [{
    //         label: 'Kas',
    //         data: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(63,82,227,.8)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
    //       },
    //       {
    //         label: 'Bank',
    //         data: [120000000, 110000000, 100000000, 90000000, 80000000, 70000000, 60000000, 50000000, 40000000, 30000000, 20000000, 10000000],
    //         borderWidth: 2,
    //         backgroundColor: 'rgba(254,86,83,.7)',
    //         borderWidth: 0,
    //         borderColor: 'transparent',
    //         pointBorderWidth: 0 ,
    //         pointRadius: 3.5,
    //         pointBackgroundColor: 'transparent',
    //         pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
    //       }]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         yAxes: [{
    //           gridLines: {
    //             // display: false,
    //             drawBorder: false,
    //             color: '#f2f2f2',
    //           },
    //           ticks: {
    //             beginAtZero: true,
    //             stepSize: 10000000,
    //             callback: function(value, index, values) {
    //               return 'Rp.' + numberWithCommas(value);
    //             }
    //           }
    //         }],
    //         xAxes: [{
    //           gridLines: {
    //             display: false,
    //             tickMarkLength: 10,
    //           }
    //         }]
    //       },
    //     }
    // });

//     var sahabatinfaq_ctx = document.getElementById("dashboard-sahabatinfaq").getContext('2d');
//     var dashboard_sahabatinfaq = new Chart(sahabatinfaq_ctx, {
//         type: 'bar',
//         data: {
//           labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
//           datasets: [{
//             label: 'Anggota',
//             data: [64, 32, 44, 33, 44, 33, 22, 44, 33, 44, 33, 21],
//             borderWidth: 2,
//             backgroundColor: 'rgba(63,82,227,.8)',
//             borderWidth: 0,
//             borderColor: 'transparent',
//             pointBorderWidth: 0,
//             pointRadius: 3.5,
//             pointBackgroundColor: 'transparent',
//             pointHoverBackgroundColor: 'rgba(63,82,227,.8)',
//           },
//           {
//             label: 'Manajemen',
//             data: [9, 8, 7, 9, 10, 11, 7, 4, 5, 3, 5, 6, 7],
//             borderWidth: 2,
//             backgroundColor: 'rgba(254,86,83,.7)',
//             borderWidth: 0,
//             borderColor: 'transparent',
//             pointBorderWidth: 0 ,
//             pointRadius: 3.5,
//             pointBackgroundColor: 'transparent',
//             pointHoverBackgroundColor: 'rgba(254,86,83,.8)',
//           }]
//         },
//         options: {
//           legend: {
//             display: false
//           },
//           scales: {
//             yAxes: [{
//               gridLines: {
//                 // display: false,
//                 drawBorder: false,
//                 color: '#f2f2f2',
//               },
//               ticks: {
//                 beginAtZero: true,
//                 stepSize: 10,
//                 callback: function(value, index, values) {
//                   return '' + numberWithCommas(value);
//                 }
//               }
//             }],
//             xAxes: [{
//               gridLines: {
//                 display: false,
//                 tickMarkLength: 10,
//               }
//             }]
//           },
//         }
//     });

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

function init_listener() {

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}