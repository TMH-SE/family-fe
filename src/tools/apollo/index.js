import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
const domain = window.location.host
const endPoint = process.env.GRAPHQL_END_POINT
const urn = process.env.GRAPHQL_URN || `${domain}/${endPoint}`

const httpLink = new HttpLink({
  uri: `${window.location.protocol}//${urn}`
})

const wsLink = new WebSocketLink({
  uri: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${urn}`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      'access-token': window.localStorage.getItem('access-token') || ''
    })
  }
})

const linkSplit = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const errorMiddleware = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    if (response) {
      graphQLErrors.map(({ message, code }) => {
        console.log(`${code}: ${message}`)
      })
      response.errors = graphQLErrors
    }
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`)
  }
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'access-token': localStorage.getItem('access-token') || ''
  }
}))

const link = ApolloLink.from([errorMiddleware, linkSplit])

// app.use((req, res) => {
const Client = new ApolloClient({
  // ssrMode: true,
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  // initialState: window.__APOLLO_STATE__,
  // ssrForceFetchDelay: 100
})
// s
export { Client }
