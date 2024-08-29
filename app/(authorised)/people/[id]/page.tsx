import { AnotherUserDocumentsList } from "../../_components/documents/documents-list";
import { PageWrapper } from "../../_components/wrapper";
import Header from "./_components/header";

interface UserPageProps {
  params: {
    id: string;
  };
}
const UserPage = ({ params }: UserPageProps) => {
  return (
    <section className="w-full h-full px-2">
      <Header id={params.id} />
      <PageWrapper>
        <AnotherUserDocumentsList params={params} />
      </PageWrapper>
    </section>
  );
};

export default UserPage;
