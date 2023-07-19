import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layout";
import { Courses, Home } from "../pages";
import StudentList from "../pages/StudentList/StudentList";
import Faq from "../pages/Faq/Faq";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Subject from "../pages/Subject/Subject";
import SignLayout from "../layout/SignLayout/SignLayout";
import { useAuthContextData } from "../Auth/AuthContext";
import NotFound from "../pages/NotFound/NotFound";


const AppRoutes = () => {
  const { authStatus } = useAuthContextData();
  
  let { isAuth } = authStatus

  return (
    <>
      <Routes>
        {isAuth &&
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="student" element={<StudentList />} />
            <Route path="faq" element={<Faq />} />
            <Route path="subject" element={<Subject />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        }

        {!isAuth &&
          <Route path="/" element={<SignLayout />}>
            <Route index element={<Navigate to="/sign-in" />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        }

      </Routes>
    </>
  );
}

export default AppRoutes;
