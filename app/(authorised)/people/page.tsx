
import { Header } from "./_components/header";
import { UsersList } from "./_components/users-list";

const PeoplePage = () => {
  return (
    <section className="w-full h-full px-2 ">
      <Header />
   <div className="mt-5 max-h-[calc(100%-62px)] overflow-auto w-full">
        <UsersList />
    </div> 
    </section>
  );
};

export default PeoplePage;
