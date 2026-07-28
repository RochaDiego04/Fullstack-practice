"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { editBudget } from "@/actions/edit-budget-action";
import { useBudgetContext } from "@/src/context/budgetContext";
import BudgetForm from "./BudgetForm";

export default function EditBudgetForm() {
  const router = useRouter();
  const { budget } = useBudgetContext();
  const editBudgetWithId = editBudget.bind(null, budget!.id);
  const [state, dispatch] = useActionState(editBudgetWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((e) => {
        toast.error(e);
      });
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin");
    }
  }, [router, state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      <BudgetForm />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Save Changes"
      />
    </form>
  );
}
