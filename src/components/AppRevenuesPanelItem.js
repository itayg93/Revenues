import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '../utils/constants';
import defaultStyles from '../config/defaultStyles';

const AppRevenuesPanelItem = ({label, data}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="chevron-right"
        size={18}
        color={defaultStyles.colors.mediumGrey}
      />
      <Paragraph>
        {label}: {data.toFixed(2)}
        {constants.INS}
      </Paragraph>
    </View>
  );
};

export default AppRevenuesPanelItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: defaultStyles.spacers.space5,
  },
  icon: {
    marginRight: defaultStyles.spacers.space10,
  },
});
