import { View, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "./styles";
import Gradient from "../Gradient";

type BaseModalProps = {
  showModal: boolean;
  children: React.ReactNode;
  onClose: () => void;
} & React.ComponentProps<typeof Modal>;
const BaseModal = ({
  showModal,
  children,
  onClose,
  ...props
}: BaseModalProps) => {
  const styles = useStyles();
  return (
    <Modal visible={true} transparent animationType="slide" {...props}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Gradient style={styles.gradient} >

          {/* <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#555" />
          </TouchableOpacity> */}
          {children}
          </Gradient>
        </View>
      </View>
    </Modal>
  );
};

export default BaseModal;
