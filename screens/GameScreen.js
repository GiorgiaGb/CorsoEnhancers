import React,{useState, useRef, useEffect }  from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberComponent from "../components/NumberComponent";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
    
  };

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice));

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onGameOver(rounds);
        }
    }, [currentGuess, props.userChoice, props.onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Non mentire", 'Lo sai che hai sbagliato...', [
                {text: 'Ops!', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };


    return (
        <View style= {styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberComponent>{currentGuess} </NumberComponent>
            <Card style={styles.buttonContainer}>
                <Button title= "LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title= "GREATER" onPress ={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
      }

});


export default GameScreen;