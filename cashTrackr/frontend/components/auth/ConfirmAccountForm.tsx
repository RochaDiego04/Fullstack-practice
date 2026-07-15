"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { useActionState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ConfirmAccountForm() {
  const router = useRouter();
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

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((e) => {
        toast.error(e);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [router, state]);

  return (
    <>
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
    </>
  );
}
