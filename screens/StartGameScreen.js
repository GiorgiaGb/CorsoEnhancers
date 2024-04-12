import React, { useState } from "react";
import {View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert} from "react-native";

import Card from "../components/Card";
import Colors from "../costants/colors";
import Input from "../components/Input";
import NumberComponent from "../components/NumberComponent";


const StartGameScreen = props => {

        const [enteredValue, setEnteredValue]= useState('');//tutti gli input sono delle stringhe che devono essere convertite
        const [confirmed, setConfirmed] = useState(false); // per permettere all'utente di confermare compare un messaggio di conferma
        const [selectedNumber, setSelectedNumber ]= useState();


        const numberInputHandler = inputText => {
            setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        }; //funzione che mi collega all'input

        const resetInputHandler = () => {
            setEnteredValue('');
            setConfirmed(false);
        };

        const confirmInputHandler = () => {
                const chosenNumber = parseInt(enteredValue);
                if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
                    Alert.alert('Numero non valido', 'Il numero deve essere compreso tra 1 e 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
                    return;
                }
            setConfirmed (true);
            setSelectedNumber(chosenNumber);
            setEnteredValue('');
            Keyboard.dismiss();
           
        };

        let confirmedOutput
        if (confirmed) {
            confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Il Numero che hai scelto è:</Text>
                    <NumberComponent>{selectedNumber}</NumberComponent>
                    <Button title="INIZIA IL GIOCO" onPress={() => props.onStartGame(selectedNumber)}/>

            
            </Card>
            );
        };


    return (
        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}> Inizia una nuova Partita!</Text>
            <Card style={styles.inputContainer}>
                <Text> Seleziona un numero</Text>
                <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType='numeric' 
                maxLength={2}
                //bisogna validare ciò che l'utente inserisce -> useState
                onChangeText= {numberInputHandler}
                value={enteredValue}
                />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" 
                                    onPress={resetInputHandler} 
                                    color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" 
                                    onPress={confirmInputHandler} 
                                    color={Colors.primary}/>
                        </View>
                    </View>
            </Card>
            {confirmedOutput}
        </View>
    </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,   //prende tutto lo sazio che ha a disposizione
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start' 
    }, 
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: { //questo stile lo userò anche per altre card 
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    button: {
        width: 100,

    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }

});

export default StartGameScreen;