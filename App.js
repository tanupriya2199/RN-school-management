import 'react-native-gesture-handler';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';

import Lessons from './Lessons';
import CreateLesson from './CreateLesson';
import {useEffect} from 'react/cjs/react.development';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql',
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'schoolmanagement-channel-id',
      channelName: 'School Management Channel',
    });
  };

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Lessons"
          headerStyle={{
            backgroundColor: '#7caae7',
          }}>
          <Stack.Screen name="Lessons" component={Lessons} />
          <Stack.Screen
            name="CreateLesson"
            component={CreateLesson}
            options={{
              headerTitle: 'Create Lesson',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
