export default class Alumno {
    constructor(username, dni, edad) {
        this.username = username;
        this.dni = dni;
        this.edad = edad;
    }

    toString() {
        return `${this.username} (DNI: ${this.dni}, Edad: ${this.edad})`;
    }
}
