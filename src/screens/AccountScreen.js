import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Keyboard,
  ScrollView,
  View,
} from 'react-native';
import {Portal, Headline} from 'react-native-paper';
import * as Yup from 'yup';

import handlers from '../utils/handlers';
import authContext from '../auth/authContext';
import authService from '../services/authService';
import profileService from '../services/profileService';

import defaultStyles from '../config/defaultStyles';
import LoadingScreen from '../screens/LoadingScreen';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';
import AppFormSwitch from '../components/form/AppFormSwitch';
import AppHelperText from '../components/AppHelperText';

const SUCCESS = 'Success';
const SUCCESS_ALERT_MESSAGE = 'Profile successfully updated!';
const ERROR = 'Error';

const HELPER_TEXT_PREFIX = 'Current: ';

const PERCENTAGE = '%';
const INS = '₪';

const validationSchema = Yup.object().shape({
  taxRefunds: Yup.boolean(),
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
      userProfile.taxRefunds,
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
        <Portal>{loading && <LoadingScreen />}</Portal>
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
              {/** taxes && commission */}
              <Headline style={styles.headline}>Tax & Commission</Headline>
              {/** tax refunds */}
              <AppFormSwitch
                name="taxRefunds"
                label="Tax Refunds"
                value={userProfile.taxRefunds}
              />
              <View style={styles.textInputsContainer}>
                {/** tax points */}
                <View style={styles.leftInputContainer}>
                  <AppFormTextInput
                    name="taxPoints"
                    label="Tax Points"
                    keyboardType="numeric"
                  />
                  <AppHelperText
                    style={styles.helperText}
                    message={`${HELPER_TEXT_PREFIX}${userProfile.taxPoints}`}
                  />
                </View>
                {/** commission */}
                <View style={styles.rightInputContainer}>
                  <AppFormTextInput
                    name="commissionRate"
                    label="Commission Rate"
                    keyboardType="numeric"
                  />
                  <AppHelperText
                    style={styles.helperText}
                    message={`${HELPER_TEXT_PREFIX}${userProfile.commissionRate}${PERCENTAGE}`}
                  />
                </View>
              </View>
              {/** insurances */}
              <Headline style={styles.headline}>Insurances</Headline>
              <View style={styles.textInputsContainer}>
                {/** compulsory */}
                <View style={styles.leftInputContainer}>
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
                <View style={styles.rightInputContainer}>
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
    marginBottom: defaultStyles.spacers.space10,
  },
  helperText: {
    alignSelf: 'flex-end',
    color: defaultStyles.colors.darkGrey,
  },
});
