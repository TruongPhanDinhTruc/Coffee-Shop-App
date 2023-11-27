import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar'
import PaymentFooter from '../components/PaymentFooter'
import { useStore } from '../store/store';
import CartItem from '../components/CartItem';



const CartScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const CartList = useStore((state) => state.CartList)
  const CartPrice = useStore((state) => state.CartPrice)

  // console.log(CartList);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart' />
            <View style={styles.ListItemContainer}>
              {CartList.map((data) => (
                <TouchableOpacity key={data.id} onPress={() => {}}>
                  <CartItem
                  id={data.id}
                  name={data.name}
                  imagelink_square={data.imagelink_square}
                  special_ingredient={data.special_ingredient}
                  roasted={data.roasted}
                  prices={data.prices}
                  type={data.type}
                  incrementCartItemQuantityHandler={()=>{}}
                  decrementCartItemQuantityHandler={()=>{}}/>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <PaymentFooter
            buttonPressHandler={() => { }}
            buttonTitle="Pay"
            price={{ price: CartPrice, currency: '$' }} />
        </View>
      </ScrollView>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
})