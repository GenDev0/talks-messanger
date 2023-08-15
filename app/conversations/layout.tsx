import Sidebar from "@/components/side-bar/Sidebar";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
