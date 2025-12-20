import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import { useStore } from '../store/store';

const PaymentList = [
  {
    name: 'Visa',
    icon: null,
    isIcon: false,
  },
  {
    name: 'PayPal',
    icon: null,
    isIcon: false,
  },
  {
    name: 'MasterCard',
    icon: null,
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Visa');

  const buttonPressHandler = () => {
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    // On revient à l'accueil directement
    navigation.navigate('Tab');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="#F5F5F7" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.CardContainer}>
          <Text style={styles.SectionTitle}>Payment method</Text>

          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                paymentMode === 'Credit Card' && styles.CreditCardContainerActive,
              ]}>
              <Text style={styles.CreditCardLabel}>Credit Card</Text>
              <Text style={styles.CreditCardNumber}>**** **** **** 4638</Text>
              <View style={styles.CreditCardRow}>
                <Text style={styles.CreditCardName}>Robert Evans</Text>
                <Text style={styles.CreditCardExpiry}>02/30</Text>
              </View>
            </View>
          </TouchableOpacity>

          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{ price: route.params.amount, currency: '$' }}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    paddingBottom: SPACING.space_24,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: '#1D1D1D',
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  CardContainer: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_10,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  SectionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_12,
  },
  PaymentOptionsContainer: {
    gap: SPACING.space_12,
  },
  CreditCardContainer: {
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 1.5,
    borderColor: COLORS.secondaryLightGreyHex,
    backgroundColor: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_12,
  },
  CreditCardContainerActive: {
    borderColor: COLORS.primaryOrangeHex,
  },
  CreditCardLabel: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNumber: {
    marginTop: SPACING.space_4,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
    letterSpacing: 3,
  },
  CreditCardRow: {
    marginTop: SPACING.space_8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  CreditCardExpiry: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
});

export default PaymentScreen;
