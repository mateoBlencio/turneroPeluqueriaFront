import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { getProximosTurnos, cancelarTurno } from "../api/apisFunctions";

// icons
import { MaterialIcons } from "@expo/vector-icons";

function ProximoTurno({ refreshPadre }) {
  const [hayProximoTurno, setHayProximoTurno] = useState(false);
  const [proximo, setProximo] = useState();
  const [va, setVa] = useState(true);
  const [turnosProximos, setTurnosProximos] = useState([]);
  const carouselRef = React.useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [primeraCarga, setPrimeraCarga] = useState(true);

  // calcula el tamaño
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth * 0.9;

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
    
    if (primeraCarga || refresh || refreshPadre){
      fetchData();
      setPrimeraCarga(false);
    }
  }, [refresh, primeraCarga, refreshPadre]);

  const handleItemPress = () => {
    const currentIndex = carouselRef.current.getCurrentIndex();
    const lastIndex = turnosProximos.length - 1;
    const firstIndex = 0;

    if (currentIndex === firstIndex) {
      setProximo(carouselRef.current.next());
      setVa(true);
    }
    if (currentIndex === lastIndex) {
      setProximo(carouselRef.current.prev());
      setVa(false);
    }

    if (va) {
      setProximo(carouselRef.current.next());
    } else {
      setProximo(carouselRef.current.prev());
    }

    carouselRef.current.scrollTo({ proximo });
  };

  const [cartelDelete, setCartelDelete] = useState(false);
  const handleDelete = async (item) => {
    try {
      const { numero, dniPeluquero, fechaTurno } = item;
      await cancelarTurno(numero, dniPeluquero, fechaTurno);
      setTurnosProximos(turnosProximos.filter(turno => turno.numero != item.numero))
      setCartelDelete(false);
      setRefresh(true);
      alert("Turno cancelado!");
    } catch (error) {
      console.error(error.message);
      setCartelDelete(false);
      alert("No se pudo cancelar el turno.");      
    } 
  };

  return (
    <View>
      {turnosProximos.length > 0 ? (
        <View style={styles.turnosContainerDelContainer}>
          <ScrollView>
            <Carousel
              ref={carouselRef}
              loop={false}
              width={carouselWidth}
              height={100}
              autoPlay={false}
              data={turnosProximos}
              enabled={turnosProximos.length === 1 ? false : true}
              scrollAnimationDuration={1000}
              mode="normal"
              renderItem={({ item }) => (
                <View>
                  {cartelDelete ? (
                    <View style={styles.cartelDeleteContainer}>
                      <Text style={{ textAlign: "center", fontSize: 15 }}>
                        ¿DESEA CANCELAR EL TURNO?
                      </Text>
                      <Text style={{ textAlign: "center" }}>
                        Se cancelara solo si faltan mas de 24hs para el turno
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginHorizontal: 30,
                        }}
                      >
                        <Button
                          title="No cancelar"
                          color={"blue"}
                          onPress={() => setCartelDelete(false)}
                        />
                        <Button
                          title="Si, seguro"
                          color={"red"}
                          onPress={() => handleDelete(item)}
                        />
                      </View>
                    </View>
                  ) : (
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
                        <View style={styles.deleteButonContainer}>
                          <TouchableOpacity
                            onPress={() => setCartelDelete(true)}
                          >
                            <MaterialIcons
                              name="cancel"
                              size={35}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                    </View>
                  )}
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
  normalText: {
    fontSize: 16,
  },
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

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButonContainer: {
    marginRight: 10,
  },
  cartelDeleteContainer: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "blue",
    backgroundColor: "lightgray",
  },
});

export default ProximoTurno;
