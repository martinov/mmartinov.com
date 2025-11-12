import { ComponentChildren } from "preact";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface PageLayoutProps {
  children: ComponentChildren;
  currentPath?: string;
}

export default function PageLayout({ children, currentPath }: PageLayoutProps) {
  return (
    <div class="min-h-screen flex flex-col">
      <Header currentPath={currentPath} />
      <main class="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
