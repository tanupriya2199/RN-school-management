import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, TouchableHighlight } from 'react-native';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-native-date-picker'

import { LessonCreatedNotification } from './services/LocalPushController';
import { CREATE_NEW_LESSON } from './gql-operations/mutations/create-lesson.mutation';

function CreateLesson( { navigation }) {
    const [name , setName] = useState('');
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [createLesson ] = useMutation(CREATE_NEW_LESSON)

    const onSave = () => {
        const values = {
            name : name,
            startDate : startDate.toISOString(),
            endDate : endDate.toISOString()
        }
        createLesson({
            variables : {
                createLessonInput : values
            },
            refetchQueries : ['lessons']
        }).then(res=> {
            console.log("res==", res);
            LessonCreatedNotification(startDate, name)

        }).catch(err=> {
            console.log("err===", err);
        })
        navigation.pop();
    }
 
    return (    
        <View style={styles.form}>
            <View style={styles.formContainer}>
                <View>
                    <Text>Name</Text>
                    <TextInput  
                        style={styles.txtinput}
                        onChangeText = {(name)=> setName(name)}
                        value={name}
                        selectTextOnFocus = {true}
                    />
                </View>
                <View>
                    <Text>Start Date</Text>
                    <DatePicker
                        date={startDate}
                        onDateChange={(e)=> setStartDate(e)}
                    />
                </View>
                <View>
                    <Text>End Date</Text>
                    <DatePicker
                        date={endDate}
                        onDateChange={(e)=> setEndDate(e)}
                    />
                </View>
            </View>
            <TouchableHighlight style={styles.saveButton} onPress={()=> {onSave()}} >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    form : {
        flex : 1,
        display : "flex",
        flexDirection : 'column',
        justifyContent : 'space-between',
        paddingVertical : 10,
        paddingHorizontal : 20

    },
    formContainer : {
       
    },
    saveButton : {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#7caae7',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        textAlign : 'center',
    },
    buttonText : {
        fontSize : 24,
        color : 'white',
        fontFamily : 'Ubuntu-Bold'
    }
})

export default CreateLesson
