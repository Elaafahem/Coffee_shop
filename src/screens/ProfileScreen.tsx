import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  getColors,
} from '../theme/theme';
import { useStore } from '../store/store';
import OrderHistoryCard from '../components/OrderHistoryCard';

const ProfileScreen = ({ navigation }: any) => {
  const user = useStore((state: any) => state.user);
  const clearUser = useStore((state: any) => state.clearUser);
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const colors = getColors(isDarkMode);

  const handleLogout = () => {
    clearUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/app_images/avatar.jpg')}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.nameText, { color: colors.text }]}>
            {user?.name || 'Coffee Lover'}
          </Text>
          <Text style={[styles.emailText, { color: colors.textSecondary }]}>
            {user?.email || 'No email set'}
          </Text>

          {/* <View style={[styles.infoBox, { backgroundColor: colors.surface }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Favorite drink
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              Cappuccino
            </Text>
          </View> */}

          {/* SECTION HISTORIQUE DE COMMANDES */}
          <View style={styles.historyContainer}>
            <Text style={[styles.historyTitle, { color: colors.text }]}>
              Order History
            </Text>

            {OrderHistoryList.length == 0 ? (
              <Text style={[styles.emptyHistory, { color: colors.textSecondary }]}>
                No orders yet.
              </Text>
            ) : (
              <View style={styles.historyList}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: SPACING.space_30,
  },
  header: {
    paddingTop: SPACING.space_36,
    paddingHorizontal: SPACING.space_30,
    paddingBottom: SPACING.space_20,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SPACING.space_30,
  },
  avatarContainer: {
    height: 96,
    width: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: SPACING.space_20,
  },
  avatar: {
    height: 96,
    width: 96,
  },
  nameText: {
    marginTop: SPACING.space_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  emailText: {
    marginTop: SPACING.space_4,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  infoBox: {
    marginTop: SPACING.space_30,
    width: '100%',
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
  },
  infoLabel: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  infoValue: {
    marginTop: SPACING.space_4,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
  historyContainer: {
    width: '100%',
    marginTop: SPACING.space_30,
  },
  historyTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    marginBottom: SPACING.space_16,
  },
  historyList: {
    gap: SPACING.space_20,
  },
  emptyHistory: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    textAlign: 'center',
    marginTop: SPACING.space_10,
  },
  logoutButton: {
    marginTop: SPACING.space_30,
    width: '100%',
    paddingVertical: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: '#0A9C4A',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

export default ProfileScreen;


