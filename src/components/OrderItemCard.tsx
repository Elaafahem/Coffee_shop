import { StyleSheet, Text, View, ImageProps, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  getColors,
} from '../theme/theme';
import { useStore } from '../store/store';

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={
        isDarkMode
          ? [COLORS.primaryGreyHex, COLORS.primaryBlackHex]
          : [COLORS.primaryWhiteHex, '#F0F0F0']
      }
      style={[styles.CardLinearGradient, !isDarkMode && styles.lightShadow]}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.Image} />
          <View>
            <Text style={[styles.CardTitle, { color: colors.text }]}>{name}</Text>
            <Text style={[styles.CardSubtitle, { color: colors.textSecondary }]}>
              {special_ingredient}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.CardCurrency}>
            $ <Text style={[styles.CardPrice, { color: colors.text }]}>{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={[styles.SizeBoxLeft, { backgroundColor: isDarkMode ? COLORS.primaryBlackHex : '#F5F5F7', borderRightColor: isDarkMode ? COLORS.primaryGreyHex : '#E0E0E0' }]}>
              <Text
                style={[
                  styles.SizeText,
                  {
                    color: colors.textSecondary,
                    fontSize:
                      type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                  },
                ]}>
                {data.size}
              </Text>
            </View>
            <View style={[styles.PriceBoxRight, { backgroundColor: isDarkMode ? COLORS.primaryBlackHex : '#F5F5F7', borderLeftColor: isDarkMode ? COLORS.primaryGreyHex : '#E0E0E0' }]}>
              <Text style={styles.PriceCurrency}>
                {data.currency}
                <Text style={[styles.Price, { color: colors.text }]}> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={[styles.Price, { color: colors.text }]}>{data.quantity}</Text>
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: SPACING.space_20,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
  },
  lightShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryGreenHex,
  },
  CardPrice: {
    // color controlled dynamically
  },
  CardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBoxLeft: {
    height: 45,
    flex: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  PriceBoxRight: {
    height: 45,
    flex: 1,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
  },
  PriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryGreenHex,
  },
  Price: {
    // color controlled dynamically
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryGreenHex,
  },
});

export default OrderItemCard;
