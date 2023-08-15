import prismadb from "@/lib/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = prismadb.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!users) {
      return [];
    }
    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
