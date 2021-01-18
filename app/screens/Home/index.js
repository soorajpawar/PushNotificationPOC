/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View, Text} from 'react-native';
import Button from '../../components/Button';
import { SCREEN_NAMES } from '../../routes/helper';
import Realm from 'realm';
import styles from './styles';
import strings from '../../constant/strings';
import Notification from '../Notification';
import {changeNotificationSetting,checkNotificationPermission} from 'react-native-check-notification-permission';
import { AlertWithOption, AlertWithoutOption } from '../../components/AlertModel'

let realm;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: { type: 'int', default: 0 },
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });
  }

  
  async componentDidMount () {
  const isPermissionEnable = await checkNotificationPermission();
  if(isPermissionEnable){
		Notification()
    } else {
        AlertWithOption( strings.common.notificationEnable, () => changeNotificationSetting() )
    }

}


  render() {
    return (
      <View
        style={styles.container}>
          <Text style={{ alignSelf:'center'}}>NotiFication POC</Text>
        {/* <Button
          title= {strings.buttons.register}
          customClick={() => this.props.navigation.navigate(SCREEN_NAMES.register)}
        />
        <Button
          title= {strings.buttons.viewUser}
          customClick={() => this.props.navigation.navigate(SCREEN_NAMES.viewAll)}
        />
        <Button
          title= {strings.buttons.updateUserDetails}
          customClick={() => this.props.navigation.navigate(SCREEN_NAMES.update)}
        />
        <Button
          title= {strings.buttons.delete}
          customClick={() => this.props.navigation.navigate(SCREEN_NAMES.delete)}
        /> */}
      </View>
    );
  }
}