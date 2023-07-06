import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const StartScreen = () => {
    const navigation = useNavigation();

    const handleShopNow = () => {
        navigation.navigate('Login');
    };

    return (
        <LinearGradient colors={['#450101', '#090130']} style={styles.gradient}>
            <View style={styles.container}>
                <Text style={styles.introText}>Welcome to Addis Store!</Text>
                <Text style={styles.descriptionText}>
                    Addis Store is your one-stop solution for all your shopping needs.
                    Whether you are looking for groceries, electronics, clothing, or household items, we've got you covered. With our easy-to-use app, you can browse through a wide range of products, place orders, and have them delivered right to your doorstep. Sign in to start shopping and enjoy a seamless experience with Addis Store!
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleShopNow}>
                    <Text style={styles.buttonText}>Shop Now!</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        width: '100%',
    },
    gradient: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    introText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: 'white',
    },
    button: {
        width: '70%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ff3366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StartScreen;
