import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useFormikContext} from 'formik';

import defaultStyles from '../../config/defaultStyles';

const AppFormButton = ({loading = false, label = 'Submit'}) => {
  const {handleSubmit} = useFormikContext();
  return (
    <Button
      style={styles.button}
      mode="contained"
      loading={loading}
      onPress={handleSubmit}>
      {label}
    </Button>
  );
};

export default AppFormButton;

const styles = StyleSheet.create({
  button: {
    marginTop: defaultStyles.spacers.space5,
  },
});
