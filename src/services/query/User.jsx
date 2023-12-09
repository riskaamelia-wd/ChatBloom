import { gql } from "@apollo/client";

export const GETUSER = gql`
    query MyQuery {
        user {
        id
        name
        }
    }
`

export const POSTUSER = gql`
    mutation MyMutation($object: user_insert_input!) {
        insert_user_one(object: $object) {
        id
        name
        }
    }
`