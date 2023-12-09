// mutation MyMutation2($object: message_insert_input!) {
//     insert_message_one(object: $object) {
//     id
//     message
//     }

import { gql } from "@apollo/client"

// }
export const POSTCHAT = gql`
mutation MyMutation3($message: String!, $id: uuid!, $idUser: uuid!) {
    insert_message(objects: {id: $id, message: $message, idUser: $idUser}) {
      returning {
        id
        message
        user {
          id
          name
        }
        idUser
      }
    }
  }
`

export const GETCHAT = gql`
    subscription MySubscription {
        message {
        id
        message
            user {
                id
                name
            }
        }
    }
`