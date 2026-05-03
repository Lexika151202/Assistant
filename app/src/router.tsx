import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Container, Heading, Paragraph } from './components/shared';
import ReportI16List from './pages/feature33/ReportI16List';
import ReportI16Form from './pages/feature33/ReportI16Form';
import ReportI17List from './pages/feature34/ReportI17List';
import ReportI17Form from './pages/feature34/ReportI17Form';
import ReportKCNList from './pages/feature42/ReportKCNList';
import ReportKCNDetail from './pages/feature42/ReportKCNDetail';
import ReportKKTList from './pages/feature52/ReportKKTList';
import ReportKKTDetail from './pages/feature52/ReportKKTDetail';
import ReportXTDTList from './pages/feature3/ReportXTDTList';
import ReportXTDTForm from './pages/feature3/ReportXTDTForm';
import ReportXTDTSummaryList from './pages/feature4/ReportXTDTSummaryList';
import ReportXTDTSummaryForm from './pages/feature4/ReportXTDTSummaryForm';
import ReportCommitmentList from './pages/feature5/ReportCommitmentList';
import ReportCommitmentForm from './pages/feature5/ReportCommitmentForm';
import ReportFDIProjectList from './pages/feature6/ReportFDIProjectList';
import ReportFDIProjectForm from './pages/feature6/ReportFDIProjectForm';

function Placeholder({ title }: { title: string }) {
  return (
    <Container>
      <Heading level={1}>{title}</Heading>
      <Paragraph className="mt-2">Chưa có nội dung. Sẽ được sinh bởi /gen_feature.</Paragraph>
    </Container>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Placeholder title="Dashboard" /> },
      { path: 'feature-33', element: <ReportI16List /> },
      { path: 'feature-33/new', element: <ReportI16Form mode="create" /> },
      { path: 'feature-33/:id/edit', element: <ReportI16Form mode="edit" /> },
      { path: 'feature-33/:id/view', element: <ReportI16Form mode="view" /> },
      { path: 'feature-34', element: <ReportI17List /> },
      { path: 'feature-34/new', element: <ReportI17Form mode="create" /> },
      { path: 'feature-34/:id/edit', element: <ReportI17Form mode="edit" /> },
      { path: 'feature-34/:id/view', element: <ReportI17Form mode="view" /> },
      { path: 'feature-42', element: <ReportKCNList /> },
      { path: 'feature-42/:id', element: <ReportKCNDetail /> },
      { path: 'feature-52', element: <ReportKKTList /> },
      { path: 'feature-52/new', element: <ReportKKTDetail mode="create" /> },
      { path: 'feature-52/:id/edit', element: <ReportKKTDetail mode="edit" /> },
      { path: 'feature-52/:id/view', element: <ReportKKTDetail mode="view" /> },
      { path: 'feature-3', element: <ReportXTDTList /> },
      { path: 'feature-3/new', element: <ReportXTDTForm mode="create" /> },
      { path: 'feature-3/:id/edit', element: <ReportXTDTForm mode="edit" /> },
      { path: 'feature-3/:id/view', element: <ReportXTDTForm mode="view" /> },
      { path: 'feature-4', element: <ReportXTDTSummaryList /> },
      { path: 'feature-4/new', element: <ReportXTDTSummaryForm mode="create" /> },
      { path: 'feature-4/:id/edit', element: <ReportXTDTSummaryForm mode="edit" /> },
      { path: 'feature-4/:id/view', element: <ReportXTDTSummaryForm mode="view" /> },
      { path: 'feature-5', element: <ReportCommitmentList /> },
      { path: 'feature-5/new', element: <ReportCommitmentForm mode="create" /> },
      { path: 'feature-5/:id/edit', element: <ReportCommitmentForm mode="edit" /> },
      { path: 'feature-5/:id/view', element: <ReportCommitmentForm mode="view" /> },
      { path: 'feature-6', element: <ReportFDIProjectList /> },
      { path: 'feature-6/new', element: <ReportFDIProjectForm mode="create" /> },
      { path: 'feature-6/:id/edit', element: <ReportFDIProjectForm mode="edit" /> },
      { path: 'feature-6/:id/view', element: <ReportFDIProjectForm mode="view" /> },
    ],
  },
]);
