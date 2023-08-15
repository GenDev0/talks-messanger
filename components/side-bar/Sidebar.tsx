import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import getCurrentUser from "@/actions/getCurrentUser";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className='md:pl-20 h-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
