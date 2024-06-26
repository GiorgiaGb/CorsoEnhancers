import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: { //questo stile lo userò anche per altre card 
        shadowColor: 'black', //queste proprietà si vedono solo su iOS
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6, //se metto zeromi toglie l'omba laterale
        shadowOpacity: 0.26,
        elevation: 5, // per android
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})

export default Card;