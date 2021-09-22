import React from 'react';
import {Chip} from 'react-native-paper';
import {useFormikContext} from 'formik';

const AppFormChip = ({type, name = 'type'}) => {
  const {values, setFieldValue} = useFormikContext();
  return (
    <Chip
      icon={type.icon}
      selected={type.value === values[name]}
      onPress={() => setFieldValue(name, type.value)}>
      {type.label}
    </Chip>
  );
};

export default AppFormChip;
