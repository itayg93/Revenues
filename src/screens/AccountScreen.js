import React, {useContext, useState} from 'react';
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

import handlers from '../utils/handlers';
import authContext from '../auth/authContext';
import authService from '../services/authService';
import profileService from '../services/profileService';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';
import AppHelperText from '../components/AppHelperText';

const SUCCESS = 'Success';
const SUCCESS_ALERT_MESSAGE = 'Profile successfully updated!';
const ERROR = 'Error';

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
  const {user, setUser, userProfile, setUserProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const response = await authService.handleLogoutCurrentUser();
    // error
    if (!response.isSuccess)
      return handlers.handleShowAlert(ERROR, response.error);
    // success
    setUser();
  };

  const handleSubmit = async values => {
    setLoading(true);
    const response = await profileService.handleUpdateCurrentUserProfile(
      user.uid,
      values,
    );
    setLoading(false);
    // null
    if (!response) return;
    // error
    if (!response.isSuccess)
      return handlers.handleShowAlert(ERROR, response.error);
    // success
    setUserProfile(response.data);
    handlers.handleShowAlert(SUCCESS, SUCCESS_ALERT_MESSAGE);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <AppScreen>
        {/** profile card */}
        <View style={styles.userProfileCardContainer}>
          <AppUserProfileCard
            user={user}
            lastUpdateMillis={userProfile.timestamp}
            onPress={handleLogout}
          />
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
              onSubmit={async (values, {resetForm}) => {
                Keyboard.dismiss();
                await handleSubmit(values);
                resetForm();
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
              <View style={styles.insurancesContainer}>
                {/** compulsory */}
                <View style={styles.insuranceContainer}>
                  <AppFormTextInput
                    name="compulsoryInsurance"
                    label="Compulsory "
                    keyboardType="numeric"
                  />
                  <AppHelperText
                    style={styles.helperText}
                    message={`${HELPER_TEXT_PREFIX}${userProfile.compulsoryInsurance}${INS}`}
                  />
                </View>
                {/** collateral */}
                <View style={styles.insuranceContainer}>
                  <AppFormTextInput
                    name="collateralInsurance"
                    label="Collateral "
                    keyboardType="numeric"
                  />
                  <AppHelperText
                    style={styles.helperText}
                    message={`${HELPER_TEXT_PREFIX}${userProfile.collateralInsurance}${INS}`}
                  />
                </View>
              </View>
              {/** submit */}
              <AppFormButton loading={loading} />
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
  insurancesContainer: {
    flexDirection: 'row',
  },
  insuranceContainer: {
    flex: 1,
  },
  helperText: {
    alignSelf: 'flex-end',
    color: defaultStyles.colors.darkGrey,
  },
});
