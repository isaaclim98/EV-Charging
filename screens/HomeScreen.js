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
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  let windowWidth = Dimensions.get("window").width;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}> Time to Charge Complete: </Title>
            <Text style={styles.subtitle}>___________</Text>

            <Paragraph style={styles.title}></Paragraph>
            <Paragraph>Hello world</Paragraph>
          </Card.Content>
          <Card.Content>
            <TouchableOpacity
              onPress={() => navigation.navigate("Current Charge")}
            >
              <FontAwesome5
                name="car-alt"
                style={styles.carvector}
                size={windowWidth * 0.75}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <ProgressBar
              style={{ marginTop: 30 }}
              progress={0.75}
              color="blue"
            ></ProgressBar>
            <Text style={styles.subtitle}>__% Charged</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.subtitle}>Insert Location Here</Text>
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

function currentChargeScreen({ navigation }) {
  let windowWidth = Dimensions.get("window").width;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}> Main Location </Title>
            <Text style={styles.subtitle}>Level and Zone</Text>
            <Text style={styles.subtitle}>Lot Number</Text>

            <Paragraph style={styles.title}></Paragraph>
            <Paragraph>Hello world</Paragraph>
          </Card.Content>
          <Card.Content>
            <SafeAreaView style={styles.tablecolumn}>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Queue:</Text>
                <Text style={styles.tableitemcontent}>Queue Number</Text>
              </SafeAreaView>
              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Start:</Text>
                <Text style={styles.tableitemcontent}>Start Time</Text>
              </SafeAreaView>

              <SafeAreaView style={styles.tablerow}>
                <Text style={styles.tableitemheader}>Finish:</Text>
                <Text style={styles.tableitemcontent}>Finish Time</Text>
              </SafeAreaView>
            </SafeAreaView>
          </Card.Content>
          <Card.Content>
            <FontAwesome5
              name="car-alt"
              style={styles.carvector}
              size={windowWidth * 0.75}
              resizeMode="contain"
            />

            <ProgressBar
              style={{ marginTop: 30 }}
              progress={0.75}
              color="blue"
            ></ProgressBar>
            <Text style={styles.subtitle}>__% Charged</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="Current Charge"
        component={currentChargeScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  carvector: {
    alignSelf: "center",
    color: "blue",
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
