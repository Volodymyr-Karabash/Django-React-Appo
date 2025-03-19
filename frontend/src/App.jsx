import { useState } from "react";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Contact from "./pages/Contact";
import Loading from "./components/Loading";
import FindDoctor from "./pages/FindDoctor";
import About from "./pages/About";
import RootLayout from "./components/RootLayout";
import OTPVerify from "./pages/OTPVerify";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectRoutes from "./components/ProtectRoutes";
import Profile from "./pages/Profile";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import DashboardLayout from "./components/DashboardLayout";
import Notifications from "./pages/Notifications";
import UsersList from "./pages/admin/UsersList";
import DoctorsList from "./pages/admin/DoctorsList";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import ResetPassword from "./pages/ResetPassword";
import DoctorAppointments from "./pages/DoctorAppointments";
import UserAppointment from "./pages/UserAppointment";
import DoctorInfo from "./pages/DoctorInfo";
import BookAppointment from "./pages/BookAppointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import AdminDashboard from "./pages/admin/AdminDashboard";




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="find-doctor" element={<FindDoctor />} />
        <Route path="doctor-profile/:id" element={<DoctorProfile />} />
        
        <Route path="dashboard" element={<DashboardLayout />} errorElement={<ErrorPage />}>
          <Route index element={<ProtectRoutes> <Profile /></ProtectRoutes>} />
          <Route path="doctor-profile" element={<ProtectRoutes> <DoctorInfo /></ProtectRoutes>} />
          <Route path="user-list" element={<ProtectRoutes><UsersList /></ProtectRoutes>} />
          <Route path="doctor-list" element={<ProtectRoutes><DoctorsList /></ProtectRoutes>} />
          <Route path="apply-doctor" element={<ProtectRoutes><ApplyDoctor /></ProtectRoutes>} />
          <Route path="notifications" element={<ProtectRoutes><Notifications /></ProtectRoutes>} />
          <Route path="doctor-appointments" element={<ProtectRoutes><DoctorAppointments /></ProtectRoutes>} />
          <Route path="user-appointments" element={<ProtectRoutes><UserAppointment /></ProtectRoutes>} />
          <Route path="doctor-dashboard" element={<ProtectRoutes><DoctorDashboard /></ProtectRoutes>} />
          <Route path="admin-dashboard" element={<ProtectRoutes><AdminDashboard /></ProtectRoutes>} />
          <Route path="patients" element={<ProtectRoutes><DoctorPatients /></ProtectRoutes>} />
        </Route>

      </Route>

      <Route path="signin" element={<PublicRoutes><SingIn /></PublicRoutes>} />
      <Route path="signup" element={<PublicRoutes> <SingUp /> </PublicRoutes>} />
      <Route path="forgot-password" element={<PublicRoutes> <ForgotPassword /> </PublicRoutes>} />
      <Route path="/reset-password/:token" element={<PublicRoutes> <ResetPassword /> </PublicRoutes>} />
      <Route path="otpverify" element={<PublicRoutes> <OTPVerify />  </PublicRoutes>} />
      <Route path="book-appointment" element={<ProtectRoutes> <BookAppointment />  </ProtectRoutes>} />

    </>

  )
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    isLoading ? <Loading /> : <RouterProvider router={router} />
    // <RouterProvider router={router} />
  )
}

export default App
