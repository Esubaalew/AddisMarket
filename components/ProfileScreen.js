import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../config/firebaseConfig'

const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
    const { user } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Page</Text>
            <Text style={styles.text}>Welcome {user.localId}</Text>
            {/* Add your profile content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default ProfileScreen;
