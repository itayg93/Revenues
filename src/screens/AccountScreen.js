import React, {useContext} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Keyboard,
  ScrollView,
  View,
} from 'react-native';
import {Headline} from 'react-native-paper';
import * as Yup from 'yup';

import authContext from '../auth/authContext';
import authService from '../services/authService';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';
import AppHelperText from '../components/AppHelperText';

const HELPER_TEXT_PREFIX = 'Current: ';
const PERCENTAGE = '%';
const INS = '₪';

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number(),
  commissionRate: Yup.number(),
  compulsoryInsurance: Yup.number(),
  collateralInsurance: Yup.number(),
});

const AccountScreen = () => {
  const {user, setUser, userProfile} = useContext(authContext);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <AppScreen>
        {/** profile card */}
        <View style={styles.userProfileCardContainer}>
          <AppUserProfileCard user={user} onLogoutPress={handleLogout} />
        </View>
        <ScrollView>
          <View style={styles.appFormContainer}>
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
                message={`${HELPER_TEXT_PREFIX}${userProfile.taxPoints}`}
              />
              {/** commission */}
              <AppFormTextInput
                name="commissionRate"
                label="Commission Rate"
                keyboardType="numeric"
              />
              <AppHelperText
                style={styles.helperText}
                message={`${HELPER_TEXT_PREFIX}${userProfile.commissionRate}${PERCENTAGE}`}
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
                message={`${HELPER_TEXT_PREFIX}${userProfile.compulsoryInsurance}${INS}`}
              />
              {/** collateral */}
              <AppFormTextInput
                name="collateralInsurance"
                label="Collateral "
                keyboardType="numeric"
              />
              <AppHelperText
                style={styles.helperText}
                message={`${HELPER_TEXT_PREFIX}${userProfile.collateralInsurance}${INS}`}
              />
              {/** submit */}
              <AppFormButton />
            </AppForm>
          </View>
        </ScrollView>
      </AppScreen>
    </KeyboardAvoidingView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userProfileCardContainer: {
    padding: defaultStyles.spacers.space10,
  },
  appFormContainer: {
    paddingHorizontal: defaultStyles.spacers.space10,
    marginBottom: defaultStyles.spacers.space10,
  },
  headline: {
    marginBottom: defaultStyles.spacers.space5,
  },
  helperText: {
    alignSelf: 'flex-end',
    color: defaultStyles.colors.darkGrey,
  },
});
