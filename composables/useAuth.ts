import { User } from '~~/types/user';
import jwt_decode from 'jwt-decode';

export default () => {
  const useAuthToken = () => useState('auth_token');
  const useAuthUser = () => useState('auth_user');
  const useAuthLoading = () => useState('auth_loading', () => true);

  const setToken =(newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  }

  const setUser =(newUser: User) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  }

  const refreshToken = () => {
    return new Promise(async(resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh');
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error) 
      }
    });
  }

  const getUser = () => {
    return new Promise(async(resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user');
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error) 
      }
    });
  }

  const refreshAccessToken = () => {
    const authToken = useAuthToken();

    if(!authToken.value) {
      return;
    }

    const jwt = jwt_decode(authToken.value);
    console.log(jwt);

    const newRefreshTime = jwt.exp - 60_000;

    setTimeout(() => {
      refreshToken();
      refreshAccessToken();
    }, newRefreshTime);


  }

  const login = (username: string, password: string ) => {
    return new Promise(async(resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        });
        setToken(data.access_token);
        setUser(data.user);
        resolve(true);
      } catch (error) {
       console.log(error); 
      }
    })
  }

  const initAuth = () => {
    return new Promise(async(resolve, reject) => {
      useAuthLoading().value = true;
      try {
        await refreshToken();
        await getUser;

        refreshAccessToken();

        resolve(true);

      } catch (error) {
        reject(error) 
      } finally {
        useAuthLoading().value = false;
      }
    });
  }

  return { login, useAuthUser, initAuth, useAuthToken, useAuthLoading }
}