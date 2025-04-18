import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/**
 * Custom Dialog Component
 * - Modal : 다이얼로그보다 더 큰 범위의 창, 정보 입력이나 다양한 행동을 할 수 있음
 * - Dialog :사용자와의 짧은 대화/확인용 UI. 보통 confirm/cancel 같이 간단한 피드백이 있음
 * - Popup :컨텍스트 기반으로 작게 뜨는 UI, 툴팁이나 옵션 메뉴 등
 */

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string | React.ReactNode;
  cancelDisabled?: boolean;
}

// 피그마 디자인 기준으로 봤을 땐, content 없이 title만 있는 경우가 많아서 이렇게 구현
export const Dialog = ({
  open = false,
  onClose,
  onConfirm,
  title,
  cancelDisabled,
}: ModalProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal text-base">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="min-w-[100px] min-h-[35px]"
            onClick={onConfirm}
          >
            확인
          </AlertDialogAction>

          {!cancelDisabled && (
            <AlertDialogCancel
              className="min-w-[100px] min-h-[35px] bg-[#EEF1F4] border-[#EEF1F4]"
              onClick={onClose}
            >
              취소
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface ContentModalProps extends ModalProps {
  children?: React.ReactNode;
  width?: number | string;
  confirmText?: string;
  cancelText?: string;
  contentClassName?: string;
}
export const Modal = ({
  open = false,
  children,
  title,
  onClose,
  onConfirm,
  width = "fit-content", // ← 기본값
  confirmText = "확인",
  cancelText = "취소",
  contentClassName,
}: ContentModalProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="p-0 rounded-lg w-full"
        style={{
          maxWidth: typeof width === "number" ? `${width}px` : width,
          minWidth: "500px",
        }}
      >
        <AlertDialogHeader className="px-8 border-b border-[#CCCCCC] py-4">
          <AlertDialogTitle className="flex justify-between items-center">
            <span>{title}</span>
            <X className="w-[22px] h-[22px] cursor-pointer" onClick={onClose} />
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className={cn("px-8 py-4", contentClassName)}>{children}</div>

        <AlertDialogFooter className="py-4 bg-[#E2E2E2] rounded-b-lg">
          <AlertDialogAction
            className="min-w-[150px] min-h-[35px] bg-[#545F71]"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
          <AlertDialogCancel
            className="min-w-[150px] min-h-[35px] bg-[#EEF1F4] border-[#EEF1F4] hover:bg-[#e1e5e8]"
            onClick={onClose}
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

/**
 * ConfirmDialog
 * - 모달 다이얼로그 간편화
 * - 이슈 발생 시 다시 코드 작성 필요
 */
export interface ConfirmDialogProps extends ModalProps {
  content: string | React.ReactNode;
}
export const ConfirmDialog = ({
  open = false,
  onClose,
  onConfirm,
  content,
  cancelDisabled = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={content}
      cancelDisabled={cancelDisabled}
    />
  );
};
