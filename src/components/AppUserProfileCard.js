import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../config/defaultStyles';

const AppUserProfileCard = ({user, onLogoutPress}) => {
  return (
    <View style={styles.container}>
      {/** avatar */}
      <View style={styles.avatarContainer}>
        <Avatar.Text label={user.displayName[0]} />
      </View>
      {/** user details */}
      <View style={styles.userDetailsContainer}>
        <Title>{user.displayName}</Title>
        <Caption>{user.email}</Caption>
      </View>
      {/** logout icon */}
      <TouchableOpacity onPress={onLogoutPress}>
        <MaterialCommunityIcons
          name="logout"
          size={30}
          color={defaultStyles.colors.mediumGrey}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppUserProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.white,
    padding: defaultStyles.spacers.space10,
    marginBottom: defaultStyles.spacers.space10,
    borderRadius: 10,
  },
  avatarContainer: {},
  userDetailsContainer: {
    flex: 1,
    marginLeft: defaultStyles.spacers.space10,
  },
});
