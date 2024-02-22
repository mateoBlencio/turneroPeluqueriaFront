import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import Navigator from "../Navigation";


const Login = () => {
    const [data, setData] = useState([]);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState(false);

    /*
    useEffect(() => {
    fetch("http://192.168.1.105:8080/roles")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    */

    const handleLogin = (email, pass) => {
        setFlag(true);
    };

    return(
        <SafeAreaView style={styles.container}>
            {!flag && 
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bienvenido!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Mail" value={mail} onChangeText={(text) => setMail(text)}/>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}/>
                    <Text style={styles.textButtoms}>No tiene cuenta? <Text style={{textDecorationLine: 'underline',color: 'blue'}}>
                    Registrarse</Text></Text>
                    <Button title="Iniciar Sesión" onPress={() => handleLogin(mail, password)} />
                </View>
            </View>
            }
            {flag && <Navigator />}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      backgroundColor: "#87CEFA",
      paddingTop: 40,
      paddingBottom: 15,
      alignItems: "center",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
    },
    inputContainer: {
      padding: 20,
    },
    input: {
      marginBottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
    },
    textButtoms: {
      padding: 10,
      textAlign: "center"
    }
});

export default Login;