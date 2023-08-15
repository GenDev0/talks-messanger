import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/side-bar/Sidebar";

import UserList from "./components/UserList";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <div className='h-full'>
      <Sidebar>
        <UserList items={users} />
        {children}
      </Sidebar>
    </div>
  );
};

export default UsersLayout;
