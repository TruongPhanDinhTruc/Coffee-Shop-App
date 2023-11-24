import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomIcon from '../components/CustomIcon'
import HomeScreen from '../screens/HomeScreen.js'
import CartScreen from '../screens/CartScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import { COLORS } from '../theme/theme'
// import {BlurView} from '@react-native-community/blur'

const Tab = createBottomTabNavigator();

const TagNavigator = () => {
  return (
    <Tab.Navigator screenOptions = {{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        // tabBarBackground: () => (
        //     <BlurView />
        // )
        }}>
        <Tab.Screen name='Home' component={HomeScreen} options={{
            tabBarIcon: ({focused,color,size}) => (
                <CustomIcon name='home' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            )
        }}></Tab.Screen>
        <Tab.Screen name='Cart' component={CartScreen} options={{
            tabBarIcon: ({focused,color,size}) => (
                <CustomIcon name='cart' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            )
        }}></Tab.Screen>
        <Tab.Screen name='Favorite' component={FavoritesScreen} options={{
            tabBarIcon: ({focused,color,size}) => (
                <CustomIcon name='like' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            )
        }}></Tab.Screen>
        <Tab.Screen name='History' component={OrderHistoryScreen} options={{
            tabBarIcon: ({focused,color,size}) => (
                <CustomIcon name='bell' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            )
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TagNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent'
    }
})