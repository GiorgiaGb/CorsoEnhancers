import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  

  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame= {startGameHandler}/>;
  if(userNumber && guessRounds <= 0) {
    content = (<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>);
  } else if (guessRounds > 0){
    content = (
      <GameOverScreen 
          roundsNumber={guessRounds} 
          userNumber={userNumber} 
          onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Indovina un Numero"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
 screen:{
  flex: 1 
 }
});
