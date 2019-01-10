// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

//console.log(argv);

switch (comando) {
    case 'crear':
        console.log('Crear Por Hacer');
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        console.log('Mostrar todas las tareas por hacer');
        porHacer.getListado(argv.estado);
        // para cambiar los comando de false a true solo basta con poner -c o - e del alias que los representa
        break;
    case 'actualizar':

        porHacer.actualizar(argv.descripcion, argv.completado);

        break;
    case 'borrar':

        let borrado = porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('Comando No Reconocido');
        break;
}