import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Switch} from 'react-native-paper';
import {useFormikContext} from 'formik';

import defaultStyles from '../../config/defaultStyles';

const AppFormSwitch = ({name, label, value}) => {
  const {setFieldValue} = useFormikContext();
  const [refunds, setRefunds] = useState(value);

  const handleValueChange = value => {
    setFieldValue(name, value);
    setRefunds(value);
  };

  return (
    <View style={styles.container}>
      <Paragraph style={styles.paragraph}>{label}</Paragraph>
      <Switch
        value={refunds}
        onValueChange={value => handleValueChange(value)}
        color={defaultStyles.colors.darkGrey}
      />
    </View>
  );
};

export default AppFormSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: defaultStyles.spacers.space10,
  },
  paragraph: {
    flex: 1,
  },
});
