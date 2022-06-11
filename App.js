import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Alert, Image, Modal, ActivityIndicator, Pressable, RefreshControl } from 'react-native';

const Item = ({ title, deskripsi, href, price, visib: [modalVisible, setModalVisible] = useState(false) }) => (
  <View style={styles.item}>
    <View style={styles.listBox}>
      <Image
          style={styles.logo}
          source={{uri: href}}
        />
    </View>
    <View style={styles.listBox}>
      <Text style={styles.title}>{title}</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{deskripsi}</Text>
          <Text style={styles.modalTextTwo}>{price}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Tutup</Text>
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
    <Item title={item.title} deskripsi={item.deskripsi} href={item.href} price={item.price} />
  );

  let year = new Date().getFullYear();

  const Call_RefreshControl = () => {
    setOnRefresh(true);
    setDataAPI('');
    getSentraComputer().then(() => setOnRefresh(false));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/sentralogo.png')}
        />
        <View style={styles.contactPerson}>
          <Text style={styles.caption}>Copyright © 2004-{year} Sentra Computer   •   email: info@sentracomputer.com</Text>
          <Text style={styles.caption}>Jl. Mayor Salim Batubara 87 Kupang Teba, Teluk Betung Utara, Bandar Lampung 35212   •   Phone: (0721) 488-311 / 482-590</Text>
          <Text style={styles.caption}>WhatsApp / SMS: 0811-793-123   •   Line: @sentracomputer</Text>
        </View>
      </View>
      {isLoading ? <ActivityIndicator/> : (
      <VirtualizedList
        data={dataAPI}
        initialNumToRender={4}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        keyExtractor={(item) => item.id}
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
  listBox: {
    padding: 20
  },
  item: {
    backgroundColor: '#295ebb',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 50,
    marginVertical: 30,
    marginHorizontal: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    fontSize: 12,
    color: 'white',
    textAlign: 'center'
  },
  caption: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center'
  },
  header: {
    backgroundColor: 'darkblue',
    padding: 10,
    flexDirection: 'column',
    resizeMode: 'center',
    alignItems: 'center'
  },
  contactPerson: {
    padding: 20
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'center'
  },
  centeredView: {
    flex: 1,
    padding: 10,
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
  },
  modalTextTwo: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  }
});

export default App;