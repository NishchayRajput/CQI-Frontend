import Courses from './courses';

import ProtectedRoute from "../../components/ProtectedRoute";


export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {

  return (
    <ProtectedRoute>
        <Courses />
    </ProtectedRoute>
  );
}
