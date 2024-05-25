import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { login } from "../api/apisFunctions";

function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const authority = await login(mail, password);
      setLoading(false);
      navigation.navigate("Tabs", {authority: authority});
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText1}>Peluqueria</Text>
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
              <Button
                title="Crear cuenta"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.spinnerStyleContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A6A6A6",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText1: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#404040",
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

  spinnerStyleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A6A6A6",
  },
});

export default Login;
