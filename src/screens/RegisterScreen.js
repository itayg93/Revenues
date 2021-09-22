import React, {useState, useContext} from 'react';
import {Keyboard, ScrollView, StyleSheet} from 'react-native';
import {Portal} from 'react-native-paper';

import authService from '../services/authService';
import authContext from '../auth/authContext';
import validationSchemas from '../utils/validationSchemas';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const RegisterScreen = () => {
  const {setUser, setUserProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleRegister = async values => {
    setLoading(true);
    const response = await authService.handleRegisterWithEmailAndPassword(
      values.name,
      values.email,
      values.password,
    );
    setLoading(false);
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <ScrollView>
        <AppForm
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={validationSchemas.REGISTER}
          onSubmit={values => {
            Keyboard.dismiss();
            handleRegister(values);
          }}>
          {/** name */}
          <AppFormTextInput
            name={constants.name}
            label={constants.NAME}
            autoCorrect={false}
          />
          {/** email */}
          <AppFormTextInput
            name={constants.email}
            label={constants.EMAIL}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          {/** password */}
          <AppFormTextInput
            name={constants.password}
            label={constants.PASSWORD}
            icon="eye"
            onIconPress={() => setHidePassword(!hidePassword)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={hidePassword}
          />
          {/** submit */}
          <AppFormButton />
        </AppForm>
      </ScrollView>
    </AppScreen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});
