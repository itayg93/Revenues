import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFormikContext} from 'formik';

import defaultStyles from '../../config/defaultStyles';
import AppHelperText from '../AppHelperText';

const AppFormTextInput = ({name, label, icon, onIconPress, ...otherProps}) => {
  const {values, handleChange, handleBlur, touched, errors} =
    useFormikContext();
  return (
    <>
      <TextInput
        style={styles.textInput}
        name={name}
        label={label}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        right={
          icon && (
            <TextInput.Icon
              name={icon}
              color={defaultStyles.colors.mediumGrey}
              onPress={onIconPress}
            />
          )
        }
        {...otherProps}
      />
      <AppHelperText
        type="error"
        visible={touched[name]}
        message={errors[name]}
      />
    </>
  );
};

export default AppFormTextInput;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: defaultStyles.spacers.space5,
  },
});
