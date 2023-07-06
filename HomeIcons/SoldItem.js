import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SoldItem = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon name="shopping-bag" size={20} color="#fff" />
            <Text style={styles.text}>Sold Shop</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default SoldItem;
