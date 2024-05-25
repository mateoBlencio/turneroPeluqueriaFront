import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Settings({ navigation }) {
  const LogOut = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{backgroundColor:"#D9D9D9"}}>
      <View style={styles.container}>
        <Button title="Cerrar sesion" onPress={() => LogOut()} color={"red"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10
  },
});

export default Settings;
