import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "./urls";

export const login = async (mailP, passwordP) => {
  const url = `${BASE_URL}/auth/login`;

  const credentials = { mail: mailP, password: passwordP };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      alert("Algo salio mal");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const jwtToken = data.token;
    await AsyncStorage.setItem("jwt", jwtToken);
    await AsyncStorage.setItem("mailUser", mailP)

    return jwtToken;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};


export const register = async (mailP, passwordP, dniP, nombreP) => {
  const url = `${BASE_URL}/auth/register`;

  const credentials = { mail: mailP, password: passwordP, dni: dniP, nombre: nombreP };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      alert("Algo salio mal");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const jwtToken = data.token;
    await AsyncStorage.setItem("jwt", jwtToken);
    await AsyncStorage.setItem("mailUser", mailP)

    return jwtToken;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};


export const getPeluqueros = async () => {
  const url = `${BASE_URL}/users/peluqueros`;
  
  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Devolver el listado de JSONs
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};


export const getTiposTurnos = async () => {
  const url = `${BASE_URL}/tiposturno`;
  
  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Devolver el listado de JSONs
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};

export const getHorasLibre = async (dniPeluquero, nroTipoTurno, day, month, year) => {
  const url = `${BASE_URL}/turnos/libres?dniPeluquero=${dniPeluquero}&day=${day}&month=${month}&year=${year}`;

  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Devolver el listado de JSONs
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export const createTurno = async (dniPeluquero, nroTipoTurno, fechaFormatoFecha, horaTurno) => {
  const url = `${BASE_URL}/turnos`;

  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");
  const mail = await AsyncStorage.getItem("mailUser");

  // Crear el objeto con los datos a enviar
  const datosTurno = {
    dniPeluquero: dniPeluquero,
    day: fechaFormatoFecha.getDate(),
    month: fechaFormatoFecha.getMonth() + 1,
    year: fechaFormatoFecha.getFullYear(),
    horaTurnoP: horaTurno,
    fechaActual: new Date(),
    tipoTurno: nroTipoTurno,
    mailCliente: mail,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(datosTurno), // Convertir el objeto a JSON
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    alert(`TURNO AGENDADO CON EXITO!\n
          Datos del turno:\n
          Fecha de turno: ${data.fechaTurno}\n
          Hora: ${data.horaTurno}\n
          Peluquero: ${data.nombrePeluquero}\n
          Tipo de turno: ${data.nombreTipoTurno}`)

  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};

export const getProximosTurnos = async () => {
  const mail = await AsyncStorage.getItem("mailUser");

  const day = new Date().getDate();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear(); 
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  
  const url = `${BASE_URL}/turnos/misturnos/proximos?mail=${mail}&day=${day}&month=${month}&year=${year}&hours=${hours}&minutes=${minutes}`;

  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Devolver el listado de JSONs
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export const getTurnosAnteriores = async () => {
  const mail = await AsyncStorage.getItem("mailUser");

  const day = new Date().getDate();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear(); 
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const url = `${BASE_URL}/turnos/misturnos/anteriores?mail=${mail}&day=${day}&month=${month}&year=${year}&hours=${hours}&minutes=${minutes}`;

  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Devolver el listado de JSONs
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}


export const cancelarTurno = async (numero, dniPeluquero, fechaTurno) => {

  const horaCancel = new Date().getHours();
  const minutCancel = new Date().getMinutes();
  const diaCancel = new Date().getDate();
  const mesCancel = new Date().getMonth()+1;
  const anoCancel = new Date().getFullYear(); 
  
  const url = `${BASE_URL}/turnos/cancelar?numeroTurno=${numero}&dniPeluquero=${dniPeluquero}&fechaTurno=${fechaTurno}&diaCancel=${diaCancel}&mesCancel=${mesCancel}&anoCancel=${anoCancel}&horaCancel=${horaCancel}&minutCancel=${minutCancel}`;
  
  // Obtener el JWT guardado en AsyncStorage
  const jwtToken = await AsyncStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Agregar el token JWT al encabezado de la solicitud
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}