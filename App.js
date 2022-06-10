import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Alert, Image, Modal, ActivityIndicator, Pressable, RefreshControl } from 'react-native';

const Item = ({ title, deskripsi, href, visib: [modalVisible, setModalVisible] = useState(false) }) => (
  <View style={styles.item}>
    <Image
        style={styles.logo}
        source={{uri: href}}
      />
    <Text style={styles.title}>{title}</Text>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{deskripsi}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.textStyle}>Deskripsi</Text>
    </Pressable>
  </View>
);

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataAPI, setDataAPI] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);

  const getSentraComputer = async () => {
     try {
      const response = await fetch('https://app-sentracomputer-backend.herokuapp.com/sentracomputer');
      const json = await response.json();
      setDataAPI(json.laptop);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSentraComputer();
  }, []);

  const renderItem = ({ item }) => (
    <Item title={item.title} deskripsi={item.deskripsi} href={item.href} />
  );

  let year = new Date().getFullYear();

  const Call_RefreshControl = () => {
    setOnRefresh(true);
    setDataAPI('');
    getSentraComputer().then(() => setOnRefresh(false));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.header}
        source={require('./assets/sentralogo.png')}
      />
      <Text style={styles.caption}>Copyright © 2004-{year} Sentra Computer   •   email: info@sentracomputer.com</Text>
      <Text style={styles.caption}>Jl. Mayor Salim Batubara 87 Kupang Teba, Teluk Betung Utara, Bandar Lampung 35212   •   Phone: (0721) 488-311 / 482-590</Text>
      <Text style={styles.caption}>WhatsApp / SMS: 0811-793-123   •   Line: @sentracomputer</Text>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={dataAPI}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={onRefresh}
            onRefresh={Call_RefreshControl}
          />
        }
      />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0bbea',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#295ebb',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  caption: {
    fontSize: 8,
    color: '#295ebb',
    textAlign: 'center'
  },
  header: {
    resizeMode: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 340,
    height: 300,
    resizeMode: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#1c2680",
  },
  buttonClose: {
    backgroundColor: "#295ebb",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;