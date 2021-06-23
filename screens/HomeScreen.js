import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { List, Card, Paragraph, Title, ProgressBar } from "react-native-paper";
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

var completionTime = "1h20m";
var chargePercentage = 0.75;

var parkLocation = "VivoCity Multi-Storey Carpark";
var parkLevel = "Level 4";
var parkZone = "Zone C";
var parkLot = "Lot 35";

var queueNumber = 1;
var startTime = "1:24PM";
var endTime = "3:17PM";

function HomeScreen({ navigation }) {
  let windowWidth = Dimensions.get("window").width;
  let chargingMessage, timeMessage;

  const [carCharging, setCarCharging] = useState(false);
  const [carParked, setCarParked] = useState(true);
  const [carQueueing, setCarQueueing] = useState(false);

  if (carCharging) {
    chargingMessage = "Currently Charging";
    timeMessage = completionTime + " to full charge";
  } else if (!carParked) {
    chargingMessage = "Not Parked";
    timeMessage = "";
  } else if (carParked && carQueueing) {
    chargingMessage = "Currently In Queue";
    timeMessage = completionTime + " to full charge";
  } else if (carParked && !carQueueing) {
    chargingMessage = "Not Charging";
    timeMessage = "";
  }

  const changeChargeState = () => {
    if (carCharging) {
      setCarCharging(false);
      setCarQueueing(false);
    } else if (carParked && !carCharging && queueNumber == 1) {
      setCarCharging(true);
      setCarQueueing(true);
    } else if (carParked && !carCharging && queueNumber != 1 && !carQueueing) {
      setCarCharging(false);
      setCarQueueing(true);
    } else if (carParked && !carCharging && queueNumber != 1 && carQueueing) {
      setCarCharging(false);
      setCarQueueing(false);
    }

    if (carCharging) {
      chargingMessage = "Currently Charging";
      timeMessage = completionTime + " to full charge";
    } else if (!carParked) {
      chargingMessage = "Not Parked";
      timeMessage = "";
    } else if (carParked && carQueueing) {
      chargingMessage = "Currently In Queue";
      timeMessage = completionTime + " to full charge";
    } else if (carParked && !carQueueing) {
      chargingMessage = "Not Charging";
      timeMessage = "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.minicontainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{chargingMessage}</Text>
            <Text style={styles.title}>{timeMessage}</Text>
          </Card.Content>
          <Card.Content>
            <TouchableOpacity onPress={changeChargeState}>
              <Feather
                name="battery-charging"
                style={
                  carCharging ? styles.batteryvectoron : styles.batteryvectoroff
                }
                size={windowWidth * 0.08}
              />
            </TouchableOpacity>
            <MaterialIcons
              name="directions-car"
              style={styles.carvector}
              size={windowWidth * 0.55}
              resizeMode="contain"
            ></MaterialIcons>
            <ProgressBar
              style={{ marginTop: 5 }}
              progress={chargePercentage}
              color="#4169E1"
            ></ProgressBar>
            <Text style={styles.subtitle}>
              {chargePercentage * 100 + "% Charged"}
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{parkLocation}</Title>
            <Text style={styles.subtitle}>{parkLevel + " " + parkZone}</Text>
            <Text style={styles.subtitle}>{parkLot}</Text>
          </Card.Content>
          <Card.Content>
            <SafeAreaView style={styles.tablecolumn}>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Queue:</Text>
                <Text style={styles.tableitemcontent}>{queueNumber}</Text>
              </SafeAreaView>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Start:</Text>
                <Text style={styles.tableitemcontent}>{startTime}</Text>
              </SafeAreaView>

              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Finish:</Text>
                <Text style={styles.tableitemcontent}>{endTime}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </Card.Content>
        </Card>
        <List.Section title="Frequently Asked Questions">
          <List.Accordion title="What is this for?">
            <List.Item title="We celebrate the birth of potatoes." />
          </List.Accordion>
          <List.Accordion title="When will this be?">
            <List.Item title="Whenever this pandemic is over." />
          </List.Accordion>
          <List.Accordion title="Where will this be?">
            <List.Item title="Ireland" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4169E1" },
        headerTintColor: "white",
        headerTitleStyle: { alignSelf: "center" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botcontainer: {
    flex: 0,
    backgroundColor: "#4169E1",
  },
  minicontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  carvector: {
    alignSelf: "center",
    color: "#4169E1",
    flex: 1,
  },
  batteryvectoron: {
    alignSelf: "center",
    color: "green",
    flex: 1,
  },
  batteryvectoroff: {
    alignSelf: "center",
    color: "red",
    flex: 1,
  },
  tablecolumn: {
    padding: 100, //inner spacing
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", //y-axis
    alignItems: "center", //x-axis
    margin: 10,
    borderRadius: 20,
    backgroundColor: "lightgrey",
  },
  tablerow: {
    padding: 100, //inner spacing
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", //y-axis
    alignItems: "center", //x-axis
    margin: 10,
    borderRadius: 20,
  },
  tableitemheader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  tableitemcontent: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

const dataArray = [
  {
    title: "What is this?",
    content: "Exactly what the title says. A basket throwing competition!",
  },
  {
    title: "Who is this by?",
    content:
      "The International Society of Basket Throwers (ISBT). We love throwing baskets.",
  },
  {
    title: "Why is this?",
    content: "Because baskets! Wheee!",
  },
];
