import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import BaseModal from "@/components/UI/modal/modal";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Button from "../UI/Button";
import { useDeleteProduct } from "@/screens/products/hooks/useDeleteProduct";
import { useStyles } from "./style";
import Loading from "../UI/Loading/loading";
import { setShowDeleteModal } from "@/store/slices/authSlice";

const DeleteModal = () => {
  const { deleteModal } = useSelector((state: RootState) => state.auth);
  const styles = useStyles();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const dispatch = useDispatch<AppDispatch>();
  const handelDeleteConfirm = useCallback(() => {
    deleteProduct(deleteModal.productId);
  }, [deleteProduct, deleteModal]);

  const handelCancelDelete = useCallback(() => {
    dispatch(
      setShowDeleteModal({
        productId: 0,
        productTitle: "",
        visisble: false,
      })
    );
  }, [deleteProduct, deleteModal]);
  return (
    <BaseModal showModal={deleteModal.visisble} onClose={() => {}}>
      <View style={styles.lockIcon}>
        <Ionicons name="trash" size={50} color={styles.lockIcon.color} />
      </View>

      <Text style={styles.message}>
        confirm Deleteing{" "}
        <Text style={styles.highlight}>{deleteModal.productTitle}</Text>
      </Text>
      {isPending && <Loading />}
      <Button
        varient="outline"
        btnStyles={styles.btn}
        btnTextStyles={styles.btnText}
        title="Delete"
        onPress={handelDeleteConfirm}
        disapled={isPending}
      />
      <Button
        btnStyles={styles.btn}
        btnTextStyles={styles.btnText}
        title="cancel"
        disapled={isPending}
        onPress={handelCancelDelete}
      />
    </BaseModal>
  );
};

export default DeleteModal;
