import {gql} from '@apollo/client';

export const GET_LESSONS = gql`
query lessons {
  lessons {
    id
    name
    startDate
    endDate
  }
}
`