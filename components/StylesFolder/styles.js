import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    turnosCanceladosContainer:{
      borderRadius: 5,
      borderColor: "lightgray",
      borderWidth: 1,
      padding:7,
      height:'85%'
    },
    normalText: {
      fontSize: 16,
    },
    turnoContainer: {
      paddingVertical: 4,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "blue",
      backgroundColor: "lightgray",
      marginHorizontal: 5,
      marginVertical: 2,
    },
    centerGiantText:{
      fontSize:21,
      textAlign: 'center',
      fontWeight: "bold"
    }
});

export default styles;