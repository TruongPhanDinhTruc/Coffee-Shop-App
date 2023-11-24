import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'

const getCategoriesFromData = (data) => {
    let temp = {};
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }

    }
    let categories = Object.keys(temp);
    categories.unshift('ALL');
    return categories;
}

const getCoffeeList = (category, data) => {
    if (category == 'ALL') {
        return data;
    } else {
        let coffeeList = data.filter((item) => item.name == category);
        return coffeeList;
    }
};

const HomeScreen = ({ navigation }) => {
    const CoffeeList = useStore((state) => state.CoffeeList);
    const BeanList = useStore((state) => state.BeanList);
    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
    const [searchText, setSearchText] = useState(undefined);
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));
    const ListRef = useRef();
    const tabBarHeight = useBottomTabBarHeight();

    // console.log(sortedCoffee.length);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <HeaderBar />

                <Text style={styles.ScreenTitle}>Find the best <td />coffee for you</Text>

                <View style={styles.InputContainerComponent}>
                    <TouchableOpacity onPress={() => { }}>
                        <CustomIcon
                            style={styles.InputIcon}
                            name='search'
                            size={FONTSIZE.size_18}
                            color={COLORS.primaryOrangeHex} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Find your coffee ...'
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputContainer} />
                </View>

                {/* Category Scroller */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.CategoryScrollViewStyle}>
                    {categories.map((data, index) => (
                        <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity
                                style={styles.CategoryScrollViewItem}
                                onPress={() => {
                                    ListRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    })
                                    setCategoryIndex({ index: index, category: categories[index] });
                                    setSortedCoffee([
                                        ...getCoffeeList(categories[index], CoffeeList),
                                    ]);
                                }}>
                                <Text style={[
                                    styles.CategoryText,
                                    categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {}]}>
                                    {data}
                                </Text>
                                {categoryIndex.index == index ? (
                                    <View style={styles.ActiveCategory} />
                                ) : (
                                    <></>
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Coffee Flatlist */}

                <FlatList
                    ref={ListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={sortedCoffee}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type
                                })
                            }}>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    rosted={item.rosted}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={() => { navigation.navigate('Cart') }} />
                            </TouchableOpacity>
                        );
                    }}
                />

                {/* Bean Flatlist */}

                <Text style={styles.CoffeeBeanTitle}>Coffee Beans</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.push('Details', {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type
                                })
                            }}>
                                <CoffeeCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    rosted={item.rosted}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    special_ingredient={item.special_ingredient}
                                    average_rating={item.average_rating}
                                    price={item.prices[2]}
                                    buttonPressHandler={() => { navigation.navigate('Cart') }} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    InputContainerComponent: {
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        flexDirection: 'row',
        alignItems: 'center'
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4
    },
    FlatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    CoffeeBeanTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryLightGreyHex,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
    }
})