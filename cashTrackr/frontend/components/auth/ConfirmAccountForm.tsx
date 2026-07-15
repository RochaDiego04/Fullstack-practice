"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { useActionState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

export default function ConfirmAccountForm() {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");

  const [state, dispatch] = useActionState(confirmAccount, {
    errors: [],
    success: "",
  });

  const submitToken = (token: string) => {
    const formData = new FormData();
    formData.append("token", token);
    startTransition(() => dispatch(formData));
  };

  // Auto-submit when arriving from the email link (?token=XXXXXX)
  useEffect(() => {
    if (urlToken && /^\d{6}$/.test(urlToken)) {
      submitToken(urlToken);
    }
  }, [urlToken]);

  return (
    <>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}

      {state.success ? (
        <SuccessMessage>{state.success}</SuccessMessage>
      ) : (
        <div className="flex justify-center gap-5 my-10">
          <PinInput defaultValue={urlToken ?? ""} onComplete={submitToken}>
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
            <PinInputField className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg" />
          </PinInput>
        </div>
      )}
    </>
  );
}
