import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING, getColors} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import {useStore} from '../store/store';
import CustomIcon from './CustomIcon';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const toggleDarkMode = useStore((state: any) => state.toggleDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <View style={[styles.HeaderContainer, {backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={toggleDarkMode} style={styles.DarkModeButton}>
        <CustomIcon
          name={isDarkMode ? 'star' : 'star'}
          size={FONTSIZE.size_20}
          color={isDarkMode ? '#FFD700' : COLORS.primaryLightGreyHex}
        />
      </TouchableOpacity>
      <Text style={[styles.HeaderText, {color: colors.text}]}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DarkModeButton: {
    padding: SPACING.space_8,
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
});

export default HeaderBar;
