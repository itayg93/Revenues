import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface, Headline, IconButton} from 'react-native-paper';

import useTimer from '../hooks/useTimer';
import timeFormatter from '../utils/timeFormatter';
import defaultStyles from '../config/defaultStyles';

const AppTimerControlPanel = () => {
  const {
    timer,
    active,
    paused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer();

  return (
    <Surface style={styles.timerControlPanelContainer}>
      <Headline>{timeFormatter(timer)}</Headline>
      {/** buttons */}
      <View style={styles.timerControlButtonsContainer}>
        {/** start */}
        <IconButton
          icon="clock-start"
          color={defaultStyles.colors.mediumGrey}
          onPress={handleStart}
          disabled={active}
        />
        {/** resume */}
        <IconButton
          icon="play"
          color={defaultStyles.colors.mediumGrey}
          onPress={handleResume}
          disabled={!active || paused}
        />
        {/** pause */}
        <IconButton
          icon="pause"
          color={defaultStyles.colors.mediumGrey}
          onPress={handlePause}
          disabled={!active || !paused}
        />
        {/** restart */}
        <IconButton
          icon="restart-alert"
          color={defaultStyles.colors.mediumGrey}
          onPress={handleReset}
          disabled={!active}
        />
      </View>
    </Surface>
  );
};

export default AppTimerControlPanel;

const styles = StyleSheet.create({
  timerControlPanelContainer: {
    alignItems: 'center',
    marginVertical: defaultStyles.spacers.space5,
    padding: defaultStyles.spacers.space10,
    borderRadius: 10,
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
  },
  timerControlButtonsContainer: {
    flexDirection: 'row',
  },
});
