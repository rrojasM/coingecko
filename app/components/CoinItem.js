import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CoinItem = ({ coin }) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.coinName}>
                <Image style={styles.image} source={{ uri: coin.image }} />
                <View style={styles.containerNames}>
                    <Text style={styles.text}>{coin.name}</Text>
                    <Text style={styles.textSymbol}>{coin.symbol}</Text>
                </View>

            </View>
            <View>
                <Text style={styles.textPrice}>${coin.current_price}</Text>
                <Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0
                    ? styles.priceUp
                    : styles.priceDown]}>
                    {coin.price_change_percentage_24h}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: "#121212",
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: "#ffffff",
    },
    image: {
        height: 30,
        width: 30
    },
    coinName: {
        flexDirection: 'row'
    },
    containerNames: {
        marginLeft: 10
    },
    textSymbol: {
        color: '#434343',
        textTransform: 'uppercase',
    },
    pricePercentage: {
        textAlign:'right'
    },
    priceUp: {
        color: "#00b5b9"
    },
    priceDown: {
        color: "#fc4422"
    },
    textPrice:{
        color: "#fff",
        textAlign:'right'
    }
})

export default CoinItem