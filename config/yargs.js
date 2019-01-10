const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripcion de la Tarea por Hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra todas las tareas que tenemos completadas', {
        estado: {
            alias: 'e',
            default: false
        }
    })
    .command('borrar', 'Borra una tarea del listado de tareas', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}