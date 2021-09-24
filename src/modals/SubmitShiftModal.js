import React from 'react';
import {StyleSheet, Keyboard, View} from 'react-native';
import {Modal, Headline} from 'react-native-paper';

import validationSchemas from '../utils/validationSchemas';
import constants from '../utils/constants';
import defaultStyles from '../config/defaultStyles';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const SubmitShiftModal = ({visible, onFinish}) => {
  return (
    <Modal
      visible={visible}
      contentContainerStyle={styles.container}
      dismissable={false}>
      <AppForm
        initialValues={{
          deliveries: '',
          wolt: '',
          creditTips: '',
          cashTips: '',
        }}
        validationSchema={validationSchemas.SHIFT}
        onSubmit={values => {
          Keyboard.dismiss();
          onFinish(values);
        }}>
        {/** deliveries & wolt */}
        <View style={styles.textInputsContainer}>
          {/** deliveries */}
          <View style={styles.leftInputContainer}>
            <AppFormTextInput
              name={constants.deliveries}
              label={constants.DELIVERIES}
              keyboardType="numeric"
            />
          </View>
          {/** wolt */}
          <View style={styles.rightInputContainer}>
            <AppFormTextInput
              name={constants.wolt}
              label={constants.WOLT}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/** credit & cash tips */}
        <Headline style={styles.headline}>Tips</Headline>
        <View style={styles.textInputsContainer}>
          {/** credit tips */}
          <View style={styles.leftInputContainer}>
            <AppFormTextInput
              name={constants.credit_tips}
              label={constants.CREDIT}
              keyboardType="numeric"
            />
          </View>
          {/** cash tips */}
          <View style={styles.rightInputContainer}>
            <AppFormTextInput
              name={constants.cash_tips}
              label={constants.CASH}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/** submit */}
        <AppFormButton />
      </AppForm>
    </Modal>
  );
};

export default SubmitShiftModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: defaultStyles.spacers.space30,
    left: 0,
    right: 0,
    borderRadius: 10,
    marginHorizontal: defaultStyles.spacers.space10,
    padding: defaultStyles.spacers.space15,
    backgroundColor: defaultStyles.colors.white,
  },
  textInputsContainer: {
    flexDirection: 'row',
  },
  leftInputContainer: {
    flex: 1,
    marginRight: defaultStyles.spacers.space5,
  },
  rightInputContainer: {
    flex: 1,
    marginLeft: defaultStyles.spacers.space5,
  },
  headline: {
    marginVertical: defaultStyles.spacers.space5,
  },
});
