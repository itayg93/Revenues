import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

const AppScreen = ({children, style}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.contentContainer, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
