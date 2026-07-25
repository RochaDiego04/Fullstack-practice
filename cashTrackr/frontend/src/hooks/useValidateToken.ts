"use client";
import { useSearchParams } from "next/navigation";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";
import { ConfirmTokenSchema } from "../schemas";
import { ActionStateType } from "../types/ActionStateStype";

type UseValidateTokenProps = {
  serverAction: (
    prevState: ActionStateType,
    formData: FormData,
  ) => Promise<ActionStateType>;
  onSuccess: (token: string) => void;
};

/*
    This hook extracts the token from the urlParam and validates it.
    If there is no token on the url, the user will be able to type it manually.
*/

export default function useValidateToken({
  serverAction,
  onSuccess,
}: UseValidateTokenProps) {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");

  const [state, dispatch, isPending] = useActionState(serverAction, {
    errors: [],
    success: "",
  });

  // The toast effect below depends on `state` alone, so both the callback and
  // the token it receives are read through refs: an inline `onSuccess` from the
  // caller changes identity every render and would re-fire the toast.
  const onSuccessRef = useRef(onSuccess);
  const submittedToken = useRef("");

  useEffect(() => {
    onSuccessRef.current = onSuccess; // 4. same as onSuccessRef.current = setValidatedToken
  });

  const submitToken = useCallback(
    (token: string) => {
      submittedToken.current = token; // 1. save token before dispatching it
      const formData = new FormData();
      formData.append("token", token);
      startTransition(() => dispatch(formData)); // 2. useActionState updates the state
    },
    [dispatch],
  );

  // Auto-submit when arriving from the email link (?token=XXXXXX). The ref
  // keeps StrictMode's double-invoked effect from dispatching twice.
  const autoSubmitted = useRef(false);
  useEffect(() => {
    const parsedUrlToken = ConfirmTokenSchema.safeParse({ token: urlToken });
    if (autoSubmitted.current || !parsedUrlToken.success) return;

    autoSubmitted.current = true;
    submitToken(parsedUrlToken.data.token);
  }, [urlToken, submitToken]);

  useEffect(() => {
    state.errors.forEach((error) => toast.error(error));

    if (state.success) {
      toast.success(state.success, {
        onClose: () => onSuccessRef.current(submittedToken.current), // 5. If success, its like doing setValidatedToken("xxxxx")
      });
    }
  }, [state]); // 3. state effect runs

  return { submitToken, urlToken, isPending };
}
