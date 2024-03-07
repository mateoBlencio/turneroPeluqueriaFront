import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.100:8080";

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