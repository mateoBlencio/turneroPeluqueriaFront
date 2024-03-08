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

// public ResponseEntity<Object> getTurnosDisponiblesForPeluquero(@RequestParam Long dniPeluquero,
// @RequestParam int day,
// @RequestParam int month,
// @RequestParam int year){
//   try{
//       int day = (int) requestBody.get("day");
//       int month = (int) requestBody.get("month");
//       int year = (int) requestBody.get("year");
//       LocalDate fecha = LocalDate.of(year, month, day);

//       Long dni = Long.valueOf((Integer) requestBody.get("dni"));

//       val horas = turnoService.getHorariosLibresPorPeluquero(fecha, dni)
//               .stream()
//               .map(HorasResponse::from);
//       return ResponseEntity.ok(horas);
//   } catch (Exception e){
//       return ResponseEntity.notFound().build();
//   }
// }

export const getHorasLibre = async (dniPeluquero, nroTipoTurno, day, month, year) => {
  const url = `${BASE_URL}/turnos/libres?dniPeluquero=${dniPeluquero}&day=${day}&month=${month}&year=${year}`;
  
  alert(`${day}/${month}/${year}`)

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