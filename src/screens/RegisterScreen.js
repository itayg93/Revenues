import React, {useState, useContext} from 'react';
import {Keyboard, Alert, StyleSheet} from 'react-native';
import {Portal} from 'react-native-paper';
import * as Yup from 'yup';

import authService from '../services/authService';
import authContext from '../auth/authContext';

import defaultStyles from '../config/defaultStyles';
import LoadingScreen from './LoadingScreen';
import AppScreen from '../components/AppScreen';
import {AppForm, AppFormTextInput, AppFormButton} from '../components/form';
import LoginScreen from './LoginScreen';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

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
    if (!response.isSuccess) return Alert.alert('Error', response.error);
    // success
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  return (
    <AppScreen style={styles.contentContainer}>
      <Portal>{loading && <LoadingScreen />}</Portal>
      <AppForm
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          Keyboard.dismiss();
          handleRegister(values);
        }}>
        {/** name */}
        <AppFormTextInput name="name" label="Name" autoCorrect={false} />
        {/** email */}
        <AppFormTextInput
          name="email"
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        {/** password */}
        <AppFormTextInput
          name="password"
          label="Password"
          icon="eye"
          onIconPress={() => setHidePassword(!hidePassword)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={hidePassword}
        />
        {/** submit */}
        <AppFormButton label="Register" />
      </AppForm>
    </AppScreen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
});
