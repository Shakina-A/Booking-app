//import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext.js'
import { SearchContextProvider } from './contexts/SearchContext.js'

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
        <App />
        </SearchContextProvider>
      </AppContextProvider>
      
    </QueryClientProvider>
  </React.StrictMode>,
)
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
