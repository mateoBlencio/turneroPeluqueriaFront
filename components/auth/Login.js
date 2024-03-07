import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";

function Login ({ navigation }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (email, pass) => {
    navigation.navigate("Tabs")
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
              <Button 
                title="Crear cuenta" 
                onPress={() => handleSignUp()} 
              />
            </View>
          
          </View>
        </View>
    </SafeAreaView>
  );
};

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
  }
});

export default Login;
