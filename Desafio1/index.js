/* let pieza = prompt("Ingrese el nombre de la pieza");
let cantidad = prompt("Ingrese la cantidad de piezas");

for( let i = 0; i < 10; i++){
    if(cantidad == 0){
        alert(`" NO tienes Stock de ${pieza}"`);
    }else if(cantidad < 3){
        alert(`"Tienes Stock bajo de ${pieza}"`);
    }else{
        alert(`"Tienes Stock suficiente de ${pieza}"`);
    }
    pieza = prompt("Ingrese otra pieza");
    cantidad = prompt("Ingrese la cantidad de piezas");
} */


let movimiento = prompt("Ingrese el tipo de movimiento a realizar: \n 1 Sumar a Stock \n 2 Vender \n 3 ESC");
let stockInicial = 5

const suma = (stockInicial, cantidad) => stockInicial + cantidad;
const venta = (stockInicial, cantidad) => stockInicial - cantidad;

function producto(item) {
    switch (item) {
        case "1":
            return "Tornillos";
        case "2":
            return "Tuercas";
        case "3":
            return "Arandelas";
        default:
            alert("Error");
            break;
    }
}

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