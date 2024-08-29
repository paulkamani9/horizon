import { MyDocumentsList } from "../_components/documents/documents-list";
import { PageWrapper } from "../_components/wrapper";
import { Header } from "./_components.tsx/header";

const MyDocumentsPage = () => {
  return (
    <section className="w-full h-full px-2">
      <Header />
      <PageWrapper>
        <MyDocumentsList />
      </PageWrapper>
    </section>
  );
};
export default MyDocumentsPage;
