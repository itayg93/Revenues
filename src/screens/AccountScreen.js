import React, {useContext, useEffect} from 'react';
import {StyleSheet, ScrollView, Keyboard} from 'react-native';
import {Headline} from 'react-native-paper';
import * as Yup from 'yup';

import authContext from '../auth/authContext';
import authService from '../services/authService';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';
import AppHelperText from '../components/AppHelperText';

const HELPER_TEXT_AFFIX = 'Current: ';

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number(),
  commissionRate: Yup.number(),
  compulsoryInsurance: Yup.number(),
  collateralInsurance: Yup.number(),
});

const AccountScreen = () => {
  const {user, setUser, setUserProfile, userProfile} = useContext(authContext);

  useEffect(() => {
    return () => {
      setUserProfile();
    };
  }, []);

  const handleLogout = async () => {
    const response = await authService.handleLogoutCurrentUser();
    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);
    // success
    setUser();
  };

  const handleSubmit = async values => {
    console.log(values);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      {/** profile card */}
      <AppUserProfileCard user={user} onLogoutPress={handleLogout} />
      <ScrollView>
        <AppForm
          initialValues={{
            taxPoints: '',
            commissionRate: '',
            compulsoryInsurance: '',
            collateralInsurance: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            Keyboard.dismiss();
            handleSubmit(values);
          }}>
          {/** tax */}
          <AppFormTextInput
            name="taxPoints"
            label="Tax Points"
            keyboardType="numeric"
          />
          <AppHelperText
            style={styles.helperText}
            message={`${HELPER_TEXT_AFFIX}${userProfile.taxPoints}`}
          />
          {/** commission */}
          <AppFormTextInput
            name="commissionRate"
            label="Commission Rate"
            keyboardType="numeric"
          />
          <AppHelperText
            style={styles.helperText}
            message={`${HELPER_TEXT_AFFIX}${userProfile.commissionRate}`}
          />
          {/** insurances */}
          <Headline style={styles.headline}>Insurances</Headline>
          {/** compulsory */}
          <AppFormTextInput
            name="compulsoryInsurance"
            label="Compulsory "
            keyboardType="numeric"
          />
          <AppHelperText
            style={styles.helperText}
            message={`${HELPER_TEXT_AFFIX}${userProfile.compulsoryInsurance}`}
          />
          {/** collateral */}
          <AppFormTextInput
            name="collateralInsurance"
            label="Collateral "
            keyboardType="numeric"
          />
          <AppHelperText
            style={styles.helperText}
            message={`${HELPER_TEXT_AFFIX}${userProfile.collateralInsurance}`}
          />
          {/** submit */}
          <AppFormButton />
        </AppForm>
      </ScrollView>
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
  helperText: {
    alignSelf: 'flex-end',
    color: defaultStyles.colors.darkGrey,
  },
});
