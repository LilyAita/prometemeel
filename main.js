//var fetch = require("node-fetch");
url_nombre =
  "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";
url_detalles =
  "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";
fetch(url_detalles)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  })
  .then((json) => {
    fetch(url_nombre)
      .then(function (response2) {
        if (response2.ok) {
          return response2.json();
        } else {
          console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
      })
      .then(function (jsonproducto) {
        let count = new Array(jsonproducto.length + 5).fill(0);
        //valor maximo hasta i
        let max = 0;
        //id del valor maximo hasta i
        let id = 0;

        for (let i = 0; i < json.length; i++) {
          let k = json[i].idproducto;
          count[k] += parseInt(json[i].cantidad);
          if (count[k] > max) {
            max = count[k];
            id = k;
          }
        }

        console.log(
          "El producto más pedido es " +
            jsonproducto[id - 1].nombreProducto +
            " y lo pidieron " +
            max +
            " veces"
        );
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  });
