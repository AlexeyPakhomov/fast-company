import configFile from '../config.json';

const KEY = process.env.REACT_APP_FIREBASE_KEY;

const url =
  configFile.isFirebase === true
    ? {
        signUpEndpoint: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
        signInEndpoint: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
        refreshTokenEndpoint: `https://securetoken.googleapis.com/v1/token?key=${KEY}`,
        professionEndpoint: '/profession',
        qualityEndpoint: '/quality',
        user: '/user/',
        comment: '/comment/',
      }
    : {
        signUpEndpoint: '/auth/signUp',
        signInEndpoint: '/auth/signInWithPassword',
        refreshTokenEndpoint: '/auth/token',
        professionEndpoint: '/profession',
        qualityEndpoint: '/quality',
        user: '/user/',
        comment: '/comment/',
      };

export default url;
