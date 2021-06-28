import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { List, Card, Paragraph, Title, ProgressBar } from "react-native-paper";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import useInterval from "../App.js";
import { queue } from "async";

var completionTime = "?";
var queueTime = "?";

var chargePercentage = 90;
var queueNumber = 0;
var timePerCar = 30;

var timeTracker = timePerCar;

var parkLocation = "VivoCity Multi-Storey Carpark";
var parkLevel = "Level 4";
var parkZone = "Zone C";
var parkLot = "Lot 35";

function HomeScreen({ navigation }) {
  let windowWidth = Dimensions.get("window").width;
  let chargingMessage, timeMessage;

  const [carCharging, setCarCharging] = useState(false);
  const [carParked, setCarParked] = useState(false);
  const [carQueueing, setCarQueueing] = useState(false);

  const [startTime, setStartTime] = useState(new Date().toLocaleString());
  const [endTime, setEndTime] = useState(new Date().toLocaleString());
  const [pressTime, setPressTime] = useState(new Date().toLocaleString());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  if (carCharging) {
    chargingMessage = "Press Car to Cancel Charging";
    if (completionTime == "?") {
      timeMessage = "Calculating time to full charge...";
    } else {
      timeMessage = completionTime + "s to full charge";
    }
  } else if (carParked && carQueueing) {
    chargingMessage = "Press Car to Cancel Queueing";
    if (queueTime == "?") {
      timeMessage = "Calculating time till your turn...";
    } else {
      timeMessage = "Estimated " + queueTime + "s till your turn";
    }
  } else {
    chargingMessage = "Press Car to Start Charging";
    timeMessage = "";
  }
  const changeChargeState = () => {
    setPressTime(currentTime);

    if (carCharging) {
      setCarCharging(false);
      setCarQueueing(false);
    } else if (carParked && !carCharging && queueNumber == 0) {
      setCarCharging(true);
      setCarQueueing(true);

      setStartTime(currentTime);
      setEndTime(currentTime + completionTime);
    } else if (carParked && !carCharging && queueNumber != 0 && !carQueueing) {
      setCarCharging(false);
      setCarQueueing(true);

      queueTime = queueNumber * timePerCar;
    } else if (carParked && !carCharging && queueNumber != 0 && carQueueing) {
      setCarCharging(false);
      setCarQueueing(false);
    } else if (!carParked) {
      Alert.alert("Car not Parked", "Unable to start charging");
    }

    if (carCharging) {
      timeMessage = completionTime + " to full charge";
    } else if (carParked && carQueueing) {
      timeMessage = queueTime + " to charge start";
    } else {
      timeMessage = "";
    }
  };

  useEffect(() => {
    let secTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    if (carCharging && chargePercentage < 100) {
      chargePercentage += 1;
      completionTime = 100 - chargePercentage;
    } else if (carCharging && chargePercentage >= 100) {
      setCarCharging(false);
      setCarQueueing(false);
      Alert.alert("Charging Complete", "Charging Process Stopped");
    } else if (carQueueing && queueNumber > 0) {
      if (timeTracker == 0) {
        timeTracker = timePerCar;
        queueNumber--;
      } else {
        timeTracker--;
      }

      queueTime = (queueNumber - 1) * timePerCar + timeTracker;

      if (queueNumber == 0) {
        setCarCharging(true);
        setCarQueueing(true);
      }
    }
  }, [currentTime]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.minicontainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.chargemessage}>{currentTime}</Text>
            <Text style={styles.chargemessage}>{chargingMessage}</Text>
            <TouchableOpacity onPress={changeChargeState}>
              <MaterialIcons
                name="directions-car"
                style={styles.carvector}
                size={windowWidth * 0.55}
                resizeMode="contain"
              ></MaterialIcons>
            </TouchableOpacity>
            <SafeAreaView style={styles.statuscolumn}>
              <SafeAreaView
                style={carParked ? styles.statusrowon : styles.statusrowoff}
              >
                <Text style={styles.tableitemcontent}>Parked</Text>
                <AntDesign
                  name={carParked ? "checkcircleo" : "closecircleo"}
                  style={styles.statusicons}
                  size={25}
                >
                  {" "}
                </AntDesign>
              </SafeAreaView>
              <SafeAreaView
                style={carCharging ? styles.statusrowon : styles.statusrowoff}
              >
                <Text style={styles.tableitemcontent}>Charging</Text>
                <AntDesign
                  name={carCharging ? "checkcircleo" : "closecircleo"}
                  style={styles.statusicons}
                  size={25}
                >
                  {" "}
                </AntDesign>
              </SafeAreaView>
              <SafeAreaView
                style={carQueueing ? styles.statusrowon : styles.statusrowoff}
              >
                <Text style={styles.tableitemcontent}>Queueing</Text>
                <AntDesign
                  name={carQueueing ? "checkcircleo" : "closecircleo"}
                  style={styles.statusicons}
                  size={25}
                >
                  {" "}
                </AntDesign>
              </SafeAreaView>
            </SafeAreaView>
            <ProgressBar
              style={{ marginTop: 5 }}
              progress={chargePercentage / 100}
              color="#4169E1"
            ></ProgressBar>
            <Text style={styles.subtitle}>
              {chargePercentage + "% Charged"}
            </Text>
            <Text style={styles.title}>{timeMessage}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>
              {carParked ? parkLocation : "Car Not Parked"}
            </Title>
            <Text style={styles.subtitle}>
              {carParked ? parkLevel + " " + parkZone : ""}
            </Text>
            <Text style={styles.subtitle}>{carParked ? parkLot : ""}</Text>
          </Card.Content>
          <Card.Content>
            <SafeAreaView style={styles.tablecolumn}>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Queue</Text>
                <Text style={styles.tableitemcontent}>{queueNumber}</Text>
              </SafeAreaView>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Start</Text>
                <Text style={styles.tableitemcontent}>
                  {carCharging ? startTime : "\n"}
                </Text>
              </SafeAreaView>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Finish</Text>
                <Text style={styles.tableitemcontent}>
                  {carCharging ? endTime : "\n"}
                </Text>
              </SafeAreaView>
            </SafeAreaView>
          </Card.Content>
        </Card>
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
  chargemessage: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
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
    backgroundColor: "cornflowerblue",
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
    marginTop: 5,
    marginBottom: 5,
  },
  tableitemcontent: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  statuscolumn: {
    padding: 100, //inner spacing
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", //y-axis
    alignItems: "center", //x-axis
    margin: 10,
    borderRadius: 20,
  },
  statusrowoff: {
    padding: 100, //inner spacing
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", //y-axis
    alignItems: "center", //x-axis
    margin: 10,
    borderRadius: 20,
    backgroundColor: "lightgrey",
  },
  statusrowon: {
    padding: 100, //inner spacing
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", //y-axis
    alignItems: "center", //x-axis
    margin: 10,
    borderRadius: 20,
    backgroundColor: "cornflowerblue",
  },
  statusicons: {
    flex: 1,
    alignSelf: "center",
  },
});
