import authReducer, { setUser, toggleBiometricModal, signOut } from './index';

describe('authSlice', () => {
   const initialState = { superadmin: false, biometricModalShown: false, user:null };
   const user = {username:'emilys',image:"https://dummyjson.com/icon/emilys/128"}
  

  it('setSuperadmin toggles superadmin flag', () => {
    const state = authReducer(initialState, setUser(user));
    expect(state.superadmin).toBe(true);
  });

  it('showBiometricModal sets biometricModalShown', () => {
    const state = authReducer(initialState, toggleBiometricModal(true));
    expect(state.biometricModalShown).toBe(true);
  });

  it('signOut clears all auth state', () => {
    const state = authReducer({ superadmin: true, biometricModalShown: true ,user}, signOut());
    expect(state).toEqual(initialState);
  });
});
