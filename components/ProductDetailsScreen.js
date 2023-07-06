import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCartConfirmation, setShowCartConfirmation] = useState(false);

    const navigation = useNavigation();

    const addToCart = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO cart (name, price, image, quantity) VALUES (?, ?, ?, ?)',
                [product.name, product.price, product.image, 1],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                        setShowCartConfirmation(true);
                    }
                }
            );
        });
    };

    const handleBuy = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        setShowConfirmation(true);
        // sendEmail();
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleCloseCartConfirmation = () => {
        setShowCartConfirmation(false);
        navigation.navigate('CartScreen'); // Navigate to the Cart screen
    };

    const handleCloseMessage = () => {
        setShowConfirmation(false);
        setShowCartConfirmation(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                </View>
                <Text style={styles.description}>{product.description}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={addToCart}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuy}>
                        <Text style={[styles.buttonText, styles.buyButtonText]}>Buy</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>Confirm Purchase</Text>
                        </View>
                        <View style={styles.productSummaryContainer}>
                            <Image source={{ uri: product.image }} style={styles.productSummaryImage} />
                            <View style={styles.productSummaryTextContainer}>
                                <Text style={styles.productSummaryName}>{product.name}</Text>
                                <Text style={styles.productSummaryPrice}>${product.price}</Text>
                            </View>
                        </View>
                        <Text style={styles.modalMessage}>Are you sure you want to buy this product?</Text>
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancel" onPress={() => setShowModal(false)} color="#3f51b5" />
                            <Button title="Confirm" onPress={handleConfirm} color="#3f51b5" />
                        </View>
                    </View>
                </View>
            </Modal>

            {showConfirmation && (
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationMessage}>Your purchase has been confirmed. Thank you!</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="OK" onPress={handleCloseConfirmation} color="#3f51b5" />
                        <Button title="Close" onPress={handleCloseMessage} color="#3f51b5" />
                    </View>
                </View>
            )}

            {showCartConfirmation && (
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationMessage}>Product added to cart.</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Open Cart" onPress={handleCloseCartConfirmation} color="#3f51b5" />
                        <Button title="Close" onPress={handleCloseMessage} color="#3f51b5" />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
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
        padding: 16,
        width: '90%',
    },
    imageContainer: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#A59D95',
    },
    productImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3f51b5',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 16,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buyButton: {
        backgroundColor: '#3f51b5',
    },
    buyButtonText: {
        color: '#fff',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: '80%',
    },
    modalTitleContainer: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productSummaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productSummaryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productSummaryTextContainer: {
        flex: 1,
    },
    productSummaryName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productSummaryPrice: {
        fontSize: 18,
    },
    modalMessage: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 16,
    },
    confirmationContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        alignItems: 'center',
    },
    confirmationMessage: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
    },
});

export default ProductDetailsScreen;
