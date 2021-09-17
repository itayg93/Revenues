import React, {useState, useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

import authService from '../services/authService';
import authContext from '../auth/authContext';

import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = () => {
  const {setUser, setUserProfile} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleLoginWithEmailAndPassword = async ({email, password}) => {
    setLoading(true);
    const response = await authService.handleLoginWithEmailAndPassword(
      email,
      password,
    );
    // error
    if (!response.isSuccess) {
      setLoading(false);
      Alert.alert('Error', response.error);
      return;
    }
    // success
    setLoading(false);
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  const handleLoginWithGoogle = async () => {
    let response = await authService.handleLoginWithGoogle();
    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);
    // success
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <AppForm
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleLoginWithEmailAndPassword(values)}>
        {/** email */}
        <AppFormTextInput
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        {/** password */}
        <AppFormTextInput
          name="password"
          placeholder="Password"
          icon="eye"
          onIconPress={() => setHidePassword(!hidePassword)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={hidePassword}
        />
        {/** submit */}
        <AppFormButton label="Login" loading={loading} />
      </AppForm>
      <View style={styles.googleButtonContainer}>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleLoginWithGoogle}
        />
      </View>
    </AppScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  googleButtonContainer: {
    flexDirection: 'row-reverse',
    marginTop: defaultStyles.spacers.space10,
  },
  googleButton: {
    width: 192,
    height: 48,
  },
});
