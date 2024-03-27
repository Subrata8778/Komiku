var $$ = Dom7;

var device = Framework7.getDevice();

var nilai = 0;

//Ambil Kategori
function getKategori() {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/kategori_komik.php",
    function (data) {
      var arr = JSON.parse(data);
      var movies_api = arr['data'];
      for (var i = 0; i < movies_api.length; i++) {
        $$("#kategori").append(
          "<div class='col-50'><div class='card'>" +
          "<div class='card-header'>" + movies_api[i]['kategori'] +
          "</div><div class='card-content'>" +
          "<img class='img' src='" + movies_api[i]['url_kategori'] + "' width='100%'>" +
          "<div class='card-footer'><a href='/daftarkomik/" + movies_api[i]['id'] + "'class='button button-fill' style='width:100%;'>Daftar Komik</a>" +
          "</div></div></div>");
      }
    }
  );
}
//Ambil Semua Komik
function getAllKomik() {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/daftarkomik.php", { "command": "select_komik" },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      var komik = arr['data'];
      if (result != "error") {
        for (var i = 0; i < komik.length; i++) {
          $$("#cariKomik").append(
            "<div class='col-50 medium-25'><div class='card'>" +
            "<div class='card-header'>" + komik[i]['judul'] +
            "<div><i class='f7-icons' id='favorit" + komik[i]['id'] + "' onClick='addfavorite(" + komik[i]['id'] + ")' style='color:red;'>heart</i></div>" +
            "</div><div class='card-content'>" +
            "<img class='img' src='" + komik[i]['url_poster'] + "' width='100%'>" +
            "<div class='card-footer'><a href='/bacaKomik/" + komik[i]['id'] + "'class='button button-fill btnBaca'>Baca</a>" +
            "<div><a href='/rating/" + komik[i]['id'] + "' class='button color-yellow'>" +
            "<i class='f7-icons sizeIcon' style='color:green;'>eye</i><span id='view" + komik[i]['id'] + "'>" + komik[i]['view'] + "</span>" +
            "<i class='f7-icons sizeIcon' style='color:orange;'>chat_bubble_text</i><span id='ulasan" + komik[i]['id'] + "'>" + komik[i]['total_ulasan'] + "</span>" +
            "<i class='f7-icons sizeIcon' style='color:yellow'>star_fill</i><span id='rating" + komik[i]['id'] + "'></span></a></div>" + "</div></div></div>");

          getRating(komik[i]['id']);
          checkFavorite(localStorage.user_id, komik[i]['id']);
        }
      } else {
        app.dialog.alert(arr['message']);
      }
    }
  );
}
//Ambil Komik berdasarkan Keyword
function getKomik(vcari) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/daftarkomik.php", { "cari": vcari, "command": "cari_komik" },
    function (data) {
      var arr = JSON.parse(data);
      var komik = arr['data'];
      for (var i = 0; i < komik.length; i++) {
        $$("#cariKomik").append(
          "<div class='col-50 medium-25'><div class='card'>" +
          "<div class='card-header'>" + komik[i]['judul'] +
          "<div><i class='f7-icons' id='favorit" + komik[i]['id'] + "' onClick='addfavorite(" + komik[i]['id'] + ")' style='color:red;'>heart</i></div>" +
          "</div><div class='card-content'>" +
          "<img class='img' src='" + komik[i]['url_poster'] + "' width='100%'>" +
          "<div class='card-footer'><a href='/bacaKomik/" + komik[i]['id'] + "'class='button button-fill btnBaca'>Baca</a>" +
          "<div><a href='/rating/" + komik[i]['id'] + "' class='button color-yellow'>" +
          "<i class='f7-icons sizeIcon' style='color:green;'>eye</i><span id='view" + komik[i]['id'] + "'>" + komik[i]['view'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:orange;'>chat_bubble_text</i><span id='ulasan" + komik[i]['id'] + "'>" + komik[i]['total_ulasan'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:yellow'>star_fill</i><span id='rating" + komik[i]['id'] + "'></span></a></div>" + "</div></div></div>");

        getRating(komik[i]['id']);
        checkFavorite(localStorage.user_id, komik[i]['id']);
      }
    }
  );
}
//Ambil Komik berdasarkan Keyword & Kategori
function getKomikKategori(vcari, id) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/daftarkomik.php", { "cari": vcari, "id": id, "command": "cari_komik_kategori" },
    function (data) {
      var arr = JSON.parse(data);
      var komik = arr['data'];
      for (var i = 0; i < komik.length; i++) {
        $$("#daftarKomik").append(
          "<div class='col-50 medium-25'><div class='card'>" +
          "<div class='card-header'>" + komik[i]['judul'] +
          "<div><i class='f7-icons' id='favorit" + komik[i]['id'] + "' onClick='addfavorite(" + komik[i]['id'] + ")' style='color:red;'>heart</i></div>" +
          "</div><div class='card-content'>" +
          "<img class='img' src='" + komik[i]['url_poster'] + "' width='100%'>" +
          "<div class='card-footer'><a href='/bacaKomik/" + komik[i]['id'] + "'class='button button-fill btnBaca'>Baca</a>" +
          "<div><a href='/rating/" + komik[i]['id'] + "' class='button color-yellow'>" +
          "<i class='f7-icons sizeIcon' style='color:green;'>eye</i><span id='view" + komik[i]['id'] + "'>" + komik[i]['view'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:orange;'>chat_bubble_text</i><span id='ulasan" + komik[i]['id'] + "'>" + komik[i]['total_ulasan'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:yellow'>star_fill</i><span id='rating" + komik[i]['id'] + "'></span></a></div>" + "</div></div></div>");

        getRating(komik[i]['id']);
        checkFavorite(localStorage.user_id, komik[i]['id']);
      }
    }
  );
}

//Favorite Komik
function getFavorite(id_user) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/getfavorite.php", { "idUser": id_user },
    function (data) {
      var arr = JSON.parse(data);
      var movies_api = arr['data'];
      for (var i = 0; i < movies_api.length; i++) {
        // $$("#favorite").append(
        //   "<div class='col-50'><div class='card'>" +
        //   "<div class='card-header'>" + movies_api[i]['judul'] +
        //   "</div><div class='card-content'>" +
        //   "<img src='" + movies_api[i]['url_poster'] + "' width='100%'>" +
        //   "<div class='card-footer'><a href='/bacaKomik/" + movies_api[i]['id'] + "'class='button button-fill'>Baca</a> <i class='f7-icons' style='color:yellow'>star_fill</i>" +
        //   getRating(movies_api[i]['id']) + "</div></div></div>");

        $$("#favorite").append(
          "<div class='col-50 medium-25'><div class='card'>" +
          "<div class='card-header'>" + komik[i]['judul'] +
          "<div><i class='f7-icons' id='favorit" + komik[i]['id'] + "' onClick='addfavorite(" + komik[i]['id'] + ")' style='color:red;'>heart</i></div>" +
          "</div><div class='card-content'>" +
          "<img class='img' src='" + komik[i]['url_poster'] + "' width='100%'>" +
          "<div class='card-footer'><a href='/bacaKomik/" + komik[i]['id'] + "'class='button button-fill btnBaca'>Baca</a>" +
          "<div><a href='/rating/" + komik[i]['id'] + "' class='button color-yellow sizeIcon'>" +
          "<i class='f7-icons sizeIcon' style='color:green;'>eye</i><span id='view" + komik[i]['id'] + "'>" + komik[i]['view'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:orange;'>chat_bubble_text</i><span id='ulasan" + komik[i]['id'] + "'>" + komik[i]['total_ulasan'] + "</span>" +
          "<i class='f7-icons sizeIcon' style='color:yellow'>star_fill</i><span id='rating" + komik[i]['id'] + "'></span></a></div>" + "</div></div></div>");

        getRating(komik[i]['id']);
        checkFavorite(localStorage.user_id, komik[i]['id']);
      }
    }
  );
}
function checkFavorite(id_user, id_komik) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/getfavorite.php", { "idUser": id_user },
    function (data) {
      var arr = JSON.parse(data);
      var movies_api = arr['data'];
      if (arr['result'] != "error") {
        for (var i = 0; i < movies_api.length; i++) {
          if (movies_api[i]['id'] == id_komik) {
            setLoveById(id_komik);
          }
        }
      }
    }
  );
}

//Ambil Rating Tiap Komik
function getRating(id_komik) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/getrating.php",
    { "komik": id_komik, "command": "hitung_rating" },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      var movies_api = arr['data'];
      var $avg = 0;
      if (result != "error") {
        if (movies_api[0]['count'] != 0) {
          $avg = movies_api[0]['sum'] / movies_api[0]['count'];
        } else {
          $avg = 0;
        }
        $$("#rating" + id_komik).html(parseFloat($avg).toFixed(1));
      } else {
        alert("Error di get rating");
      }
    }
  );
}
//Atur Bintang
function setStars(max) {
  nilai = max;
  if(max <= 5){
    // $$('.fa-star').css('color', 'black');
    for (var i = 1; i <= max; i++)
      $$('#star-' + i).css('color', 'yellow');

    for (var j = max + 1; j <= 5; j++)
      $$('#star-' + j).css('color', 'black');
  }
}
// function setLove() {
//   $$('#favorit').css('color', 'red');
// }
// function resetLove() {
//   $$('#favorit').css('color', 'black');
// }
function showStar(){
  for(var i=1; i<=5; i++){
    $$("#rating").append("<i class='f7-icons' id='star-" + i + "' onClick='setStars(" + i + ")'>star_fill</i>");
  }
  $$("#rating").append("<br><br><textarea style='border:solid 1px' id='txtUlasan' cols='40' rows='5' placeholder='masukkan komentar'></textarea> <br>" + 
  "<a class='button button-fill' id='btnRating'>Submit</a>");
}

//Atur Favorite (Love)
function setLoveById(id_komik) {
  $$('#favorit' + id_komik).html('heart_fill');
}
function resetLoveById(id_komik) {
  $$('#favorit' + id_komik).html('heart');
}
function addfavorite(idKomik) {
  var idUser = localStorage.user_id;
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/addfavorite.php",
    { "idUser": idUser, "idKomik": idKomik },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      if (result == 'success') {
        setLoveById(idKomik);
      }
      else {
        resetLoveById(idKomik);
      };
    })
}

//Tampilkan Comment dan Rating di Halaman Rating
function getCommentRating(idKomik) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/getrating.php",
    { "komik": idKomik, "command": "ambil_rating_ulasan" },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      var komik = arr['data'];
      if (result != "error") {
        for (var i = 0; komik.length; i++) {
          $$('#accordionCR').append(
            "<div class='accordion-item' style='margin-top: 5px; border: 1px solid gray; border-radius: 10px 5px 5px 5px; padding: 3px;'>" +
            "<div class='accordion-item-toggle'>" +
            "<i class='icon icon-plus'>+</i>" +
            "<i class='icon icon-minus'>-</i> " +
            "<span>" + komik[i]["user_name"] + ": " + komik[i]["ulasan"] + "</span>" +
            "<div id='star" + komik[i]["idKomentar"] + "'></div>" +
            "</div>" +
            "<div class='accordion-item-content'>" +
            "<label>Reply Comment: <input type='text' id='textReply" + komik[i]["idKomentar"] + "' placeholder='ketik disini...' style='width: 70%; display: inline;'><a style='float: right;' onClick='addReply(" + komik[i]["idKomentar"] + "," + idKomik + ")'>Enter</a></label>" +
            "<ul id='reply" + komik[i]["idKomentar"] + "'></ul>" +
            "</div>" +
            "</div>"
          );
          setStarRating(komik[i]["idKomentar"], komik[i]["nilai"]);
          showReply(komik[i]["idKomentar"]);
        }
      }
    }
  );
}
function setStarRating(idKomentar, rating) {
  for (var i = 1; i <= rating; i++) {
    $$('#star' + idKomentar).append("<i class='f7-icons' style='color:yellow;'>star_fill</i>");
  }
  for (var i = rating; i < 5; i++) {
    $$('#star' + idKomentar).append("<i class='f7-icons' style='color:yellow;'>star</i>");
  }
}

//Reply Comment
function addReply(idKomentar, idKomik) {
  var reply = $$('#textReply' + idKomentar).val();
  var idUser = localStorage.user_id;
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/reply.php",
    { "idUser": idUser, "idRating": idKomentar, "reply": reply, "idKomik": idKomik, "command": "tambah_balas_ulasan" },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      if (result == 'success') {
        $$('#reply' + idKomentar).append("<li>" + localStorage.username + ": " + reply + "</li>");
        $$('#textReply' + idKomentar).val("");
        $$('#ulasan' + idKomik).html(parseInt($$('#ulasan' + idKomik).html()) + 1);
      }
      else {
        alert("gagal reply");
      };
    })
}
function showReply(idKomentar) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420002/movie_api/reply.php",
    { "idRating": idKomentar, "command": "ambil_balas_ulasan" },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result'];
      var reply = arr['data'];

      if (result == 'success') {
        for (var i = 0; i < reply.length; i++) {
          $$('#reply' + idKomentar).append("<li>" + reply[i]["user_name"] + ": " + reply[i]["komentar"] + "</li>");
        }
      }
    })
}

var app = new Framework7({
  name: 'Aplikasi Komiku', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      $$(document).on('page:afterin', function (e, page) {
        if (!localStorage.username) {
          page.router.navigate('/login/');
        } else {
          $$('#div_hello').html('Hello ' + localStorage.username);
        }
      });

      $$(document).on('page:init', function (e, page) {
        if (page.name == 'login') {
          $$('#btnsignin').on('click', function () {
            localStorage.removeItem("user_id");
            localStorage.removeItem("username");
            app.request.post('https://ubaya.fun/hybrid/160420002/movie_api/login_komik.php',
              {
                "user_id": $$("#username").val(),
                "user_password": $$("#password").val()
              },
              function (data) {
                var arr = JSON.parse(data);
                var result = arr['result'];
                if (result == 'success') {
                  localStorage.username = arr['user_name'];
                  localStorage.user_id = $$("#username").val();
                  page.router.back('/');
                } else app.dialog.alert('Username atau password salah');
              });
          });
        }
        if (page.name == 'myFavorite') {
          var idUser = localStorage.user_id;
          app.request.post(
            "https://ubaya.fun/hybrid/160420002/movie_api/getfavorite.php", { "idUser": idUser },
            function (data) {
              var arr = JSON.parse(data);
              var komik = arr['data'];
              for (var i = 0; i < komik.length; i++) {
                $$("#myFavorite").append(
                  "<div class='col-50 medium-25'><div class='card'>" +
                  "<div class='card-header'>" + komik[i]['judul'] +
                  "<div><i class='f7-icons' id='favorit" + komik[i]['id'] + "' onClick='addfavorite(" + komik[i]['id'] + ")' style='color:red;'>heart</i></div>" +
                  "</div><div class='card-content'>" +
                  "<img class='img' src='" + komik[i]['url_poster'] + "' width='100%'>" +
                  "<div class='card-footer'><a href='/bacaKomik/" + komik[i]['id'] + "'class='button button-fill btnBaca'>Baca</a>" +
                  "<div><a href='/rating/" + komik[i]['id'] + "' class='button color-yellow sizeIcon'>" +
                  "<i class='f7-icons sizeIcon' style='color:green;'>eye</i><span id='view" + komik[i]['id'] + "'>" + komik[i]['view'] + "</span>" +
                  "<i class='f7-icons sizeIcon' style='color:orange;'>chat_bubble_text</i><span id='ulasan" + komik[i]['id'] + "'>" + komik[i]['total_ulasan'] + "</span>" +
                  "<i class='f7-icons sizeIcon' style='color:yellow;'>star_fill</i><span id='rating" + komik[i]['id'] + "'></span></a></div>" + "</div></div></div>");

                getRating(komik[i]['id']);
                checkFavorite(localStorage.user_id, komik[i]['id']);
              }
            }
          );
        }
        if (page.name == 'kategori') {
          getKategori();
        }
        if (page.name == 'cariKomik') {
          getAllKomik();
          $$('#btncari').on('click', function () {
            $$("#cariKomik").html(" ");
            getKomik($$('#txtcari').val());
          });
        }
        if (page.name == 'daftarKomik') {
          var id = page.router.currentRoute.params.id;
          getKomikKategori(" ", id);
          $$('#btncari').on('click', function () {
            $$("#daftarKomik").html(" ");
            getKomikKategori($$('#txtcari').val(), id);
          });
        }
        if (page.name == 'bacaKomik') {
          showStar();
          var idUser = localStorage.user_id;
          var id = page.router.currentRoute.params.id;
          app.request.post(
            "https://ubaya.fun/hybrid/160420002/movie_api/daftarkomik.php", { "idKomik": id, "command": "baca_komik" },
            function (data) {
              var arr = JSON.parse(data);
              var komik = arr['data'];
              if (arr['result'] != "error") {
                $$(".title").html(komik[0]["judul"]);

                for (var i = 0; i < komik.length; i++) {
                  $$('#bacaKomik').append("<div style='margin-top: 5px; width:100%; height:100%;'><img src='" + komik[i]['url'] + "' width='100%'></div>");
                }
                app.request.post(
                  "https://ubaya.fun/hybrid/160420002/movie_api/daftarkomik.php", { "idKomik": id, "command": "update_view" },
                  function (data) {
                    var arr = JSON.parse(data);
                    if (arr['result'] != "error") {
                      $$('#view' + id).html(parseInt($$('#view' + id).html()) + 1);
                    } else {
                      alert("gagal di update view komik");
                    }
                  }
                );
              } else {
                alert("gagal di baca komik");
              }
            }
          );
          $$('#btnRating').on('click', function () {
            var id_user = localStorage.user_id;
            var id_komik = page.router.currentRoute.params.id;
            var rating = nilai;
            if (rating == 0) {
              app.dialog.alert('Pilih bintang terlebih dahulu!');
            } else {
              if ($$('#txtUlasan').val() == "") {
                ulasan = "--Tidak Ada Ulasan--";
              } else {
                ulasan = $$('#txtUlasan').val();
              }
              app.request.post(
                "https://ubaya.fun/hybrid/160420002/movie_api/addrating.php",
                { "idUser": id_user, "idKomik": id_komik, "nilai": rating, "ulasan": ulasan },
                function (data) {
                  var arr = JSON.parse(data);
                  var result = arr['result'];
                  if (result == 'success') {
                    app.dialog.alert('Berhasil, terima kasih untuk penilaiannya');
                  }
                  else app.dialog.alert('Anda sudah memberikan nilai sebelumnya. Silahkan melihat hasil komentar anda di halaman ini.');
                  page.router.navigate('/rating/' + id_komik);
                }
              );
            }
          });
        }
        if (page.name == 'rating') {
          var idKomik = page.router.currentRoute.params.idKomik;
          getCommentRating(idKomik);
        }
      });
    },
  },
});