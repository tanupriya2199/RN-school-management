import gql from 'graphql-tag';

 export const CREATE_NEW_LESSON = gql`
    mutation createLesson($createLessonInput : createLessonInput!){
        createLesson(createLessonInput : $createLessonInput){
            id
            name
            startDate
            endDate
        }
    }`; 

