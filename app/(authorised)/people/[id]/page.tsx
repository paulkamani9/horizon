import { DocumentsList } from "../../_components/documents/documents-list";
import { PageWrapper } from "../../_components/wrapper";
import Header from "./_components/header";

interface UserPageProps {
  params: {
    id: string;
  };
}
const UserPage = ({ params: { id } }: UserPageProps) => {
  return (
    <section className="w-full h-full px-2">
      <Header id={id} />
      <PageWrapper>
        <DocumentsList />
      </PageWrapper>
    </section>
  );
};

export default UserPage;
