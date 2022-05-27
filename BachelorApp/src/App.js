import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SubmitPage from './SubmitPage';
import LogPage from './LogPage';

const Stack = createStackNavigator();



function MainScreen({ navigation }) {


  const onPressHandlerSubmitPage = () => {
    navigation.navigate('Submit Page')

  }

  const onPressHandlerLogPage = () => {
    navigation.navigate('Log Page')

  }

  return (
    <View style={styles.body}>

      <TouchableOpacity
        onPress={onPressHandlerSubmitPage}
        style={styles.button1}
        backgroundColor='#ffff00'
      >
        <Text style={styles.buttonText}>
          Submit symptoms
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressHandlerLogPage}
        style={styles.button2}

      >
        <Text style={styles.buttonText}>
          History Log
        </Text>
      </TouchableOpacity>

    </View>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={MainScreen}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name='Submit Page'
          component={SubmitPage}
        />
        <Stack.Screen
          name='Log Page'
          component={LogPage}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

registerRootComponent(App)

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 20,
  },
  item: {
    margin: 10,
    backgroundColor: '#4ae1f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    fontWeight: '900',
    alignItems: 'center',

  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  button1: {
    width: '60%',
    height: 70,
    alignItems: 'center',
    margin: 50,
    backgroundColor: '#759aff',
    borderRadius: 50,
    marginTop: '25%',
  },
  button2: {
    width: '60%',
    height: 70,
    alignItems: 'center',
    margin: 50,
    backgroundColor: '#ff4a5c',
    borderRadius: 50,

  },

});
export default App;