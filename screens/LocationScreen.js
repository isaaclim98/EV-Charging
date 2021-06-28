import React, { useState, useEffect, Fragment } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

const carpark_image = require("../assets/carpark_zones.png");

const Stack = createStackNavigator();

export default function LocationStack() {
  global.windowWidth = useWindowDimensions().width;
  global.windowHeight = useWindowDimensions().height;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4169E1" },
        headerTintColor: "white",
        headerTitleStyle: { alignSelf: "center" },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Search"
        component={LocationScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Second Screen"
        component={LocationSecondScreen}
        options={({ route }) => ({ title: route.params.itemTitle })}
      ></Stack.Screen>
      <Stack.Screen
        name="Third Screen"
        component={LocationThirdScreen}
        options={({ route }) => ({ title: route.params.itemTitle })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function LocationScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const masterList = [
    { id: 1, title: "AMK Hub" },
    { id: 2, title: "VivoCity" },
    { id: 3, title: "Junction 8" },
    { id: 4, title: "Toa Payoh Central" },
    { id: 5, title: "Waterway Point" },
  ];

  useEffect(() => {
    setFilteredDataSource(masterList);
    setMasterDataSource(masterList);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("Second Screen", {
      itemID: item.id,
      itemTitle: item.title,
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.minicontainer}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Locations"
          placeholderTextColor="grey"
          value={search}
          inputStyle={{
            backgroundColor: "white",
            borderRadius: 5,
            color: "black",
          }}
          containerStyle={{
            backgroundColor: "#4169E1",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{ backgroundColor: "#4169E1" }}
          searchIcon={{ color: "white" }}
          clearIcon={{ color: "white" }}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ListFooterComponent={<View style={styles.minicontainer}></View>}
        />
      </SafeAreaView>
    </Fragment>
  );
}

function LocationSecondScreen({ navigation, route }) {
  const { itemID, itemTitle } = route.params;
  const [levelDataSource, setLevelDataSource] = useState([]);

  const levelList = [
    { id: 1, title: "Basement 1" },
    { id: 2, title: "Basement 2" },
    { id: 3, title: "Basement 3" },
    { id: 4, title: "Level 2" },
    { id: 5, title: "Level 3" },
    { id: 6, title: "Level 4" },
    { id: 7, title: "Level 5" },
    { id: 8, title: "Level 6" },
    { id: 9, title: "Level 7" },
  ];

  useEffect(() => {
    setLevelDataSource(levelList);
  }, []);

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("Third Screen", {
      itemID: item.id,
      itemTitle: item.title,
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.minicontainer}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={levelDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </SafeAreaView>
    </Fragment>
  );
}

function LocationThirdScreen({ navigation, route }) {
  const { itemID, itemTitle } = route.params;
  const [zoneDataSource, setZoneDataSource] = useState([]);

  return (
    <Fragment>
      <SafeAreaView style={styles.minicontainer}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        <Image source={carpark_image} style={styles.backgroundimage}></Image>
        <Text
          style={{
            position: "absolute",
            top: 200,
            left: 50,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          Zone A
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 230,
            left: 65,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          5/10
        </Text>

        <Text
          style={{
            position: "absolute",
            bottom: 230,
            left: 50,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          Queue:
        </Text>

        <Text
          style={{
            position: "absolute",
            bottom: 200,
            left: 80,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          5
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 200,
            right: 50,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          Zone B
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 230,
            right: 65,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          2/10
        </Text>

        <Text
          style={{
            position: "absolute",
            bottom: 230,
            right: 50,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          Queue:
        </Text>

        <Text
          style={{
            position: "absolute",
            bottom: 200,
            right: 80,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          8
        </Text>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
    backgroundColor: "white",
  },
  minicontainer: {
    flex: 0,
    backgroundColor: "#4169E1",
  },
  backgroundimage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});
