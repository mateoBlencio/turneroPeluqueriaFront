import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ScrollView } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.105:8080/roles')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Número: {item.numero}</Text>
      <Text style={styles.text}>Nombre: {item.nombre}</Text>
    </View>
  );

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Usuarios</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.numero.toString()}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'gray',
  },
  header: {
    backgroundColor: '#87CEFA',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  item: {
    backgroundColor: '#87CEFA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
  },

});
