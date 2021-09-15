import React from 'react';
import {StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import * as Yup from 'yup';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number(),
  commissionRate: Yup.number(),
  compulsoryInsurance: Yup.number(),
  collateralInsurance: Yup.number(),
  personalInsurance: Yup.number(),
});

const AccountScreen = () => {
  return (
    <AppScreen style={styles.contentContainer}>
      <AppForm
        initialValues={{
          taxPoints: '',
          commissionRate: '',
          compulsoryInsurance: '',
          collateralInsurance: '',
          personalInsurance: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => console.log(values)}>
        {/** tax */}
        <AppFormTextInput
          name="taxPoints"
          placeholder="Tax Points"
          keyboardType="numeric"
        />
        {/** commission */}
        <AppFormTextInput
          name="commissionRate"
          placeholder="Commission Rate"
          keyboardType="numeric"
        />
        {/** insurances */}
        <Headline style={styles.headline}>Insurances</Headline>
        {/** compulsory */}
        <AppFormTextInput
          name="compulsoryInsurance"
          placeholder="Compulsory "
          keyboardType="numeric"
        />
        {/** collateral */}
        <AppFormTextInput
          name="collateralInsurance"
          placeholder="Collateral "
          keyboardType="numeric"
        />
        {/** personal */}
        <AppFormTextInput
          name="personalInsurance"
          placeholder="Personal "
          keyboardType="numeric"
        />
        {/** submit */}
        <AppFormButton />
      </AppForm>
    </AppScreen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  headline: {
    marginBottom: defaultStyles.spacers.space5,
  },
});
