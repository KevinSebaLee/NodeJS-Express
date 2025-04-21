import express from "express"
import cors from "cors"
import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar/:nombre', (req, res) => {
    res.send(`Nombre: ${req.params.nombre}`);
})

app.get('/validarFecha/:ano/:mes/:dia', (req, res) => {
    let fechaValidar = Date.parse(`${req.params.mes}/${req.params.dia}/${req.params.ano}`)

    if(!(isNaN(fechaValidar))){
        res.status(200).send(new Date(fechaValidar).toDateString())
    }
    else{
        res.status(404).send('<h2>Fecha no valida</h2>')
    }
})

app.get('/matematica/sumar', (req, res) => {
    let numero1 = parseInt(req.query.n1)
    let numero2 = parseInt(req.query.n2)

    if(!(isNaN(numero1)) && !(isNaN(numero2))){
        res.status(200).send(`${numero1} + ${numero2} = ${sumar(numero1, numero2)}`)
    }
    else{
        res.status(404).send('<h2>Numero no valido</h2>')
    }
})

app.get('/matematica/restar', (req, res) => {
    let numero1 = parseInt(req.query.n1)
    let numero2 = parseInt(req.query.n2)

    if(!(isNaN(numero1)) && !(isNaN(numero2))){
        res.status(200).send(`${numero1} - ${numero2} = ${restar(numero1, numero2)}`)
    }
    else{
        res.status(404).send('<h2>Numero no valido</h2>')
    }
})

app.get('/matematica/multiplicar', (req, res) => {
    let numero1 = parseInt(req.query.n1)
    let numero2 = parseInt(req.query.n2)

    if(!(isNaN(numero1)) && !(isNaN(numero2))){
        res.status(200).send(`${numero1} x ${numero2} = ${multiplicar(numero1, numero2)}`)
    }
    else{
        res.status(404).send('<h2>Numero no valido</h2>')
    }
})

app.get('/matematica/dividir', (req, res) => {
    let numero1 = parseInt(req.query.n1)
    let numero2 = parseInt(req.query.n2)

    if(!(isNaN(numero1)) && !(isNaN(numero2)) && !(numero2 === 0)){
        res.status(200).send(`${numero1} / ${numero2} = ${dividir(numero1, numero2)}`)
    }
    else if(numero2 === 0){
        res.status(404).send('<h2>Numero 2 no puede ser 0</h2>')
    }
    else{
        res.status(404).send('<h2>Numero no valido</h2>')
    }
})

app.get('/ombd/searchByPage', async(req, res) => {
    res.status(200).send(await OMDBSearchByPage(req.query.search))
})

app.get('/ombd/searchcomplete', async(req, res) =>{
    res.status(200).send(await OMDBSearchComplete(req.query.search))
})

app.get('/omdb/getbyomdbid', async(req, res) =>{
    res.status(200).send(await OMDBGetByImdbID(req.query.id))
})

app.get('/alumnos', (req, res) => {
    const alumnosArray = [];

    alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
    alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
    alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

    const alumnosList = alumnosArray.map((alumno) => `${alumno}`); 

    res.status(200).send(alumnosList);
})

app.get('/alumnos/:dni', (req, res) => {
    const alumnosArray = [];

    alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
    alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
    alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

    let dni = req.params.dni

    AlumnoBuscado = new Alumno()

    for(let i = 0; i < alumnosArray.length; i++){
        if(alumnosArray[i].dni == dni){
            AlumnoBuscado = alumnosArray[i]
        }
    }

    if(!(AlumnoBuscado == null)){
        res.status(200).send(AlumnoBuscado)
    }
    else{
        res.status(404).send("Alumno no encontrado")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})