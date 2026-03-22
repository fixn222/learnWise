import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data.ts";
//import { DashBoard } from "./pages/DashBoard";
import DashBoard from "./pages/DashBoard.tsx";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsList from "./pages/subjects/list.tsx";
import SubjectsCreate from "./pages/subjects/Create.tsx";
import ClassesList from "./pages/classes/list.tsx";
import Create from "./pages/classes/Create.tsx";

/**
 * Main application component that configures providers, resources, theming, devtools, and routing for the app.
 *
 * Renders the Refine application shell with data and notification providers, keyboard navigation (Kbar), devtools,
 * global UI helpers (toaster, unsaved-changes notifier, document title handler), and the nested route structure.
 *
 * @returns The root React element that mounts the application and its routes.
 */
function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "8Pyn43-USmja7-hOGJKR",
              }}
              resources={[
                {
                  name: "dashboard",

                  list: "/",

                  meta: { label: "Home", icon: <Home /> },
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  meta: { label: 'Subjects', icon: <BookOpen /> }
                },
                {
                  name: 'classes',
                  list: '/classes',
                  create: '/classes/create',
                  meta: { label: 'Classes', icon: <GraduationCap /> }
                },
              ]}
            >
              <Routes >
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >

                  <Route path="/" element={<DashBoard />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>
                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<Create />} />
                  </Route>


                </Route>

              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
