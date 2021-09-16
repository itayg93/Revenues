import React, {useState, useContext} from 'react';
import {Alert, StyleSheet} from 'react-native';
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
  const {setUser} = useContext(authContext);

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const handleLoginWithEmailAndPassword = async values => {
    setLoading(true);
    let response = await authService.handleLoginWithEmailAndPassword(
      values.email,
      values.password,
    );

    // error
    if (!response.isSuccess) {
      setLoading(false);
      Alert.alert('Error', response.error);
      return;
    }

    // success
    setLoading(false);
    setUser(response.data);
  };

  const handleLoginWithGoogle = async () => {
    let response = await authService.handleLoginWithGoogle();

    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);

    // success
    setUser(response.data);
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
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLoginWithGoogle}
      />
    </AppScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});
