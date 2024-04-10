import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, RefreshControl, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TurnosRecientes from "./TurnosRecientes";
import TurnosCancelados from "./TurnosCancelados";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const TurnosAntiguos = () =>{
    const windowHeight = Dimensions.get("window").height;
    const heightW = windowHeight * 0.5;

    return(
        <SafeAreaView style={styles.container}        >
            <View style={styles.box}>
                <Text style={styles.title}>Turnos recientes</Text>
                <TurnosRecientes/>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>Turnos cancelados</Text>
                <TurnosCancelados />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:6,
        flexDirection:'column',
    },
    box:{
        height: '50%'
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    }
})

export default TurnosAntiguos