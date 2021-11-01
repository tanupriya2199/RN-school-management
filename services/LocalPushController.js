import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

export const LocalNotification = () => {
  PushNotification.localNotification({
    channelId: 'schoolmanagement-channel-id',
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    color: '#479ad1',
  });
};

export const handleScheduledNotification = () => {
  console.log(Date.now());
  console.log(Date.now() + 20 * 1000);
  console.log(new Date(Date.now() + 20 * 1000));
  PushNotification.localNotificationSchedule({
    channelId: 'schoolmanagement-channel-id',
    message: 'This is scheduled message after 20 sec',
    date: new Date(Date.now() + 20 * 1000),
  });
};

export const LessonCreatedNotification = (startDate, lessonName) => {
  console.log('startDate', startDate, '===', new Date(startDate));
  PushNotification.localNotificationSchedule({
    channelId: 'schoolmanagement-channel-id',
    message: `${lessonName} classes has started`,
    date: new Date(startDate),
  });
};
