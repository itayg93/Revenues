import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Headline, Button} from 'react-native-paper';

import constants from '../utils/constants';
import routes from '../navigation/routes';
import defaultStyles from '../config/defaultStyles';
import AppScreen from '../components/AppScreen';

const WelcomeScreen = ({navigation}) => {
  return (
    <AppScreen style={styles.contentContainer}>
      <Headline>{constants.WELCOME}</Headline>
      {/** buttons */}
      <View style={styles.buttonsContainer}>
        {/** login */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}>
          {constants.LOGIN}
        </Button>
        {/** spacer */}
        <View style={styles.spacer} />
        {/** register */}
        <Button
          mode="contained"
          color={defaultStyles.colors.darkGrey}
          onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}>
          {constants.REGISTER}
        </Button>
      </View>
    </AppScreen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: defaultStyles.spacers.space10,
  },
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: defaultStyles.spacers.space10,
    left: defaultStyles.spacers.space10,
  },
  spacer: {
    marginVertical: defaultStyles.spacers.space5,
  },
});
