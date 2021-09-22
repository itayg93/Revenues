import React from 'react';
import {StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';

const RevenuesScreen = () => {
  return (
    <AppScreen style={styles.contentContainer}>
      <Headline>Revenues</Headline>
    </AppScreen>
  );
};

export default RevenuesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});
