import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import BGIcon from './BGIcon';
import { useStore } from '../store/store';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
  isFavouriteCard?: boolean;
  favourite?: boolean;
  onToggleFavourite?: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
  isFavouriteCard,
  favourite,
  onToggleFavourite,
}) => {
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <View style={[styles.CardContainer, { backgroundColor: colors.surface }]}>
      <ImageBackground
        source={imagelink_square}
        style={styles.CardImageBG}
        resizeMode="cover"
        imageStyle={styles.CardImageStyle}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'star'}
            color={'#F5C150'}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <View style={styles.CardTitleRow}>
        <Text style={[styles.CardTitle, { color: colors.text }]}>{name}</Text>
        <TouchableOpacity
          onPress={() => {
            if (onToggleFavourite) {
              onToggleFavourite();
            }
          }}>
          <CustomIcon
            name="like"
            size={FONTSIZE.size_16}
            color={favourite ? COLORS.primaryRedHex : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.CardSubtitle, { color: colors.textSecondary }]}>
        {special_ingredient}
      </Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{ ...price, quantity: 1 }],
            });
          }}>
          <BGIcon
            color={'#FFFFFF'}
            name={'add'}
            BGColor={'#0A9C4A'}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryLightGreyHex,
  },
  CardImageStyle: {
    borderRadius: BORDERRADIUS.radius_20,
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: '#0A9C4A',
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: '#0A9C4A',
  },
  CardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_4,
  },
});

export default CoffeeCard;
