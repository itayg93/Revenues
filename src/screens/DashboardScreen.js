import React from 'react';
import {StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';

const DashboardScreen = () => {
  return (
    <AppScreen style={styles.contentContainer}>
      <Headline>Dashboard Screen</Headline>
    </AppScreen>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});
