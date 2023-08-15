import EmptyState from "@/components/empty-state";

interface UsersPageProps {}

const UsersPage = (props: UsersPageProps) => {
  return (
    <div className='hidden md:block md:pl-80 h-full'>
      <EmptyState />
    </div>
  );
};

export default UsersPage;
