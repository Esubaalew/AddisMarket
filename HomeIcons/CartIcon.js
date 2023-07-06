import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import db from '../database';

const CartIcon = () => {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        fetchCartItems();
        const interval = setInterval(fetchCartItems, 500); // Fetch cart items every 0.5 seconds

        return () => {
            clearInterval(interval); // Clear the interval when component unmounts
        };
    }, []);

    const fetchCartItems = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT SUM(quantity) as total FROM cart', [], (_, { rows }) => {
                const totalItems = rows._array[0].total || 0;
                setCartItems(totalItems);
            });
        });
    };

    const handlePress = () => {
        navigation.navigate('CartScreen');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ marginRight: 16 }}>
            <Ionicons name="cart-outline" size={24} color="black" />
            {cartItems !== null && (
                <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItems > 0 ? cartItems : '0'}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cartBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#3f51b5',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CartIcon;
