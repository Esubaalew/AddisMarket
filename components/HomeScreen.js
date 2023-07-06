import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('products.db');

const HomeScreen = ({ user, navigation }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // createTable();
        // insertProducts();
        fetchProducts();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, image TEXT, description TEXT)'
            );
        });
    };

    const insertProducts = () => {
        db.transaction((tx) => {
            productsData.forEach((product) => {
                tx.executeSql(
                    'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)',
                    [product.name, product.price, product.image, product.description]
                );
            });
        });
    };

    const fetchProducts = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM products', [], (_, { rows }) => {
                const fetchedProducts = rows._array;
                setProducts(fetchedProducts);
                setIsLoading(false);
            });
        });
    };

    const handleProductPress = (item) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const handleBuyPress = (item) => {
        navigation.navigate('ProductDetails', { product: item });
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleProductPress(item)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.overlay} />
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceButtonContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleBuyPress(item)}>
                        <Text style={styles.buttonText}>BUY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

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
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3f51b5" />
                    <Text style={styles.loadingText}>Getting items...</Text>
                </View>
            ) : (
                <>
                    {filteredProducts.length > 0 ? (
                        <FlatList
                            data={filteredProducts}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.productList}
                            columnWrapperStyle={styles.columnWrapper}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text style={styles.emptyText}>No products available.</Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
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
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    productList: {
        paddingTop: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        width: (Dimensions.get('window').width - 48) / 2,
        padding: 12,
        marginBottom: 8,
        elevation: 4,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
    },
    priceContainer: {
        flex: 1,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    addButton: {
        backgroundColor: '#3f51b5',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
        alignSelf: 'center',
        marginTop: 100,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3f51b5',
    },
});

const productsData = [
    {
        id: 1,
        name: 'Samsung Galaxy S7',
        price: 599.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s7--.jpg',
        description:
            'The Samsung Galaxy S7 is a powerful and feature-packed smartphone that offers a great user experience. It comes with a high-quality camera, a vibrant display, and a sleek design.',
    },
    {
        id: 2,
        name: 'Google Pixel',
        price: 499,
        image: 'https://www.mega.pk/items_images/Google+Pixel+Price+in+Pakistan%2C+Specifications%2C+Features_-_15344.webp',
        description:
            'The Google Pixel is known for its excellent camera capabilities and smooth performance. It runs on pure Android, providing a clean and user-friendly interface.',
    },
    {
        id: 3,
        name: 'Xiaomi Redmi Note 2',
        price: 1000,
        image: 'https://www.ispyprice.com/static/tablet_model/thumb_751_xiaomi_mi_pad_2_64gb_logo.jpg',
        description:
            'The Xiaomi Redmi Note 2 offers a budget-friendly option with good performance and a large display. It is equipped with a reliable camera and provides a smooth user experience.',
    },
    {
        id: 4,
        name: 'Samsung Galaxy A14 4G',
        price: 799.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-4g.jpg',
        description:
            'The Samsung Galaxy A14 4G is a stylish and affordable smartphone that comes with a large display and a powerful battery. It offers a good balance of features and performance.',
    },
    {
        id: 5,
        name: 'Samsung Galaxy A13',
        price: 699.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a13.jpg',
        description:
            'The Samsung Galaxy A13 is a budget-friendly smartphone that offers a good set of features and a reliable performance. It comes with a decent camera and a durable build.',
    },
    {
        id: 6,
        name: 'Samsung Galaxy S20 FE 5G',
        price: 899.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s20-fe-5g.jpg',
        description:
            'The Samsung Galaxy S20 FE 5G is a flagship-level smartphone that provides a premium experience at a relatively affordable price. It offers a high-quality camera, a stunning display, and top-of-the-line performance.',
    },
    {
        id: 7,
        name: 'Samsung Galaxy M13 4G (India)',
        price: 599.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m13-4g-india.jpg',
        description:
            'The Samsung Galaxy M13 4G (India) is a mid-range smartphone that comes with a large display and a powerful battery. It offers a good combination of features and value for money.',
    },
    {
        id: 8,
        name: 'Samsung Galaxy S20 FE 5G',
        price: 899.99,
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s20-fe-5g.jpg',
        description:
            'The Samsung Galaxy S20 FE 5G is a flagship-level smartphone that provides a premium experience at a relatively affordable price. It offers a high-quality camera, a stunning display, and top-of-the-line performance.',
    },
];

export default HomeScreen;
