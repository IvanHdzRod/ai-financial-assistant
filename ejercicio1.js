// ejercicio1.js

async function consultarTipoCambio(monedaBase) {
  const url = `https://api.frankfurter.app/latest?from=${monedaBase}`;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió un error al consultar la API:", error.message);
  }
}

async function main() {
  const monedas = ["USD", "EUR", "MXN"];

  for (const moneda of monedas) {
    console.log(`\nConsultando tipo de cambio para: ${moneda}`);
    const resultado = await consultarTipoCambio(moneda);

    if (resultado) {
      console.log(`Moneda base: ${resultado.base}`);
      console.log(`Fecha: ${resultado.date}`);
      for (const [destino, valor] of Object.entries(resultado.rates)) {
        console.log(`  ${destino}: ${valor}`);
      }
    }
  }
}

main();