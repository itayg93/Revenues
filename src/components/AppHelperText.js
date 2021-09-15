import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HelperText} from 'react-native-paper';

import defaultStyles from '../config/defaultStyles';

const AppHelperText = ({type = 'error', visible, message}) => {
  if (!visible || !message) return null;
  return (
    <View>
      <HelperText
        style={styles.helperText}
        padding="none"
        type={type}
        visible={visible}>
        {message}
      </HelperText>
    </View>
  );
};

export default AppHelperText;

const styles = StyleSheet.create({
  helperText: {
    marginBottom: defaultStyles.spacers.space5,
  },
});
