import AuthContext from "@/context/auth-context";
import "./globals.css";
import ToasterContext from "@/context/toaster-context";
import ActiveStatus from "@/components/ActiveStatus";

export const metadata = {
  title: "Messenger",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
