import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { getTurnosAnteriores } from "../api/apisFunctions";

function TurnosAnteriores() {
  const [hayAnteriorTurno, setHayAnteriorTurno] = useState(false);
  const [turnosAnteriores, setTurnosAnteriores] = useState([]);
  const [proximo, setProximo] = useState();
  const [va, setVa] = useState(true);
  const carouselRef = React.useRef(null);

  // calcula el tamaño
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth * 0.9; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnosAnterioresData = await getTurnosAnteriores();
        if (turnosAnterioresData != null && turnosAnterioresData.length > 0) {
          setHayAnteriorTurno(true);
          setTurnosAnteriores(turnosAnterioresData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleItemPress = () => {
    const currentIndex = carouselRef.current.getCurrentIndex();
    const lastIndex = turnosAnteriores.length - 1;
    const firstIndex = 0
    
    if (currentIndex === firstIndex){
      setProximo(carouselRef.current.next());
      setVa(true);
    }
    if (currentIndex === lastIndex){
      setProximo(carouselRef.current.prev());
      setVa(false);
    } 

    if ( va ){
      setProximo(carouselRef.current.next());
    } else {
      setProximo(carouselRef.current.prev());
    }

    carouselRef.current.scrollTo({ proximo });
  };

  return (
    <View>
      {hayAnteriorTurno ? (
        <View style={styles.turnosContainerDelContainer}>
          <ScrollView>
            <Carousel
              ref={carouselRef}
              loop={false}
              width={carouselWidth}
              height={100}
              autoPlay={false}
              data={turnosAnteriores}
              scrollAnimationDuration={1000}
              enabled={ turnosAnteriores.length === 1 ? false : true}
              mode='normal'
              renderItem={({ item }) => (
                <View style={styles.turnoContainer}>
                  <TouchableOpacity onPress={() => handleItemPress()}>
                    <Text style={styles.normalText}>
                      Peluquero: {item.nombrePeluquero}
                    </Text>
                    <Text style={styles.normalText}>
                      Fecha: {item.fechaTurno}
                    </Text>
                    <Text style={styles.normalText}>
                      Hora: {item.horaTurno}
                    </Text>
                    <Text style={styles.normalText}>
                      Tipo de turno: {item.nombreTipoTurno}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.normalText}>No hay turnos anteriores</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  turnosContainerDelContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  turnoContainer: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "blue",
    backgroundColor: "lightgray",
    marginHorizontal: 3,
  },
  normalText: {
    fontSize: 16,
  },
});

export default TurnosAnteriores;
