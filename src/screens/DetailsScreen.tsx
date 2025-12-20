import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useStore } from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  getColors,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) => state.CoffeeList)[route.params.index];
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);
  const [sugarLevel, setSugarLevel] = useState('No Sugar');

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <View style={[styles.ScreenContainer, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={[styles.FooterInfoArea, { backgroundColor: colors.surface }]}>
          <Text style={[styles.InfoTitle, { color: colors.text }]}>Cup Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    backgroundColor:
                      data.size === price.size
                        ? '#0A9C4A'
                        : colors.surface,
                    borderColor:
                      data.size === price.size
                        ? '#0A9C4A'
                        : colors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? '#FFFFFF'
                          : colors.textSecondary,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.InfoTitle, { marginTop: SPACING.space_20, color: colors.text }]}>
            Level Sugar
          </Text>
          <View style={styles.SugarOuterContainer}>
            {['No Sugar', 'Low', 'Medium'].map(level => (
              <TouchableOpacity
                key={level}
                onPress={() => setSugarLevel(level)}
                style={[
                  styles.SugarBox,
                  {
                    backgroundColor:
                      sugarLevel === level ? '#0A9C4A' : colors.surface,
                    borderColor:
                      sugarLevel === level ? '#0A9C4A' : colors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.SugarText,
                    {
                      color:
                        sugarLevel === level
                          ? '#FFFFFF'
                          : colors.textSecondary,
                    },
                  ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.InfoTitle, { marginTop: SPACING.space_20, color: colors.text }]}>
            About
          </Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={[styles.DescriptionText, { color: colors.textSecondary }]}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={[styles.DescriptionText, { color: colors.textSecondary }]}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
    marginTop: -SPACING.space_20,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  SugarOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SugarBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SugarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
});

export default DetailsScreen;
