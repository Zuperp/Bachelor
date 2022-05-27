import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, Alert, View, Button, } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const counties =
  [
    "Albertslund", "Allerød", "Assens", "Ballerup", "Billund", "Bornholm", "Brøndby", "Brønderslev", "Christiansø", "Dragør",
    "Egedal", "Esbjerg", "Fanø", "Favrskov", "Faxe", "Fredensborg", "Fredericia", "Frederiksberg",
    "Frederikshavn", "Frederikssund", "Furesø", "Faaborg-Midtfyn", "Gentofte", "Gladsaxe", "Glostrup", "Greve",
    "Gribskov", "Guldborgsund", "Haderslev", "Hedensted", "Halsnæs", "Helsingør", "Herlev", "Herning", "Hillerød",
    "Hjørring", "Holbæk", "Holstebro", "Horsens", "Hvidovre", "Høje-Taastrup", "Hørsholm", "Ikast-Brande",
    "Ishøj", "Jammerbugt", "Kalundborg", "Kerteminde", "Kolding", "København", "Køge", "Langeland",
    "Lejre", "Lemvig", "Lolland", "Lyngby-Taarbæk", "Læsø", "Mariagerfjord", "Middelfart", "Morsø",
    "Norddjurs", "Nordfyns", "Nyborg", "Næstved", "Odder", "Odense", "Odsherred", "Randers", "Rebild",
    "Ringkøbing-Skjern", "Ringsted", "Roskilde", "Rudersdal", "Rødovre", "Samsø", "Silkeborg", "Skanderborg",
    "Skive", "Slagelse", "Solrød", "Sorø", "Stevns", "Struer", "Svendborg", "Syddjurs", "Sønderborg",
    "Thisted", "Tønder", "Tårnby", "Vallensbæk", "Varde", "Vejen", "Vejle", "Vesthimmerlands", "Viborg",
    "Vordingborg", "Ærø", "Aabenraa", "Aalborg", "Aarhus"
  ]


export default function SubmitPage() {

  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState([]);

  const [combinationInfo, setCombinationInfo] = useState([]);
  const [combinationInfoAndOldInfo, setCombinationInfoAndOldInfo] = useState([]);

  const [selectedCounty, setSelectedCounty] = useState("");

  const [feber, setFeber] = useState(false);
  const [snottet, setSnottet] = useState(false);
  const [opkast, setOpkast] = useState(false);
  const [hovedpine, setHovedpine] = useState(false);

  const [feberString, setFeberString] = useState("");
  const [snottetString, setSnottetString] = useState("");
  const [opkastString, setOpkastString] = useState("");
  const [hovedpineString, setHovedpineString] = useState("");

  

  const sendInfoButtonClickHandler = async () => {
    if (selectedCounty == "") {
      {
        Alert.alert(
          "Nothing Selected",
          "Select a county",
          [
            {
              text: "OK", onPress: () => console.log("OK Pressed")
            }
          ]
        )
      }

    } else {

      if (feber == true || snottet == true || opkast == true || hovedpine == true) {

        var symptomsStringThing = symptoms.toString();
        combinationInfo.push(selectedCounty + " " + date + " " + symptomsStringThing)
        var comboStringThing = combinationInfo.toString();


        var oldInformationVariable = await AsyncStorage.getItem('Combination');

        if (oldInformationVariable != null) {
          combinationInfoAndOldInfo.pop()
          combinationInfoAndOldInfo.push(oldInformationVariable + comboStringThing)
        } else {
          combinationInfoAndOldInfo.push(comboStringThing)
        }

        var countyStringForSending = selectedCounty
        .replace(/[Æ ]/g, "Ae")
        .replace(/[Ø ]/g, "Oe")
        .replace(/[Å ]/g, "Aa")
        .replace(/[æ ]/g, "ae")
        .replace(/[ø ]/g, "oe")
        .replace(/[å ]/g, "aa")

        var okTest = "testOK"

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            County: countyStringForSending, 
            Feber: feberString, 
            Snottet: snottetString, 
            Opkast: opkastString, 
            Hovedpine: hovedpineString
            

          }
            )
      };

       await fetch('http://192.168.20.152:5000/test', requestOptions)
       .then(response => {
        return response.status
    })
        
        var megaCombination = combinationInfoAndOldInfo.toString();

        
        try {

          await AsyncStorage.setItem('Combination', megaCombination);


        } catch (error) {
          console.log(error)
        }


        Alert.alert(
          "Your information has been send ",
          "Thank you for sending your information",
          [
            {
              text: "OK", onPress: () => {
                setFeber(false)
                setSnottet(false)
                setOpkast(false)
                setHovedpine(false) 

                setFeberString("null")
                setSnottetString("null")
                setOpkastString("null")
                setHovedpineString("null") 

                combinationInfo.pop()
               
                
              }
            }
          ]
        )

      } else {
        Alert.alert(
          "Nothing Selected",
          "Please select atleast one box",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel pressed1"),
              styles: "cancel"
            },
            {
              text: "OK", onPress: () => console.log("OK Pressed 2")
            }
          ]
        )

      }
    }
  }




  function changeFunctionFeber() {
    if (feber == false) {
      setFeber(!feber)
      setFeberString("Feber")
      symptoms.push("Feber ")
      
    } else if (feber == true) {
      setFeber(!feber)
      setFeberString("null")
      symptoms.pop()
      
    }

  }

  function changeFunctionSnottet() {
    if (snottet == false) {
      setSnottet(!snottet)
      setSnottetString("Snottet")
      symptoms.push("Snottet ")
      
    } else if (snottet == true) {
      setSnottet(!snottet)
      setSnottetString("null")
      symptoms.pop()
      
    }

  }


  function changeFunctionOpkast() {
    if (opkast == false) {
      setOpkast(!opkast)
      setOpkastString("Opkast")
      symptoms.push("Opkast ")
      
    } else if (opkast == true) {
      setOpkast(!opkast)
      setOpkastString("null")
      symptoms.pop()
      
    }

  }


  function changeFunctionHovedpine() {
    if (hovedpine == false) {
      setHovedpine(!hovedpine)
      setHovedpineString("Hovedpine")
      symptoms.push("Hovedpine ")
      
    } else if (hovedpine == true) {
      setHovedpine(!hovedpine)
      setHovedpineString("null")
      symptoms.pop()
      
    }

  }


  return (
    <View style={styles.body}>
      <Text style={styles.buttonText}>
        Select a county
      </Text>

      <SelectDropdown
        data={counties}
        onSelect={(selectedItem, index) => {
         
          setSelectedCounty(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Checkbox
            value={feber}
            onValueChange={changeFunctionFeber}
            color={feber ? "#4630EB" : undefined}
          />
          <Text style={styles.text}>
            Feber
          </Text>
          <Checkbox
            value={snottet}
            onValueChange={changeFunctionSnottet}
            color={snottet ? "#4630EB" : undefined}
          />
          <Text style={styles.text}>
            Snottet
          </Text>
          <Checkbox
            value={opkast}
            onValueChange={changeFunctionOpkast}
            color={opkast ? "#4630EB" : undefined}
          />
          <Text style={styles.text}>
            Opkast
          </Text>
          <Checkbox
            value={hovedpine}
            onValueChange={changeFunctionHovedpine}
            color={hovedpine ? "#4630EB" : undefined}
          />
          <Text style={styles.text}>
            Hovedpine
          </Text>

        </View>

        <Button
          title="Send"
          disabled={false}

          onPress={sendInfoButtonClickHandler}
        />
      </View>

    </View>
  )
}



const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 100,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 15,
  },
  text: {
    lineHeight: 30,
    marginLeft: 10,
    marginRight: 10,
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    fontWeight: '900',
    alignItems: 'center',

  },

});