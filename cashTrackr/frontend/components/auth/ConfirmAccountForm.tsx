"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import useValidateToken from "@/src/hooks/useValidateToken";
import { useRouter } from "next/navigation";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const { submitToken, urlToken } = useValidateToken({
    serverAction: confirmAccount,
    onSuccess: () => router.push("/auth/login"),
  });

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
