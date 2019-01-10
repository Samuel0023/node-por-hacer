const fs = require('fs');
const colors = require('colors');



let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    // el path que se manda es a partir del directorio raiz
    fs.writeFile('db/data.json', data,
        (err) => {
            if (err) throw new Error('No se pudo grabar', err);
        });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion, //descipcion :descripcion
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = (estado = false) => {
    cargarDB();
    console.log(estado);
    let listado = listadoPorHacer.filter(tarea => tarea.completado == estado);
    for (let i = 0; i < listado.length; i++) {
        console.log('=========Por hacer========'.green);
        console.log(listado[i].descripcion);
        console.log('Estado: ', listado[i].completado);
        console.log('=========================='.green);
    }

    // for (let tarea of listado) {
    //     console.log('=========Por hacer======'.green);
    //     console.log(tarea.descripcion);
    //     console.log('Estado: ', tarea.completado);
    //     console.log('========================'.green);
    // }
}

//esta es una funcion que recibe dos argumentos y cambia el estado de una tarea

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(
        tarea => tarea.descripcion === descripcion
    );

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        console.log('-----Tarea Finalizada---'.blue);
        console.log(colors.green(listadoPorHacer[index].descripcion));
    } else {
        console.log('Tarea No Encontrada'.red);
    }

    // let i = 0;
    // let long = listadoPorHacer.length;
    // console.log(listadoPorHacer.length);
    // while (i < long) {
    //     console.log(listadoPorHacer[i]);
    //     if (listadoPorHacer[i].descripcion === descripcion) {
    //         listadoPorHacer[i].completado = completado;
    //     }
    //     i++;
    // }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length !== listadoPorHacer.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        console.log('---Tareas Borradas---'.green);
    } else {
        console.log('---Tareas No Encontradas---'.red);
    }


    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // if (index >= 0) {
    //     //elimina el contenido de un index determinado y el index tambien
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     console.log('---Tarea Borrada---'.green);

    // } else {
    //     console.log('---Tarea No Encontrada---'.red);
    // }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}