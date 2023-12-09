import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  CloseToastWrapper,
  ToastColoring,
  ToastFactory,
  ToastItem,
  ToastProviderWrapper,
  ToastText,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeLastToast, removeToast } from "../../store/slices/toastSlice";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { Colors } from "../../constants/Colors";

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const toasts = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const [prevLength, setPrevLength] = useState<number>(0);
  const [arrayGrowth, setArrayGrowth] = useState<boolean>(false);

  useEffect(() => {
    if (toasts.length > prevLength) setArrayGrowth((p) => !p);
    setPrevLength(toasts.length);
  }, [toasts.length]);

  useEffect(() => {
    setTimeout(() => {
      if (!toasts.length) return;
      dispatch(removeLastToast());
    }, 5000);
  }, [arrayGrowth, dispatch, removeToast]);

  const handleToastDelete = (id?: string) => {
    if (!id) return;
    dispatch(removeToast(id));
  };

  return (
    <ToastProviderWrapper>
      <ToastFactory>
        {toasts.map((toast) => (
          <ToastItem key={toast.id}>
            <ToastColoring type={toast.type} />
            <ToastText>{toast.text}</ToastText>
            <CloseToastWrapper onClick={() => handleToastDelete(toast.id)}>
              <CrossIcon fill={Colors.gray} w="16px" h="16px" />
            </CloseToastWrapper>
          </ToastItem>
        ))}
      </ToastFactory>
      {children}
    </ToastProviderWrapper>
  );
};
