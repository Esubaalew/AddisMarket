import React from 'react';
import StartScreen from './components/StartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { firebaseConfig } from './config/firebaseConfig';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';;
import ProfileScreen from './components/ProfileScreen';
import CartIcon from './HomeIcons/CartIcon';
import CartScreen from './components/CartScreen';
// import SoldItem from './HomeIcons/SoldItem';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Group
          screenOptions={{ headerMode: 'none' }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            initialParams={{ firebaseConfig }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            initialParams={{ firebaseConfig }}
          />
          <Stack.Screen
            name="Start"
            component={StartScreen}

          />
        </Stack.Group>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Addis Store',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            // headerLeft: () => <SearchBox />,
            headerRight: () => <><CartIcon />

            </>,
          })}
        />
        <Stack.Screen
          name="ProfileScreen"
          initialParams={{ firebaseConfig }}
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: 'Cart',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerRight: () => <CartIcon />
          }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={({ route }) => ({
            title: route.params.product.name,
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#000', // Set the title text color to black
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000', // Set the header tint color to black
            headerBackground: () => (
              <View style={styles.headerBackground} />
            ),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});