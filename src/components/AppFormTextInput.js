import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFormikContext} from 'formik';

import defaultStyles from '../config/defaultStyles';

const AppFormTextInput = ({name, placeholder, ...otherProps}) => {
  const {values, handleChange, handleBlur} = useFormikContext();
  return (
    <TextInput
      style={styles.textInput}
      name={name}
      placeholder={placeholder}
      value={values[name]}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      {...otherProps}
    />
  );
};

export default AppFormTextInput;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: defaultStyles.spacers.space5,
  },
});
