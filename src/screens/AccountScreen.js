import React, {useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Headline} from 'react-native-paper';
import * as Yup from 'yup';

import authContext from '../auth/authContext';
import authService from '../services/authService';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import AppUserProfileCard from '../components/AppUserProfileCard';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number(),
  commissionRate: Yup.number(),
  compulsoryInsurance: Yup.number(),
  collateralInsurance: Yup.number(),
});

const AccountScreen = () => {
  const {user, setUser, setUserProfile} = useContext(authContext);

  const handleLogout = async () => {
    let response = await authService.handleLogoutCurrentUser();
    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);
    // success
    setUserProfile();
    setUser(null);
  };

  return (
    <AppScreen style={styles.contentContainer}>
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
});
