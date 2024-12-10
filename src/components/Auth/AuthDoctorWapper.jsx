import { getAccountDoctor } from "@/redux/auth/auth.thunk";
import { get } from "@/storage/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAuthDoctor from "../Modal/ModalAuthDoctor";
import {
  setDoctorInfo,
  setIsAuthenticatedDoctor,
} from "@/redux/auth/auth.slice";
import LoadingClinic from "../Loading/LoadingClinic";

const AuthDoctorWapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [open, setOpen] = useState(true);
  const { isAuthenticatedDoctor } = useSelector((state) => state.auth);
  const accessTokenDoctor = get("ACCESS_TOKEN_DOCTOR");

  const initAuth = async () => {
    try {
      if (accessTokenDoctor) {
        const res = await dispatch(getAccountDoctor()).unwrap();
        if (res.success) {
          dispatch(setIsAuthenticatedDoctor(true));
          dispatch(setDoctorInfo(res.data));
          setOpen(false);
        }
      }
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initAuth();
  }, [dispatch, isAuthenticatedDoctor]);

  if (!isInitialized) return <LoadingClinic />;

  return isAuthenticatedDoctor ? (
    children
  ) : (
    <ModalAuthDoctor {...{ open, onClose: () => setOpen(false) }} />
  );
};

export default AuthDoctorWapper;
