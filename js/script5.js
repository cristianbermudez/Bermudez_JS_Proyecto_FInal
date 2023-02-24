//Simulador de presupuestos para estudio contable
// declaro los tres servicios a cotizar y los costos x impuesto liquidado

const servicioImpositivo = "Impuestos";
const servicioContable = "Contabilidad";
const servicioSociedades = "Sociedades";
const costoImpuestoIIBB = 5000;
const costoImpuestoIVA = 3000;
const costoImpuestoGanancias = 7000;
const costoSociedadSRL = 5000;
const costoSociedadSA = 10000;
const costoSociedadSAS_SAU = 15000;
const costoConstitucionSociedadSRL = 67510;
const costoConstitucionSociedadSA = 85830;
const costoConstitucionSociedadSAS = 84660;

//pregunto al cliente que servicio elige
let servicioElegido;
let impuestoElegido;
let stringServicioImpositivo = "Impuestos";
let stringServicioContable = "Contabilidad";
let stringServicioSociedades = "Sociedades";

//
//

//

//referencias a inputs
const servicioSelect = document.querySelector(`#servicio-select`);

const inputComprobantesIMP = document.querySelector(`#inputComprobantesIMP`);
const selectIVA = document.querySelector(`#IVA-select`);
const selectIIBB = document.querySelector(`#IIBB-select`);
const selectGanancias = document.querySelector(`#Ganancias-select`);

const inputCuentasCNT = document.querySelector(`#inputCuentasCNT`);
const selectSRL = document.querySelector(`#SRL-select`);
const selectSA = document.querySelector(`#SA-select`);
const selectSAU_SAS = document.querySelector(`#SAU-SAS-select`);

const inputCantidadSocios = document.querySelector(`#inputCantidadSocios`);
const selectAltaSRL = document.querySelector(`#AltaSRL-select`);
const selectAltaSA = document.querySelector(`#AltaSA-select`);
const selectAltaSAS = document.querySelector(`#AltaSAS-select`);

//referencio li donde voy a colocar el historial
const liHistorial = document.querySelector(`#liHistorial`);
const ulListado = document.querySelector(`#ulListado`);

//referencias a botones
const btnCotizarImpuestos = document.querySelector(`#btnCotizarImpuestos`);
const btnCotizarContabilidad = document.querySelector(
  `#btnCotizarContabilidad`
);
const btnCotizarSociedades = document.querySelector(`#btnCotizarSociedades`);
const btnHistorial = document.querySelector(`#btnHistorial`);
const btnBorrarHistorial = document.querySelector(`#btnBorrarHistorial`);

//creo arrayS de cotizacion
const cotizacionIMP = [];
const cotizacionCNT = [];
const cotizacionSCD = [];

const valorInicial = 0;

//creo array historial y verifico si existe historial en el LocalStorage
let historial = [];
const historialLocalStorage = JSON.parse(localStorage.getItem("historial"));

//evaluo si hay historial en el Local Storage
//si hay historial, lo imprimo desde el LocalStorage
//sino muestro hidden div que avisa que no hay historial
historialLocalStorage ? imprimirHistorial() : noHayHistorial();

//pongo DEFAULT para select de servicio
servicioSelect.value = "";
//
//
//
//
/////  INICIO SERVICIO IMPOSITIVO   /////

//evento onclick para cotizar
btnCotizarImpuestos.addEventListener("click", () => {
  //prohibo inputs vacios
  if (
    inputComprobantesIMP.value === "" ||
    selectIVA.value === "" ||
    selectIIBB.value === "" ||
    selectGanancias.value === ""
  )
    return;

  //agrego valores segun el input al array cotizacion
  inputComprobantesIMP.value < 50
    ? cotizacionIMP.push(3000)
    : inputComprobantesIMP.value == 50
    ? cotizacionIMP.push(4000)
    : inputComprobantesIMP.value >= 50
    ? cotizacionIMP.push(5000)
    : false;

  //agrego valores segun los inputs al array cotizacion

  selectIVA.value == "SI" ? cotizacionIMP.push(costoImpuestoIVA) : false;
  selectIIBB.value == "SI" ? cotizacionIMP.push(costoImpuestoIIBB) : false;
  selectGanancias.value == "SI"
    ? cotizacionIMP.push(costoImpuestoGanancias)
    : false;

  //paso todos los valores del array a int
  const arrayDeValoresIMP = cotizacionIMP.map(Number);

  //sumar todos los valores del array e imprimir
  const totalImpositivo = arrayDeValoresIMP.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  //agregar cada cotizacion como un objeto con inputs elegidos como atributos
  const cotizacion = {
    tipoDeCotizacion: "Impositiva",
    nombreImpuesto1: "IVA",
    nombreImpuesto2: "IIBB",
    nombreImpuesto3: "Ganancias",
    nombreInputInicial: "Cantidad de comprobantes",

    numdeCotizacion: historial.length + 1,
    inputInicial: parseInt(inputComprobantesIMP.value),
    inputImpuesto1: selectIVA.value,
    inputImpuesto2: selectIIBB.value,
    inputImpuesto3: selectGanancias.value,
    sumaTotal: totalImpositivo,
  };
  //guardar cotizacion en array historial
  historial.push(cotizacion);

  //desestructuro datos del objeto cotizacion de IMPUESTOS
  const {
    numdeCotizacion,
    inputInicial,
    inputImpuesto1,
    inputImpuesto2,
    inputImpuesto3,
    sumaTotal,
  } = cotizacion;

  //agrego la nueva cotizacion al historial html
  const li = document.createElement("li");
  li.innerHTML = `
                  <h4>Cotización ${numdeCotizacion}, Impositiva</h4>
                  <p>Cantidad de comprobantes: ${inputInicial}</p>
                  <p>¿Cotiza IVA?: ${inputImpuesto1}</p>
                  <p>¿Cotiza IIBB?: ${inputImpuesto2}</p>
                  <p>¿Cotiza Ganancias?: ${inputImpuesto3}</p>
                  <p>COTIZACIÓN: ${sumaTotal}</p>
                  <br>
                  `;

  ulListado.append(li);

  //guardo historial en LocalStorage
  localStorage.setItem("historial", JSON.stringify(historial));

  //vacio los arrays
  cotizacionIMP.splice(0, cotizacionIMP.length);
  arrayDeValoresIMP.splice(0, arrayDeValoresIMP.length);
  //total.splice(0, total.length);

  //muestro la cotizacion por html
  // document.getElementById("totalCotizacion").innerHTML = totalImpositivo;
  // document.getElementById("hidden_div_Cotizacion").style.display =
  //   this.value != "None" ? "block" : "none";

  //MOSTRAR COTIZACION POR ALERT
  mostrarCotizacion(sumaTotal);

  //escondo div hidden Historial si está activo
  document.getElementById("hidden_div_Historial").style.display = "none";

  //escondo div hidden HistorialVaciado si está activo
  document.getElementById("hidden_div_HistorialVaciado").style.display =
    this.value = "none";

  //escondo div hidden NoHayHistorial si está activo
  document.getElementById("hidden_div_NoHayHistorial").style.display = "none";

  //vacio el casillero del input de comprobantes
  inputComprobantesIMP.value = "";
  selectIVA.value = "";
  selectIIBB.value = "";
  selectGanancias.value = "";
});

/////  FIN SERVICIO IMPOSITIVO   /////
//
//
//
//
//
/////  INICIO SERVICIO CONTABLE   /////
btnCotizarContabilidad.addEventListener("click", () => {
  //prohibo inputs vacios
  if (
    inputCuentasCNT.value === "" ||
    selectSRL.value === "" ||
    selectSA.value === "" ||
    selectSAU_SAS.value === ""
  )
    return;

  //agrego valores segun el input al array cotizacion
  inputCuentasCNT.value == 1
    ? cotizacionCNT.push(5000)
    : inputCuentasCNT.value <= 5
    ? cotizacionCNT.push(10000)
    : inputCuentasCNT.value > 5
    ? cotizacionCNT.push(20000)
    : false;

  //agrego valores segun los inputs al array cotizacion
  selectSRL.value == "SI" ? cotizacionCNT.push(costoSociedadSRL) : false;
  selectSA.value == "SI" ? cotizacionCNT.push(costoSociedadSA) : false;
  selectSAU_SAS.value == "SI"
    ? cotizacionCNT.push(costoSociedadSAS_SAU)
    : false;

  //paso todos los valores del array a int
  const arrayDeValoresCNT = cotizacionCNT.map(Number);

  //sumar todos los valores del array e imprimir
  const totalContable = arrayDeValoresCNT.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  //agregar cada cotizacion como un objeto con inputs elegidos como atributos
  const cotizacion = {
    tipoDeCotizacion: "Contable",
    nombreImpuesto1: "una SRL",
    nombreImpuesto2: "una SA",
    nombreImpuesto3: "una SAU o SAS",
    nombreInputInicial: "Cantidad de cuentas bancarias",

    numdeCotizacion: historial.length + 1,
    inputInicial: inputCuentasCNT.value,
    inputImpuesto1: selectSRL.value,
    inputImpuesto2: selectSA.value,
    inputImpuesto3: selectSAU_SAS.value,
    sumaTotal: totalContable,
  };
  //guardar cotizacion en array historial
  historial.push(cotizacion);

  //desestructuro datos del objeto cotizacion de CONTABILIDAD
  const {
    numdeCotizacion,
    tipoDeCotizacion,
    inputInicial,
    inputImpuesto1,
    inputImpuesto2,
    inputImpuesto3,
    sumaTotal,
  } = cotizacion;

  //agrego la nueva cotizacion al historial html
  const liCNT = document.createElement("li");
  liCNT.innerHTML = `
                  <h4>Cotización ${numdeCotizacion}, ${tipoDeCotizacion}</h4>
                  <p>Cantidad de cuentas bancarias: ${inputInicial}</p>
                  <p>¿Cotiza una SRL?: ${inputImpuesto1}</p>
                  <p>¿Cotiza una S.A?: ${inputImpuesto2}</p>
                  <p>¿Cotiza una SAU o SAS?: ${inputImpuesto3}</p>
                  <p>COTIZACIÓN: ${sumaTotal}</p>
                  <br>
                  `;

  ulListado.append(liCNT);

  //guardo historial en LocalStorage FIJARSE QUE NO REEMPLACE EL HISTORIA DE LO OTROS SERVICIOS
  localStorage.setItem("historial", JSON.stringify(historial));

  //vacio los arrays
  cotizacionCNT.splice(0, cotizacionCNT.length);
  arrayDeValoresCNT.splice(0, arrayDeValoresCNT.length);

  //muestro la cotizacion por html
  // document.getElementById("totalCotizacion").innerHTML = totalContable;
  // document.getElementById("hidden_div_Cotizacion").style.display =
  //   this.value != "None" ? "block" : "none";

  //MOSTRAR COTIZACION POR ALERT
  mostrarCotizacion(sumaTotal);

  //escondo div hidden Historial si está activo
  document.getElementById("hidden_div_Historial").style.display = "none";

  //escondo div hidden HistorialVaciado si está activo
  document.getElementById("hidden_div_HistorialVaciado").style.display =
    this.value = "none";

  //escondo div hidden NoHayHistorial si está activo
  document.getElementById("hidden_div_NoHayHistorial").style.display = "none";

  //vacio el casillero del input de comprobantes
  inputCuentasCNT.value = "";
  selectSRL.value = "";
  selectSA.value = "";
  selectSAU_SAS.value = "";
});
/////   FIN SERVICIO CONTABLE   /////
//
//
//
//
//
/////  INICIO SERVICIO SOCIEDADES  /////
btnCotizarSociedades.addEventListener("click", () => {
  //prohibo inputs vacios
  if (
    inputCantidadSocios.value === "" ||
    selectAltaSRL.value === "" ||
    selectAltaSA.value === "" ||
    selectAltaSAS.value === ""
  )
    return;

  //agrego valores segun el input al array cotizacion
  inputCantidadSocios.value <= 2
    ? cotizacionSCD.push(3000)
    : inputCantidadSocios.value == 3
    ? cotizacionSCD.push(5000)
    : inputCantidadSocios.value > 4 && inputCantidadSocios.value < 6
    ? cotizacionSCD.push(8000)
    : false;

  //agrego valores segun los inputs al array cotizacion
  selectAltaSRL.value == "SI"
    ? cotizacionSCD.push(costoConstitucionSociedadSRL)
    : false;
  selectAltaSA.value == "SI"
    ? cotizacionSCD.push(costoConstitucionSociedadSA)
    : false;
  selectAltaSAS.value == "SI"
    ? cotizacionSCD.push(costoConstitucionSociedadSAS)
    : false;

  //paso todos los valores del array a int
  const arrayDeValoresSCD = cotizacionSCD.map(Number);

  //sumar todos los valores del array e imprimir
  const totalSociedad = arrayDeValoresSCD.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  //agregar cada cotizacion como un objeto con inputs elegidos como atributos
  const cotizacion = {
    tipoDeCotizacion: "Sociedades",
    nombreImpuesto1: "una Alta SRL",
    nombreImpuesto2: "una Alta SA",
    nombreImpuesto3: "una Alta SAU o SAS",
    nombreInputInicial: "Cantidad de socios",

    numdeCotizacion: historial.length + 1,
    inputInicial: inputCantidadSocios.value,
    inputImpuesto1: selectAltaSRL.value,
    inputImpuesto2: selectAltaSA.value,
    inputImpuesto3: selectAltaSAS.value,
    sumaTotal: totalSociedad,
  };

  //guardar cotizacion en array historial
  historial.push(cotizacion);

  //desestructuro datos del ojeto cotizacion de SOCIEDADES
  const {
    numdeCotizacion,
    inputInicial,
    inputImpuesto1,
    inputImpuesto2,
    inputImpuesto3,
    sumaTotal,
  } = cotizacion;

  //agrego la nueva cotizacion al historial html
  const liSCD = document.createElement("li");
  liSCD.innerHTML = `
                  <h4>Cotización ${numdeCotizacion}, Sociedades</h4>
                  <p>Cantidad de socios: ${inputInicial}</p>
                  <p>¿Cotiza una Alta SRL?: ${inputImpuesto1}</p>
                  <p>¿Cotiza una Alta SA?: ${inputImpuesto2}</p>
                  <p>¿Cotiza una Alta SAS?: ${inputImpuesto3}</p>
                  <p>COTIZACIÓN: ${sumaTotal}</p>
                  <br>
                  `;

  ulListado.append(liSCD);

  //guardo historial en LocalStorage
  localStorage.setItem("historial", JSON.stringify(historial));

  //vacio los arrays
  cotizacionSCD.splice(0, cotizacionSCD.length);
  arrayDeValoresSCD.splice(0, arrayDeValoresSCD.length);

  //muestro la cotizacion POR HTML
  // document.getElementById("totalCotizacion").innerHTML = totalSociedad;
  // document.getElementById("hidden_div_Cotizacion").style.display =
  //   this.value != "None" ? "block" : "none";

  //MOSTRAR COTIZACION POR ALERT
  mostrarCotizacion(sumaTotal);

  //escondo div hidden Historial si está activo
  document.getElementById("hidden_div_Historial").style.display = "none";

  //escondo div hidden HistorialVaciado si está activo
  document.getElementById("hidden_div_HistorialVaciado").style.display =
    this.value = "none";

  //escondo div hidden NoHayHistorial si está activo
  document.getElementById("hidden_div_NoHayHistorial").style.display = "none";

  //vacio el casillero del input de comprobantes
  inputCantidadSocios.value = "";
  selectAltaSRL.value = "";
  selectAltaSA.value = "";
  selectAltaSAS.value = "";
});
//
/////  FIN SERVICIO SOCIEDADES  /////
//
//
//
//
//

//
// BOTON mostrar historial
btnHistorial.addEventListener("click", () => {
  //muestro historial
  document.getElementById("hidden_div_Historial").style.display =
    this.value != "None" ? "block" : "none";

  //escondo cotizacion final si esta activa
  document.getElementById("hidden_div_Cotizacion").style.display = "none";
});

//
//
// BOTON borrar historial
btnBorrarHistorial.addEventListener("click", () => {
  //escondo cotizacion final si esta activa
  document.getElementById("hidden_div_Cotizacion").style.display = "none";

  //borro array historial del LocalStorage
  localStorage.clear();

  //vacio array historial
  historial = [];

  //BORRAR contenido del div historial
  document.getElementById("ulListado").innerHTML = "";

  //muestro div hidden Historial si esta inactivo
  document.getElementById("hidden_div_Historial").style.display =
    this.value != "None" ? "block" : "none";

  //mostrar div hidden HistorialVaciado
  document.getElementById("hidden_div_HistorialVaciado").style.display =
    this.value != "None" ? "block" : "none";

  //muestro div hidden NoHayHistorial vaciado
  document.getElementById("hidden_div_NoHayHistorial").style.display =
    this.value != "None" ? "block" : "none";
});

//FUNCION QUE PERMITE MOSTRAR SOLAMENTE EL SERVICIO SELECCIONADO
servicioSelect.onchange = () => {
  if (servicioSelect.value === "Impositivo") {
    //muestro formulario impositivo y botones
    document.getElementById("hidden_div_Impuestos").style.display =
      servicioSelect.value != "None" ? "block" : "none";
    document.getElementById("btnCotizarImpuestos").style.display = this.value =
      "inline-block";
    document.getElementById("btnHistorial").style.display = this.value =
      "inline-block";
    document.getElementById("btnBorrarHistorial").style.display = this.value =
      "inline-block";

    //escondo otros formularios, botones e historial
    document.getElementById("hidden_div_Contabilidad").style.display = "none";
    document.getElementById("hidden_div_Sociedades").style.display = "none";
    document.getElementById("btnCotizarContabilidad").style.display = "none";
    document.getElementById("btnCotizarSociedades").style.display = "none";
    document.getElementById("hidden_div_Historial").style.display = "none";
  } else if (servicioSelect.value === "Contable") {
    //muestro formulario contable y botones
    document.getElementById("hidden_div_Contabilidad").style.display =
      servicioSelect.value != "None" ? "block" : "none";
    document.getElementById("btnCotizarContabilidad").style.display =
      this.value = "inline-block";
    document.getElementById("btnHistorial").style.display = this.value =
      "inline-block";
    document.getElementById("btnBorrarHistorial").style.display = this.value =
      "inline-block";

    //escondo otros formularios, botones e historial
    document.getElementById("hidden_div_Impuestos").style.display = "none";
    document.getElementById("hidden_div_Sociedades").style.display = "none";
    document.getElementById("btnCotizarImpuestos").style.display = "none";
    document.getElementById("btnCotizarSociedades").style.display = "none";
    document.getElementById("hidden_div_Historial").style.display = "none";
  } else if (servicioSelect.value === "Sociedades") {
    //muestro formulario contable y botones
    document.getElementById("hidden_div_Sociedades").style.display =
      servicioSelect.value != "None" ? "block" : "none";
    document.getElementById("btnCotizarSociedades").style.display = this.value =
      "inline-block";
    document.getElementById("btnHistorial").style.display = this.value =
      "inline-block";
    document.getElementById("btnBorrarHistorial").style.display = this.value =
      "inline-block";

    //escondo otros formularios, botones e historial
    document.getElementById("hidden_div_Impuestos").style.display = "none";
    document.getElementById("hidden_div_Contabilidad").style.display = "none";
    document.getElementById("btnCotizarImpuestos").style.display = "none";
    document.getElementById("btnCotizarContabilidad").style.display = "none";
    document.getElementById("hidden_div_Historial").style.display = "none";
  } else {
    document.getElementById("hidden_div_Impuestos").style.display = "none";
    document.getElementById("hidden_div_Contabilidad").style.display = "none";
    document.getElementById("hidden_div_Sociedades").style.display = "none";
    document.getElementById("btnHistorial").style.display = "none";
    document.getElementById("btnBorrarHistorial").style.display = "none";
  }
};

function imprimirHistorial() {
  historial = historialLocalStorage;

  //si hay historial, lo imprimo desde el LocalStorage
  historial.forEach((cotizacion) => {
    const {
      numdeCotizacion,
      tipoDeCotizacion,
      nombreInputInicial,
      inputInicial,
      nombreImpuesto1,
      inputImpuesto1,
      nombreImpuesto2,
      inputImpuesto2,
      nombreImpuesto3,
      inputImpuesto3,
      sumaTotal,
    } = cotizacion;

    const li = document.createElement("li");
    li.innerHTML = `
              <h4>Cotización ${numdeCotizacion}, ${tipoDeCotizacion}</h4>
               <p>${nombreInputInicial}: ${inputInicial}</p>
               <p>¿Cotiza ${nombreImpuesto1}?: ${inputImpuesto1}</p>
               <p>¿Cotiza ${nombreImpuesto2}?: ${inputImpuesto2}</p>
               <p>¿Cotiza ${nombreImpuesto3}?: ${inputImpuesto3}</p>
               <p>COTIZACIÓN: ${sumaTotal}</p>
               <br>
               `;

    ulListado.append(li);
  });
}

function noHayHistorial() {
  //muestro hidden div que avisa que no hay historial
  document.getElementById("hidden_div_NoHayHistorial").style.display =
    this.value != "None" ? "block" : "none";
}

function mostrarCotizacion(totalCotizacion) {
  swal("Por favor espere...", {
    title: "CARGANDO...",
    closeOnClickOutside: false,
    timer: 4000, //tiempo que se toma antes de desaparecer
    buttons: false,
  });

  setTimeout(function () {
    swal({
      title: "SU COTIZACION TOTAL ES: " + totalCotizacion,
      buttons: {
        catch: {
          text: "COTIZAR EN DÓLARES",
          value: "enDolares",
        },
        OK: true,
      },
      closeOnClickOutside: false,
      icon: "success",
    })
      .then((value) => {
        if (value === "enDolares") {
          return fetch(`https://www.dolarsi.com/api/api.php?type=dolar`);
        }
      })
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        const arrayDolares = json[3].casa.venta;
        totalEnDolares = totalCotizacion / parseInt(json[3].casa.venta);

        swal("Por favor espere...", {
          title: "CARGANDO...",
          closeOnClickOutside: false,
          timer: 5000,
          buttons: false,
        });

        setTimeout(function () {
          swal({
            title:
              "SU COTIZACIÓN EN DÓLARES ES: " +
              Math.round((totalEnDolares + Number.EPSILON) * 100) / 100,
            text: "Dólar BCRA de Referencia: " + arrayDolares,
            closeOnClickOutside: false,
            icon: "success",
          });
        }, 3000);
      });
  }, 2000);
}
