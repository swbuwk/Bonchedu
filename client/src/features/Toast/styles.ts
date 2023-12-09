import { styled } from "styled-components";
import { Colors } from "../../constants/Colors";
import { ToastType } from "../../store/slices/toastSlice";

export const ToastProviderWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

export const ToastFactory = styled.div`
  z-index: 1000;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
  padding-right: 32px;
  padding-bottom: 32px;
`

export const ToastItem = styled.div`
  position: relative;
  background-color: ${Colors.white};
  border-radius: 5px;
  padding: 12px 24px;
  box-shadow: 0 0 10px #00000022;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  min-width: 200px;

  animation: lifeCycle 10s linear;

  @keyframes lifeCycle {
    0% { opacity: 0 }
    2% { opacity: 1 }
    40% { opacity: 1 }
    50% { opacity: 0 }
    100% { opacity: 0 }
  }
`

export const CloseToastWrapper = styled.div`
  cursor: pointer;
  margin-left: 32px;
`

export const ToastColoring = styled.div<{
  type: ToastType
}>`
  background-color: ${p => p.type === ToastType.error ? Colors.red : p.type === ToastType.success ? Colors.green : "transparent"};
  position: absolute;
  left: 16px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`

export const ToastText = styled.div`
  margin-left: 16px;
  font-size: 14px;
  line-height: 16px;
`