import ChatbotWidget from "../chatbot/ChatbotWidget";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ChatbotWidget />
      <main className="pb-10">{children}</main>
    </div>
  );
};

export default Layout;
