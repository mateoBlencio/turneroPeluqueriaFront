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
import ButtonGradient from './ButtonGradient';


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
                    <Text style={styles.headerText1}>Peluqueria</Text>
                    <Text style={styles.headerText2}>il Giani</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Correo electronico o usuario" value={mail} onChangeText={(text) => setMail(text)}/>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}/>
                    <Text style={styles.subtitle}>Has olvidado la constraseña?</Text>

                    <ButtonGradient mensaje={'Iniciar Sesion'} onPress={() => handleLogin(mail, password)}></ButtonGradient>
                    <ButtonGradient mensaje={'Crear Cuenta'} onPress={() => handleLogin(mail, password)}></ButtonGradient>
                    {/* <Text style={styles.textButtoms}>No tiene cuenta? <Text style={{textDecorationLine: 'underline',color: 'blue'}}>
                    Registrarse</Text></Text>
                    <Button title="Iniciar Sesión" onPress={() => handleLogin(mail, password)} /> */}
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
      backgroundColor: '#253a55',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      backgroundColor: "#87CEFA",
      paddingTop: 40,
      paddingBottom: 15,
      alignItems: "center",
    },
    headerText1: {
      fontSize: 50,
      fontWeight: "bold",
      color: '#ffff',

    },
    headerText2: {
      fontSize: 40,
      fontWeight: "300",
      color: '#ffff',
    },
    subtitle: {
      marginTop: 15,
      fontSize: 15,
      color: "#c7cccf",
    },
    inputContainer: {
      padding: 20,
    },
    input: {
      height: 50,
      width: '80%',
      marginTop: 20,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'gray',
      },
    // textButtoms: {
    //   padding: 10,
    //   textAlign: "center"
    // }
});

export default Login;