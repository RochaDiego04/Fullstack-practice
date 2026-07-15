import Logo from "../../components/ui/Logo";
import ToastNotification from "../../components/ui/ToastNotification";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="lg:bg-auth bg-size-[50rem] bg-no-repeat bg-bottom-left flex justify-center bg-purple-950 ">
          <div className="w-250">
            <Logo />
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </div>

      <ToastNotification />
    </>
  );
}
