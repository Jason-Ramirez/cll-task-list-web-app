import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, gql } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import appConfig from '../config/app';
import { AuthProvider } from '../providers/auth';
import '../styles/globals.css';
import '../styles/layouts/carelulu.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp