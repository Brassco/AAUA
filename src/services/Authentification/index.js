import axios from '@aaua/axios';

import {REGISTER_1_URL, SMS_CODE_URL} from '@aaua/actions/constants';

class Authentication {
  sendStep1Data = async userData => {
    const response = await axios.post(REGISTER_1_URL, userData);

    return response.data;
  };

  sendSms = async phone => {
    const response = await axios.post(SMS_CODE_URL, {phone: phone});
    
    return response.data;
  };

  register = async registerData => {
    console.log('register', registerData);
    let {email, password} = registerData;

    let firebaseUser = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('firebaseUser', firebaseUser);

    // Set user ID
    registerData.uid = firebaseUser.user.uid;
    registerData.provider = 'email';
    registerData.deviceType = getDeviceType();

    const response = await axios.post('/auth/createUser', registerData);
    return response.data;
  };

  emailExists = async email => {
    let response = await axios.post('/auth/emailExists', email);
    console.log('emailExists', response);
    if (response.data.exists) {
      throw new Error('This email already exists');
    }
  };

  getLocationByIp = async () => {
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}`,
      );
      return response.data.state_prov;
    } catch (e) {
      console.log(e);
    }
  };

  sendVerificationCode = async phoneNumber => {
    console.log('send code = ' + phoneNumber);
    const response = await axios.get(`/auth/sendCode/${phoneNumber}`);
    console.log('send code response', response);
    return response;
  };

  verifyCode = async verifyInfo => {
    console.log('verify code', verifyInfo);
    const response = await axios.post('/auth/verifyCode', verifyInfo);
    if (response.data.status !== 'approved') {
      throw new Error('Verification code is invalid');
    }
  };

  logIn = async (email, password) => {
    try {
      let firebaseUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      console.log('firebaseUser login', firebaseUser);

      const token = await firebaseUser.user.getIdToken(true);
      setAxiosAuthHeader(token);

      const response = await axios.get('/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data.user;
    } catch (error) {
      console.log(error);
      throw this._getFirebaseError(error);
    }
  };
}

const authentication = new Authentication();
export default authentication;
