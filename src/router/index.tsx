import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import WordBankPage from '../pages/WordBankPage';
import FlashcardsPage from '../pages/FlashcardsPage';
import QuizPage from '../pages/QuizPage';
import AiTutorPage from '../pages/AiTutorPage';

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <WordBankPage />,
          },
          {
            path: "flashcards",
            element: <FlashcardsPage />,
          },
          {
            path: "quiz",
            element: <QuizPage />,
          },
          {
            path: "ai-tutor",
            element: <AiTutorPage />,
          },
        ],
      },
    ],
  },
]);
