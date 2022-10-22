function Numeros(string) {
  var out = "";
  var filtro = "1234567890"; //Caracteres validos
  for (var i = 0; i < string.length; i++)
    if (filtro.indexOf(string.charAt(i)) != -1) out += string.charAt(i);
  return out;
}

$("#doc_type").on("change", function (e) {
  $("#doc_number").val("");
  var tipodocumento = $("#doc_type option:selected").val();
  if (tipodocumento == "dni") {
    $("#doc_number").attr("maxlength", 8);
  }
  if (tipodocumento == "ruc") {
    $("#doc_number").attr("maxlength", 11);
  }
});

$(document).on("submit", "#form_serarch", async function (e) {
  e.preventDefault();
  var doc_type = $("#doc_type").val();
  var doc_number = $("#doc_number").val();

  var request = {};
  request.doc_type = doc_type;
  request.doc_number = doc_number;
  //   console.log(request);
  $.ajax({
    type: "POST",
    url: "./APIS/prueba.php",
    data: {
      doc_type: doc_type,
      doc_number: doc_number,
    },
    success: function (response) {
      console.log(response);
      showConsultiog(response);
    },
    error: function (response) {
      alert(response.responseJSON.error);
    },
  });
});

$(document).on("click", "#clear", function () {
  clearData();
});
$(document).on("click", "#clear-close", function () {
  clearData();
  $("#modal-data-load-dni").hide();
  $("#modal-data-load-ruc").hide();
});

function showConsultiog(data) {
    clearData()
  if (data.tipoDocumento == "1") {
    $('#title_show_data').text('Datos de DNI: '+data.numeroDocumento)
    $("#nombres-dni").text(data.nombre);
    $("#ape-pater").text(data.apellidoPaterno);
    $("#ape-mater").text(data.apellidoMaterno);
    $("#dni").text(data.numeroDocumento);
    $("#tipo-doc").text(data.tipoDocumento);
    $("#modal-data-load-ruc").hide();
    $("#modal-data-load-dni").show();
  } else if (data.tipoDocumento == "6") {
    $('#title_show_data1').text('Datos de RUC: '+data.numeroDocumento)
    $("#nombres-ruc").text(data.nombre);
    $("#condicion").text(data.condicion);
    $("#viaNombre").text(data.viaNombre);
    $("#numero").text(data.numero);
    $("#provincia").text(data.provincia);
    $("#distrito").text(data.distrito);
    $("#depto").text(data.departamento);
    $("#dir").text(data.direccion);
    $("#ubigeo").text(data.ubigeo);
    $("#estado").text(data.estado);
    $("#documento").text(data.numeroDocumento);
    $("#modal-data-load-dni").hide();
    $("#modal-data-load-ruc").show();
  }
}

function clearData() {
  $("#nombres-dni").text("");
  $("#ape-pater").text("");
  $("#ape-mater").text("");
  $("#dni").text("");
  $("#tipo-doc").text("");

  $("#nombres-ruc").text("");
  $("#condicion").text("");
  $("#viaNombre").text("");
  $("#numero").text("");
  $("#provincia").text("");
  $("#distrito").text("");
  $("#depto").text("");
  $("#dir").text("");
  $("#ubigeo").text("");
  $("#estado").text("");
  $("#documento").text("");
}

$("#modal-data-load-dni").hide();
$("#modal-data-load-ruc").hide();
