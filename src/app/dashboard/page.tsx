"use client"
import React, { useState } from 'react';
import { Sidebar } from './components/dashboard/Sidebar';
import { AnimatePresence, m, motion} from 'framer-motion';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PostsPage } from './components/posts/PostsPage';
import { PlansPage } from './components/plans/PlansPage';

interface SimpleComponentProps {
  message?: string;
}

type PageType = 'dashboard' | 'posts' | 'users' | 'plans' | 'settings';

const SimpleComponent: React.FC<SimpleComponentProps> = ({ message = 'Hello World' }) => {

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <div className="text-center text-2xl font-bold text-primary flex justify-center items-center h-[calc(100vh-120px)]">Pagina en construcción, deberias navegar a los posts <button onClick={() => setCurrentPage('posts')} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-all cursor-pointer m-4">Posts</button> </div>;
      case 'posts':
        return <PostsPage />;
      // case 'users':
      //   return <UsersPage />;
         case 'plans':
           return <PlansPage />;
      // case 'settings':
      //   return <SettingsPage />;
      // default:
      //   return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as PageType)} />

      {/* Main Content */}
      <main className="lg:ml-[72px] transition-all duration-300">
        {/* Mobile Spacer for Header */}
        <div className="h-16 lg:hidden" />

        {/* Page Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SimpleComponent;
