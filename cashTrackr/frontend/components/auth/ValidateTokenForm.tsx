"use client";

import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import useValidateToken from "@/src/hooks/useValidateToken";

type ValidateTokenFormProps = {
  onValidToken: (token: string) => void;
};

export default function ValidateTokenForm({
  onValidToken,
}: ValidateTokenFormProps) {
  const { submitToken, urlToken } = useValidateToken({
    serverAction: validateToken,
    onSuccess: onValidToken,
  });

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput defaultValue={urlToken ?? ""} onComplete={submitToken}>
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  );
}
