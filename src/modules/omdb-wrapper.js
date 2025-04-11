import axios from "axios";
import https from 'https';

const agent = new https.Agent({  
    rejectUnauthorized: false
});

const APIKEY = "479fae35";

const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    try {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                s: searchText,
                page: page,
                apikey: APIKEY
            },
            httpsAgent: agent
        });

        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = parseInt(response.data.totalResults, 10);
            returnObject.datos = response.data.Search;
        } else {
            returnObject.respuesta = false;
            returnObject.datos = [];
        }
    } catch (error) {
        console.error("Error en OMDBSearchByPage:", error);
        returnObject.respuesta = false;
        returnObject.datos = [];
    }

    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    let page = 1;
    let totalResults = 0;

    try {
        const firstResponse = await axios.get('https://www.omdbapi.com/', {
            params: {
                s: searchText,
                page: page,
                apikey: APIKEY
            },
            httpsAgent: agent
        });

        if (firstResponse.data.Response === "True") {
            totalResults = parseInt(firstResponse.data.totalResults, 10);
            returnObject.respuesta = true;
            returnObject.cantidadTotal = totalResults;
            returnObject.datos = firstResponse.data.Search;

            const totalPages = Math.ceil(totalResults / 10);
            for (let i = 2; i <= totalPages; i++) {
                const response = await axios.get('https://www.omdbapi.com/', {
                    params: {
                        s: searchText,
                        page: i,
                        apikey: APIKEY
                    },
                    httpsAgent: agent
                });

                if (response.data.Response === "True") {
                    returnObject.datos = returnObject.datos.concat(response.data.Search);
                }
            }
        } else {
            returnObject.respuesta = false;
            returnObject.datos = [];
        }
    } catch (error) {
        console.error("Error en OMDBSearchComplete:", error);
        returnObject.respuesta = false;
        returnObject.datos = [];
    }

    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: {}
    };

    try {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                i: imdbID,
                apikey: APIKEY
            },
            httpsAgent: agent
        });

        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.datos = response.data;
        } else {
            returnObject.respuesta = false;
            returnObject.datos = {};
        }
    } catch (error) {
        console.error("Error en OMDBGetByImdbID:", error);
        returnObject.respuesta = false;
        returnObject.datos = {};
    }

    return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
