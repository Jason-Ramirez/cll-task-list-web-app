import React, { useState, useContext, createContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import appConfig from '../config/app';
import { $post, $get } from '../composables/fetch';
import { getAuthHeaders, setAuthToken } from '../composables/auth';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const createApolloClient = () => {
    const link = new HttpLink({
      uri: appConfig.api_url,
      headers: getAuthHeaders(),
    });
    return new ApolloClient({ link, cache: new InMemoryCache() });
  }
  const login = async (email, password ) => {
    try {
      const jsonResponse = await $post('/login', { email, password });
      if (jsonResponse.success) {
        const token = jsonResponse.data.token;
        setAuthToken(token);
        return jsonResponse.data;
      }
      throw 'Invalid credentials!';
    } catch (error) {
      alert(error);
      return false;
    }
  }
  const logout = () => {
    setAuthToken(null);
  }
  return {
    login,
    logout,
    createApolloClient,
  };
}