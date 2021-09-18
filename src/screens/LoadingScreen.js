import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface, ActivityIndicator} from 'react-native-paper';

import defaultStyles from '../config/defaultStyles';

const LoadingScreen = () => {
  return (
    <View style={styles.contentContainer}>
      <Surface style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" />
      </Surface>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.mediumGrey,
    opacity: 0.3,
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: defaultStyles.spacers.space30,
    borderRadius: 10,
    backgroundColor: defaultStyles.colors.lightGrey,
    elevation: 6,
  },
});
