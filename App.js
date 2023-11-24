import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TagNavigator from './src/navigators/TagNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen.js'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer screenOptions = {{headerShown: false}}>
      <Stack.Navigator>
        <Stack.Screen name='Tab' component={TagNavigator} options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name='Details' component={DetailsScreen} options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})