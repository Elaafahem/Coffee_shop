import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  COLORS,
  SPACING,
  FONTFAMILY,
  FONTSIZE,
  BORDERRADIUS,
  getColors,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation, route}: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  const tabBarHeight = useBottomTabBarHeight();
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Visa');

  const buttonPressHandler = () => {
    // Ajouter la commande à l'historique et vider le panier
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    // Option : revenir à l'accueil après l'achat
    navigation.navigate('Home');
  };

  // Calcul du subtotal et discount
  const subtotal = parseFloat(CartPrice) || 0;
  const discount = 0; // Tu peux ajouter une logique de discount plus tard
  const total = subtotal - discount;

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={[styles.ScreenContainer, {backgroundColor: colors.background}]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <>
              {/* Order Summary */}
              <View style={[styles.SummaryContainer, {backgroundColor: colors.surface}]}>
                <View style={styles.SummaryRow}>
                  <Text style={[styles.SummaryLabel, {color: colors.text}]}>Subtotal</Text>
                  <Text style={[styles.SummaryValue, {color: colors.text}]}>
                    ${' '}
                    {subtotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.SummaryRow}>
                  <Text style={[styles.SummaryLabel, {color: colors.text}]}>Discount</Text>
                  <Text style={[styles.SummaryValue, {color: colors.text}]}>
                    ${' '}
                    {discount.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.SummaryRow}>
                  <Text style={[styles.SummaryLabelTotal, {color: colors.text}]}>Total</Text>
                  <Text style={[styles.SummaryValueTotal, {color: colors.text}]}>
                    ${' '}
                    {total.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* Payment Methods */}
              <View style={[styles.PaymentSection, {backgroundColor: colors.surface}]}>
                <Text style={[styles.PaymentLabel, {color: colors.text}]}>Payment</Text>
                <View style={styles.PaymentImagesContainer}>
                  <TouchableOpacity
                    onPress={() => setSelectedPaymentMethod('Visa')}
                    style={[
                      styles.PaymentImageWrapper,
                      selectedPaymentMethod === 'Visa' &&
                        styles.PaymentImageWrapperActive,
                    ]}>
                    <Image
                      source={require('../assets/app_images/visa.png')}
                      style={styles.PaymentImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedPaymentMethod('PayPal')}
                    style={[
                      styles.PaymentImageWrapper,
                      selectedPaymentMethod === 'PayPal' &&
                        styles.PaymentImageWrapperActive,
                    ]}>
                    <Image
                      source={require('../assets/app_images/paypal.png')}
                      style={styles.PaymentImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedPaymentMethod('MasterCard')}
                    style={[
                      styles.PaymentImageWrapper,
                      selectedPaymentMethod === 'MasterCard' &&
                        styles.PaymentImageWrapperActive,
                    ]}>
                    <Image
                      source={require('../assets/app_images/mastercard.jpg')}
                      style={styles.PaymentImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <PaymentFooter
                buttonPressHandler={buttonPressHandler}
                buttonTitle={`Buy with ${selectedPaymentMethod}`}
                price={{price: total.toFixed(2), currency: '$'}}
              />
            </>
          ) : (
            <></>
          )}
        </View>
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
  SummaryContainer: {
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_20,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_15,
    gap: SPACING.space_12,
  },
  SummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SummaryLabel: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  SummaryValue: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  SummaryLabelTotal: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  SummaryValueTotal: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  PaymentSection: {
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_16,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_15,
  },
  PaymentLabel: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_12,
  },
  PaymentImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: SPACING.space_16,
  },
  PaymentImageWrapper: {
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  PaymentImageWrapperActive: {
    borderColor: '#0A9C4A',
    backgroundColor: '#F0F9F4',
  },
  PaymentImage: {
    height: 32,
    width: 60,
  },
});

export default CartScreen;
