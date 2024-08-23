import { PageWrapper } from "../_components/wrapper";
import { Header } from "./_components/header";
import { UsersList } from "./_components/users-list";

const PeoplePage = () => {
  return (
    <section className="w-full h-full px-2 ">
      <Header />
      <PageWrapper size="compact">
        <UsersList />
      </PageWrapper>
    </section>
  );
};

export default PeoplePage;
