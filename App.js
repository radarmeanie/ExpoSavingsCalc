import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View, Button, FlatList} from 'react-native';
import {createStackNavigator,} from 'react-navigation';

// Size of items in table
const numCols = 3;
const width = Dimensions.get('window').width/numCols;
const height = width/2;

// Home screen / Welcome
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home - Exponential Savings",
  };

  constructor(props) {
    super(props);
    this.state = {
      amount: 50, // Default amount if no user input
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Exponential Savings Calculator
        </Text>

        <Text style={styles.welcome2}>
          Starting amount:
        </Text>
        <TextInput // Amount will be passed on to next page
          placeholder = "0"
          style = {styles.inputAmount}
          keyboardType = "numeric"
          onChangeText = {(text) => this.setState({amount: text})}
        />
        <Button
          onPress = {() =>
            this.props.navigation.navigate('Expo', {
              amount: this.state.amount,
            })
          }
          title = "Start calculating!"
          color='#fa3'
        />
      </View>
    )
  }
}

// Expo screen / Table of calculations
class ExpoScreen extends React.Component {
  static navigationOptions = {
    title: "Calculation - Exponential Savings",
  }
  
  render() {
    const {navigation} = this.props;
    const amount = navigation.getParam('amount', 50);
    var tableHead = ["Amount Per Week", "Total Amount"];
    var tableData = [
      {key: 'Week number'},
      {key: 'Amount to save'},
      {key: 'Total amount'},
    ];
    var total = 0;
  
    // Generate data to be put into FlatList
    for (let i = 1; i <= 52; i++) {
      total += amount * i;
      tableData.push(
        {key: 'Week ' + i},
        {key: amount * i},
        {key: total}
        );
    }

    // Turn this FlatList into a grid
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Starting amount: {amount}
        </Text>
        <FlatList
          numColumns = {numCols}
          data = {tableData}
          keyExtractor = {item => item.key}
          renderItem = {({item}) => 
            <View style = {styles.tableData}>
              <Text
                style = {styles.welcome2}
              >
                {item.key}
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Expo: {screen: ExpoScreen},
  },
  {
    initialRouteName: 'Home' // Go to Home upon landing durr
  },
)

// App mismo that exports the RootStack
export default class App extends React.Component {
  render() {
    return <RootStack/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353784',
  },
  welcome: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  welcome2: {
    fontSize: 18,
    color: "#fff",
  },
  inputAmount: {
    color: "#fff",
    fontSize: 30,
  },
  tableData: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});