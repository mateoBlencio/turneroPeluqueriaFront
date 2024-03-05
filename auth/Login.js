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
                    <Text style={styles.headerText1}>Peluqueria</Text>
                    <Text style={styles.headerText2}>il Giani</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Correo electronico o usuario" value={mail} onChangeText={(text) => setMail(text)}/>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}/>
                    <Text style={styles.subtitle}>Has olvidado la constraseña?</Text>

                    <Button title="Iniciar Sesión" onPress={() => handleLogin(mail, password) } style={styles.button} />
                    <Button title="Crear cuenta" onPress={() => handleSignUp()} />
                </View>
            </View>
            }
            {
              flag && 
              <Navigator />
            }
            
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
      alignItems: 'center',
      justifyContent: 'center',
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
      button: {
        height: 50,
        width: '80%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 15,
      },
    // textButtoms: {
    //   padding: 10,
    //   textAlign: "center"
    // }
});

export default Login;