import { DocumentsList } from "../_components/documents/documents-list";
import { Header } from "./_components.tsx/header";

const MyDocumentsPage = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="mt-10   max-h-[calc(100%-104px)] overflow-auto">
        <DocumentsList />
      </div>
    </div>
  );
};
export default MyDocumentsPage;
