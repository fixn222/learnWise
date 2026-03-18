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
import { dataProvider } from "./providers/data";
//import { DashBoard } from "./pages/DashBoard";
import DashBoard from "./pages/DashBoard.tsx";
import { BookOpen, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsList from "./pages/subjects/list.tsx";
import SubjectsCreate from "./pages/subjects/Create.tsx";

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
                  create: '/subject/create',
                  meta: { label: 'Subjects', icon: <BookOpen /> }
                }
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
