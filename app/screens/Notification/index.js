import firebase from 'react-native-firebase';
import strings from '../../constant/strings';
import AsyncStorage from '@react-native-community/async-storage';


 createNotificationListeners = async () =>{
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log('notification-Payload', notification)
        // this.showAlert(title, body);
        const channelId = new firebase.notifications.Android.Channel("Default", "Default", firebase.notifications.Android.Importance.High);
        firebase.notifications().android.createChannel(channelId);

        let notification_to_be_displayed = new firebase.notifications.Notification({
            data: notification.data,
            sound: 'default',
            show_in_foreground: true,
            title: notification.title,
            body: notification.body,
        });

        if (Platform.OS == "android") {
            notification_to_be_displayed
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId("Default")
                .android.setVibrate(1000)
        }

        firebase.notifications().displayNotification(notification_to_be_displayed);

    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
    });
    /*
* If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
* */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        // console.log(JSON.stringify(message));
    });
}

checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
}

 getToken = async () =>{
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        console.log('token', fcmToken)
        if (fcmToken) {
            // user has a device token
        }
    } else {
        console.log('log')
    }
}

requestPermission = async () =>{
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
}

const Notification = async () => {
    this.checkPermission();
    this.createNotificationListeners();
  };
  
  export default Notification;