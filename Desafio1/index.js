let inicio = prompt("Bienvenido, elije la operación a realizar \n 1. Sumar producto \n 2. Trabajar con lista predeterminada")
let stockInicial = 5
let lista = ["TORNILLOS", "TUERCAS", "ARANDELAS"];

const suma = (stockInicial, cantidad) => stockInicial + cantidad;
const venta = (stockInicial, cantidad) => stockInicial - cantidad;


function producto(item) {
    switch (item) {
        case "1":
            return lista[0];
        case "2":
            return lista[1];
        case "3":
            return lista[2];
        default:
            alert("ERROR");
            break;
    }
}

while (inicio === "1"){
    let agregar = prompt("Marque 1 para agregar un producto \n Marque 2 para salir");
    if(agregar === "1"){
        let agregarMas = prompt("Ingrese el nombre del producto")
        lista.push(agregarMas.toUpperCase());
        alert(lista.join("\n"));
    }else{
    inicio = prompt("1. Agregar producto a la lista \n 2. Trabajar con lista predeterminada")
    }
}

    let movimiento = prompt("Ingrese el tipo de movimiento a realizar: \n 1.Sumar a Stock \n 2.Vender \n 3.ESC")
    while (movimiento !== "3") {
    if (movimiento !== "1" && movimiento !== "2") {
        movimiento = prompt("Usted ingreso un valor no valido. \n Ingrese el tipo de movimiento a realizar: \n 1.Sumar a Stock \n 2.Vender \n 3.ESC")
    } else {
        let item = prompt("Ingrese el producto: \n 1.Tornillo \n 2.Tuerca \n 3.Arandela");
        let cantidad = parseInt(prompt("Ingrese la cantidad"));
        switch (movimiento) {
            case "1":
                alert(`"Su stock actual es ${suma(stockInicial, cantidad)} ${producto(item)}"`);
                break;
            case "2":
                alert(`"Su stock actual es ${venta(stockInicial, cantidad)} ${producto(item)}"`);
                break;
            case "ESC":
                alert("el ciclo ha finalizado")
                break
        }
        movimiento = prompt("Ingrese el tipo de movimiento a realizar: \n 1.Sumar a Stock \n 2.Vender \n 3.ESC")
    }
}

if (movimiento === "3") {
    alert("el ciclo ha finalizado")
}

