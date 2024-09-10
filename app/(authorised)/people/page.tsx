import { PageWrapper } from "../_components/wrapper";
import { Header } from "./_components/header";
import { UsersList } from "./_components/users-list";

const PeoplePage = () => {
  return (
    <section className="w-full h-full px-2 ">
      <Header />
      <PageWrapper
        size="large"
        className="mt-2 max-h-[calc(100%-104px)]"
      >
        <UsersList />
      </PageWrapper>
    </section>
  );
};

export default PeoplePage;
