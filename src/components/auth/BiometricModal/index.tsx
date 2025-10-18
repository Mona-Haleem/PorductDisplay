import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import BaseModal from "@/components/UI/modal/modal";
import { checkBiometricAvailability } from "@/utils/helpers";
import { useStyles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import PasswordModal from "./PaswordModal";
import BioMetricModal from "./BioMetricModal";

const AuthModal: React.FC = () => {
  const { biometricModalShown } = useSelector((state: RootState) => state.UI);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    checkBiometricAvailability().then((isAvailable: boolean) =>
      setBiometricAvailable(isAvailable)
    );
  }, []);

  return (
    <BaseModal showModal={biometricModalShown} onClose={() => {}}>
      <View style={styles.lockIcon}>
        <Ionicons name="lock-closed" size={50} color={styles.lockIcon.color} />
      </View>
      {biometricAvailable ? (
        <BioMetricModal setBiometricAvailable={setBiometricAvailable} />
      ) : (
        <PasswordModal />
      )}
    </BaseModal>
  );
};

export default AuthModal;
