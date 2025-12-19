import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  getColors,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import {useStore} from '../store/store';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <View>
      {prices.length != 1 ? (
        <View style={[styles.CartItemCard, {backgroundColor: colors.surface}]}>
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.CartItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={[styles.CartItemTitle, {color: colors.text}]}>
                  {name}
                </Text>
                <Text style={[styles.CartItemSubtitle, {color: colors.textSecondary}]}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={[styles.CartItemRoastedContainer, {backgroundColor: colors.background}]}>
                <Text style={[styles.CartItemRoastedText, {color: colors.textSecondary}]}>
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={[styles.SizeBox, {backgroundColor: colors.surface}]}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                        color: colors.textSecondary,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                  <Text style={[styles.SizePrice, {color: colors.text}]}>
                    {' '}
                    {data.price}
                  </Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={[styles.CartItemQuantityContainer, {borderColor: '#0A9C4A'}]}>
                  <Text style={[styles.CartItemQuantityText, {color: colors.text}]}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={[styles.CartItemSingleCard, {backgroundColor: colors.surface}]}>
          <View>
            <Image
              source={imagelink_square}
              style={styles.CartItemSingleImage}
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text style={[styles.CartItemTitle, {color: colors.text}]}>
                {name}
              </Text>
              <Text style={[styles.CartItemSubtitle, {color: colors.textSecondary}]}>
                {special_ingredient}
              </Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={[styles.SizeBox, {backgroundColor: colors.background}]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      color: colors.textSecondary,
                    },
                  ]}>
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0].currency}
                <Text style={[styles.SizePrice, {color: colors.text}]}>
                  {' '}
                  {prices[0].price}
                </Text>
              </Text>
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={[styles.CartItemQuantityContainer, {borderColor: '#0A9C4A'}]}>
                <Text style={[styles.CartItemQuantityText, {color: colors.text}]}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon
                  name="add"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemCard: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CartItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: '#0A9C4A',
  },
  SizePrice: {
    color: '#0A9C4A',
  },
  CartItemIcon: {
    backgroundColor: '#0A9C4A',
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CartItemQuantityContainer: {
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  CartItemSingleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default CartItem;
