import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { toggleBiometricModal } from "@/store/slices/authSlice";
import { startBiometricAuth } from "@/utils/helpers";
import Button from "@/components/UI/Button";
import { useStyles } from "./style";

const BioMetricModal = ({
  setBiometricAvailable,
}: {
  setBiometricAvailable: (value:boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useStyles();

  const handelLoginWithBioMetrics = useCallback(() => {
    startBiometricAuth(
      () => dispatch(toggleBiometricModal(false)),
      () => setBiometricAvailable(false)
    );
  }, []);
  return (
    <>
      <Button
        leftIcon="lock-closed"
        btnStyles={styles.btn}
        btnTextStyles={styles.btnText}
        title="Sign in with Biometrics"
        onPress={handelLoginWithBioMetrics}
      />
      <Button
        varient="outline"
        leftIcon="lock-closed"
        btnStyles={styles.btn}
        btnTextStyles={styles.btnText}
        title="Sign in with password"
        onPress={()=>setBiometricAvailable(false)}
      />
    </>
  );
};

export default BioMetricModal;
