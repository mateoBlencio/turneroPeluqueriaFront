import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // lo ideal seria que despues todo el codigo referido a la comunicacion con la api la movamos
  const handleLogin = (email, pass) => {
    const credentials = {
      mail: mail,
      password: password
    };
    navigation.navigate("Tabs");
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then(async(data) => {
    //     // Aquí se guarda el JWT del servidor
    //     const jwtToken = data.token;
    //     try {
    //       await AsyncStorage.setItem("jwt", jwtToken);
    //       navigation.navigate("Tabs");
    //     } catch (error) {
    //       console.error("Error saving data:", error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText1}>Peluqueria</Text>
          <Text style={styles.headerText2}>il Giani</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo electronico o usuario"
            value={mail}
            onChangeText={(text) => setMail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.buttonsBox}>
            <Button
              title="Iniciar Sesión"
              onPress={() => handleLogin(mail, password)}
              color={"red"}
            />
          </View>

          <View style={styles.buttonsBox}>
            <Button title="Crear cuenta" onPress={() => handleSignUp()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#253a55",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText1: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffff",
  },
  headerText2: {
    fontSize: 40,
    fontWeight: "300",
    color: "#ffff",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 15,
    color: "#c7cccf",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  buttonsBox: {
    width: "100%",
    marginVertical: 10,
  },
});

export default Login;
