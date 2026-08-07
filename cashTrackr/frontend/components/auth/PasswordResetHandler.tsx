"use client";

import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [validatedToken, setValidatedToken] = useState("");

  return (
    <div>
      {validatedToken ? (
        <ResetPasswordForm token={validatedToken} />
      ) : (
        <ValidateTokenForm onValidToken={setValidatedToken} />
      )}
    </div>
  );
}
