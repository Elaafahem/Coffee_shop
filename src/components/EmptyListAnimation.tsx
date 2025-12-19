import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, getColors} from '../theme/theme';
import {useStore} from '../store/store';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  const isDarkMode = useStore((state: any) => state.isDarkMode);
  const colors = getColors(isDarkMode);

  return (
    <View style={styles.EmptyCartContainer}>
      <Text style={[styles.EmptyText, {color: colors.text}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  EmptyText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
  },
});

export default EmptyListAnimation;
