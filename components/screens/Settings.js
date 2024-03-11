import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function Settings({navigation}) {
    const LogOut = () => {
        navigation.navigate("Login");
    }

    return(
        <View style={styles.container}>
            <Button title="Cerrar sesion" onPress={()=>LogOut()}
                color={"red"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:20,
        marginHorizontal:10
    }
})


export default Settings;