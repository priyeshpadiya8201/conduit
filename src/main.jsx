import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
import makeServer from './server'

// ✅ FIX 1: Set axios baseURL based on environment
axios.defaults.baseURL = ''

// Default query function for React Query
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

// ✅ FIX 2: Reorder conditions - Development FIRST
// @ts-ignore - Cypress injects properties into the window object during tests
if (window['Cypress'] && import.meta.env.MODE === 'test') {
  const cyServer = createServer({
    routes() {
      ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
        // @ts-ignore - Ignore TS complaining about custom Cypress properties on window
        this[method]('/*', (schema, request) => window['handleFromCypress'](request))
      })
    },
  })
  cyServer.logging = false
} else {
  makeServer({ environment: import.meta.env.MODE })
}

// ✅ Render React app AFTER Mirage is initialized
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)