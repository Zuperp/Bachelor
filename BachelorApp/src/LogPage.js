import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LogPage() {

  const [combinationItems, setCombinationItems] = useState("");


  useEffect(() => {
    getData();

  }, []);

  const getData = () => {
    try {
       AsyncStorage.getItem('Combination').then(value => {
        if (value != null){
          setCombinationItems(value);
        }
      })
      
    } catch (error) {
      console.log(error)
    }
  }



  const pressTest = async () => {
    await AsyncStorage.setItem('Combination', "")
  }

  return (
    <ScrollView  style={styles.body}>
      <TouchableOpacity style={styles.buttonText}
      onPress={pressTest}>
        <Text>
          Clear memory
        </Text>
      </TouchableOpacity>

      <Text style={styles.buttonText}>
      {combinationItems}
      </Text>
    </ScrollView >
  )
}



const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
   //alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#000000',
    fontSize: 40,
    margin: 10,
    fontWeight: '900',
    alignItems: 'center',

  },

});