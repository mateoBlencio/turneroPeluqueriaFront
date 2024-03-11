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
import { getProximosTurnos } from "../api/apisFunctions";

function ProximoTurno() {
  const [hayProximoTurno, setHayProximoTurno] = useState(false);
  const [turnosProximos, setTurnosProximos] = useState([]);
  const carouselRef = React.useRef(null);

  // calcula el tamaño
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth * 0.9; // 80% del ancho de la pantalla

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnosProximosData = await getProximosTurnos();
        if (turnosProximosData != null && turnosProximosData.length > 0) {
          setHayProximoTurno(true);
          setTurnosProximos(turnosProximosData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleItemPress = () => {
    const currentIndex = carouselRef.current.getCurrentIndex();
    const lastIndex = turnosProximos.length - 1;

    if (currentIndex === lastIndex) {
      carouselRef.current.scrollTo({ index: 0 });
    } else {
      carouselRef.current.next();
    }
  };

  return (
    <View>
      {hayProximoTurno ? (
        <View style={styles.turnosContainerDelContainer}>
          <ScrollView>
            <Carousel
              ref={carouselRef}
              loop={false}
              width={carouselWidth}
              height={100}
              autoPlay={false}
              data={turnosProximos}
              scrollAnimationDuration={1000}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 100,
                parallaxAdjacentItemScale: 0.5,
              }}
              renderItem={({ item, index }) => (
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
        <Text style={styles.normalText}>No hay turnos agendados</Text>
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

export default ProximoTurno;
