import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import {
  LocalNotification,
  handleScheduledNotification,
} from './services/LocalPushController';
import {GET_LESSONS} from './gql-operations/queries/get-lessons.query';

const Lessons = ({navigation}) => {
  const {data, loading, error} = useQuery(GET_LESSONS, {
    fetchPolicy: 'network-only',
  });

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (data) {
      setLessons(data.lessons);
    }
  }, [data]);

  const testItem = ({item}) => (
    <View style={styles.lesson}>
      <Text style={styles.lessonTitle}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={testItem}
        keyExtractor={item => item.id}
      />
      <View>
        <TouchableHighlight
          style={styles.addLessonButton}
          onPress={() => {
            LocalNotification();
          }}>
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.addLessonButton}
          onPress={() => {
            handleScheduledNotification();
          }}>
          <Text style={styles.buttonText}>Send Scheduled Notification</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.addLessonButton}
          onPress={() => navigation.navigate('CreateLesson')}>
          <Text style={styles.buttonText}>Add New Lessons</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  lesson: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  lessonTitle: {
    fontSize: 22,
  },
  addLessonButton: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#7caae7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Lessons;
