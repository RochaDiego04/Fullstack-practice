import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { deleteBudget } from "@/actions/delete-budget-action";
import { useActionState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Budget } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";

export default function ConfirmPasswordForm({
  budgets,
}: {
  budgets: Budget[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = Number(searchParams.get("deleteBudgetId"));
  const budget = budgets.find((b) => b.id === budgetId);

  const [state, dispatch] = useActionState(deleteBudget, {
    errors: [],
    success: "",
  });

  const closeModal = useCallback(() => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete("deleteBudgetId");
    router.replace(`${pathname}?${hideModal}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((e) => {
        toast.error(e);
      });
    }
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [closeModal, state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para {""}
        <span className="text-amber-500">
          eliminar{" "}
          {budget
            ? `"${budget.name}" (${formatCurrency(+budget.amount)})`
            : "el presupuesto"}
        </span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>
      <form className=" mt-14 space-y-5" noValidate action={dispatch}>
        <input type="hidden" name="budgetId" value={budgetId} readOnly />
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="password">
            Ingresa tu Password para eliminar
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
