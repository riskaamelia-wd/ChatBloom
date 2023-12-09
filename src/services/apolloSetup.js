import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri:'https://mint-hedgehog-96.hasura.app/v1/graphql',
    headers:{
        'x-hasura-admin-secret':
        'fHZvP8kPpy6bEA0hBMu7AEV7x86qO6tz5hXc7nWedpd3J7xzrn3TLvHyr0LGmObR'
    }
})

const wsLink = new GraphQLWsLink(
    createClient({
        url:'wss://mint-hedgehog-96.hasura.app/v1/graphql',
        connectionParams:{
            headers:{
                'x-hasura-admin-secret':'fHZvP8kPpy6bEA0hBMu7AEV7x86qO6tz5hXc7nWedpd3J7xzrn3TLvHyr0LGmObR'
            }
        }
    })
)

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return(
            definition.kind === "OperationDefinition" &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link : splitLink,
    cache: new InMemoryCache()
})

export default client