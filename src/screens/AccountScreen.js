import React, {useContext, useState} from 'react';
import {StyleSheet, Keyboard, ScrollView, View} from 'react-native';
import {Portal, Headline} from 'react-native-paper';

import validationSchemas from '../utils/validationSchemas';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import authContext from '../auth/authContext';
import authService from '../services/authService';
import profileService from '../services/profileService';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from '../screens/LoadingScreen';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {
  AppForm,
  AppFormTextInput,
  AppFormButton,
  AppFormSwitch,
} from '../components/form';
import AppHelperText from '../components/AppHelperText';

const AccountScreen = () => {
  const {user, setUser, userProfile, setUserProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const response = await authService.handleLogoutCurrentUser();
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
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
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    setUserProfile(response.data);
    handlers.handleSuccessAlert(constants.PROFILE_SUCCESS_ALERT_MESSAGE);
  };

  return (
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
              compulsory: '',
              collateral: '',
            }}
            validationSchema={validationSchemas.PROFILE}
            onSubmit={async (values, {resetForm}) => {
              Keyboard.dismiss();
              await handleSubmit(values);
              resetForm();
            }}>
            {/** taxes & commission */}
            <Headline style={styles.headline}>
              {constants.TAX_COMMISSION}
            </Headline>
            {/** tax refunds */}
            <AppFormSwitch
              name={constants.taxRefunds}
              label={constants.TAX_REFUNDS}
              value={userProfile.taxRefunds}
            />
            <View style={styles.textInputsContainer}>
              {/** tax points */}
              <View style={styles.leftInputContainer}>
                <AppFormTextInput
                  name={constants.taxPoints}
                  label={constants.TAX_POINTS}
                  keyboardType="numeric"
                />
                <AppHelperText
                  style={styles.helperText}
                  message={`${constants.HELPER_TEXT_PREFIX}${userProfile.taxPoints}`}
                  visible
                />
              </View>
              {/** commission */}
              <View style={styles.rightInputContainer}>
                <AppFormTextInput
                  name={constants.commissionRate}
                  label={constants.COMMISSION_RATE}
                  keyboardType="numeric"
                />
                <AppHelperText
                  style={styles.helperText}
                  message={`${constants.HELPER_TEXT_PREFIX}${userProfile.commissionRate}${constants.PERCENTAGE}`}
                  visible
                />
              </View>
            </View>
            {/** insurances */}
            <Headline style={styles.headline}>{constants.INSURANCES}</Headline>
            <View style={styles.textInputsContainer}>
              {/** compulsory */}
              <View style={styles.leftInputContainer}>
                <AppFormTextInput
                  name={constants.compulsory}
                  label={constants.COMPULSORY}
                  keyboardType="numeric"
                />
                <AppHelperText
                  style={styles.helperText}
                  message={`${constants.HELPER_TEXT_PREFIX}${userProfile.compulsory}${constants.INS}`}
                  visible
                />
              </View>
              {/** collateral */}
              <View style={styles.rightInputContainer}>
                <AppFormTextInput
                  name={constants.collateral}
                  label={constants.COLLATERAL}
                  keyboardType="numeric"
                />
                <AppHelperText
                  style={styles.helperText}
                  message={`${constants.HELPER_TEXT_PREFIX}${userProfile.collateral}${constants.INS}`}
                  visible
                />
              </View>
            </View>
            {/** submit */}
            <AppFormButton />
          </AppForm>
        </View>
      </ScrollView>
    </AppScreen>
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
