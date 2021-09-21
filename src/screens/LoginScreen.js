import React, {useState, useContext} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import {Portal, Button} from 'react-native-paper';
import * as Yup from 'yup';

import authService from '../services/authService';
import authContext from '../auth/authContext';
import constants from '../utils/constants';
import handlers from '../utils/handlers';
import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const LOGIN_TYPES = {
  EMAIL_PASSWORD: authService.handleLoginWithEmailAndPassword,
  GOOGLE: authService.handleLoginWithGoogle,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label(constants.EMAIL),
  password: Yup.string().required().min(6).label(constants.PASSWORD),
});

const LoginScreen = () => {
  const {setUser, setUserProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async (loginType, values) => {
    setLoading(true);
    const response = await loginType(values);
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
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            Keyboard.dismiss();
            handleLogin(LOGIN_TYPES.EMAIL_PASSWORD, values);
          }}>
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
          <AppFormButton label={constants.LOGIN} />
        </AppForm>
        {/** google button */}
        <View style={styles.googleButtonContainer}>
          <Button
            color={defaultStyles.colors.darkGrey}
            icon="google"
            mode="contained"
            onPress={() => handleLogin(LOGIN_TYPES.GOOGLE)}>
            {constants.LOGIN}
          </Button>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  googleButtonContainer: {
    marginTop: defaultStyles.spacers.space10,
  },
});
