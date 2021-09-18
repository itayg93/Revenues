import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const InitializingScreen = () => {
  return (
    <View style={styles.contentContainer}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};

export default InitializingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
