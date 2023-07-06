import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator, Modal, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import db from '../database';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const fetchCartItems = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM cart', [], (_, { rows }) => {
                setCartItems(rows._array);
                setIsLoading(false);
            });
        });
    };

    const removeFromCart = (id) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        db.transaction((tx) => {
                            tx.executeSql('DELETE FROM cart WHERE id = ?', [id], (_, { rowsAffected }) => {
                                if (rowsAffected > 0) {
                                    fetchCartItems();
                                }
                            });
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const increaseQuantity = (id, quantity) => {
        const newQuantity = quantity + 1;
        updateQuantity(id, newQuantity);
    };

    const decreaseQuantity = (id, quantity) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            updateQuantity(id, newQuantity);
        }
    };

    const updateQuantity = (id, quantity) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id], (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                    fetchCartItems();
                }
            });
        });
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>Price: ${item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id, item.quantity)}>
                        <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id, item.quantity)}>
                        <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );


    const handleCheckout = () => {
        setShowModal(true);
    };

    const handleConfirmCheckout = () => {
        setShowModal(false);
        setShowConfirmationModal(true);
        // Perform the checkout process
        // ...
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const filteredCartItems = cartItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3f51b5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={handleSearch}
                    value={searchText}
                />
            </View>
            {filteredCartItems.length > 0 ? (
                <FlatList
                    data={filteredCartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.contentContainer}
                />
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>

            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Checkout</Text>
                        <Text style={styles.modalText}>Total Price: ${totalPrice}</Text>
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancel" onPress={handleCloseModal} color="#3f51b5" />
                            <Button title="Confirm" onPress={handleConfirmCheckout} color="#3f51b5" />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={showConfirmationModal} animationType="slide" transparent={true}>
                <View style={styles.confirmationModalBackground}>
                    <View style={styles.confirmationModalContainer}>
                        <Text style={styles.confirmationModalTitle}>Payment Successful</Text>
                        <Text style={styles.confirmationModalText}>Thank you for your purchase!</Text>
                        <Button title="Close" onPress={handleCloseConfirmationModal} color="#3f51b5" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flexGrow: 1,
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cartItemImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    cartItemDetails: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 4,
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    removeButton: {
        marginLeft: 16,
    },
    removeButtonText: {
        fontSize: 14,
        color: '#ff0000',
    },
    checkoutButton: {
        backgroundColor: '#3f51b5',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    confirmationModalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmationModalContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmationModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    confirmationModalText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default CartScreen;
