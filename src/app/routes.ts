import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { CreatePostPage } from './pages/CreatePostPage';
import { PostPreviewPage } from './pages/PostPreviewPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AuthorityDashboardPage } from './pages/AuthorityDashboardPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { MapViewPage } from './pages/MapViewPage';
import { SupportChatPage } from './pages/SupportChatPage';
import { LawChatPage } from './pages/LawChatPage';
import { VictimLoginPage } from './pages/VictimLoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'create-post', Component: CreatePostPage },
      { path: 'post-preview/:id', Component: PostPreviewPage },
      { path: 'user-dashboard/:id', Component: UserDashboardPage },
      { path: 'victim', Component: UserDashboardPage },
      { path: 'authority-dashboard', Component: AuthorityDashboardPage },
      { path: 'admin', Component: AuthorityDashboardPage },
      { path: 'case-detail/:id', Component: CaseDetailPage },
      { path: 'map-view', Component: MapViewPage },
      { path: 'support-chat', Component: SupportChatPage },
      { path: 'law-chat', Component: LawChatPage },
      { path: 'victim-login', Component: VictimLoginPage },
    ],
  },
]);
