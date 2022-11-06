import { reactive } from 'vue';
import { feathersClient } from '../plugins/feathers-client';
import { compareAsc } from 'date-fns';

const initialState = {
  auth: {
    user: {
      _id: '',
      firstName: '',
      email: '',
    },
  },
  isLoggedIn: false,
};

let state = reactive({
  ...initialState,
});

async function logout() {
  state.auth = initialState.auth;
  state.isLoggedIn = false;
  console.log(state);
  await feathersClient.logout();
  localStorage.removeItem('expiresIn');
  this.$router.push('/login');
}

function isTokenExpired() {
  let expiresIn = null;
  if (localStorage.getItem('expiresIn')) {
    expiresIn = new Date(Number(localStorage.getItem('expiresIn')));
  }

  const compareRes = compareAsc(new Date(), expiresIn);

  if (compareRes > 0) {
    console.log('🕔🕔🕔🕔🕔🕔🕔🕔 TOKEN EXPIRED!');
    return true;
  }
  return false;
}

function toExpireSession() {
  if (localStorage.getItem('expiresIn')) {
    const expiresIn = new Date(Number(localStorage.getItem('expiresIn'))).getTime();
    const currentTime = new Date().getTime();

    if (currentTime > expiresIn) {
      state.isLoggedIn = false;
    } else {
      const subtractMilliSecondsValue = expiresIn - currentTime;
      setTimeout(() => {
        state.isLoggedIn = false;
      }, subtractMilliSecondsValue);
      // }, 15000);
    }
  }
}

export default { state, logout, isTokenExpired, toExpireSession };
