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

const stockInicial = 5
const movimiento = prompt("Ingrese el tipo de movimiento a realizar: \n 1 Sumar a Stock \n 2 Vender \n 3 ESC");
const item = prompt("Ingrese el producto: \n 1 Tornillo \n 2 Tuerca \n 3 Arandela");

const suma= (stockInicial, cantidad) => stockInicial + cantidad;
const venta = (stockInicial, cantidad) => stockInicialk - cantidad;
function producto(item){
    switch(item){
        case "1":
            return "Tornillos";
            break;
        case "2":
            return "Tuercas";
            break;
        case "3":
            return "Arandelas";
            break;
        default:
            alert("Error");
            break;
    }
    item = prompt("Ingrese el producto: \n 1 Tornillo \n 2 Tuerca \n 3 Arandela");
} 
while(movimiento != "3"){
    const cantidad = parseInt(prompt("Ingrese la cantidad"));
    switch(movimiento){
        case "1":
            alert(`"Su stock actual es ${suma(stockInicial, cantidad)} ${producto(item)}"`);
            break;
        case "2":
            alert(`"Su stock actual es ${venta(stockInicial, cantidad)} ${producto(item)}"`);
            break;
        default:
            break;
    }
    movimiento = prompt("Ingrese el tipo de movimiento a realizar: \n 1 Sumar a Stock \n 2 Vender \n 3 ESC");
}