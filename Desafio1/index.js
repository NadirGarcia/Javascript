let pieza = prompt("Ingrese el nombre de la pieza");
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
}