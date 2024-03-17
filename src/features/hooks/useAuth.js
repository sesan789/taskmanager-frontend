/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  logoutThunk,
  fetchUserData,
  registerThunk,
} from "../slices/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const login = async (credentials) => {
    try {
      await dispatch(loginThunk(credentials));

      await dispatch(fetchUserData());
    } catch (error) {
      throw error;
    }
  };
  return login;
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await dispatch(logoutThunk());
    } catch (error) {
      throw error;
    }
  };
  return logout;
};

export const useFetchUserData = () => {
  const dispatch = useDispatch();
  const fetching = async () => {
    try {
      await dispatch(fetchUserData());
    } catch (error) {
      throw error;
    }
  };
  return fetching;
};

export const useRegistertData = () => {
  const dispatch = useDispatch();
  const register = async (credentials) => {
    try {
      await dispatch(registerThunk(credentials));
    } catch (error) {
      throw error;
    }
  };
  return register;
};

export const useAuthState = () => {
  return useSelector((state) => state.auth);
};
