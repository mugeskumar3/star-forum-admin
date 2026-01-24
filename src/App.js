import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageEight from "./pages/HomePageEight"; // Dashboard
import EmailPage from "./pages/EmailPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FormPage from "./pages/FormPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import { ToastContainer } from "react-toastify";
import ComingSoonPage from "./pages/ComingSoonPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MaintenancePage from "./pages/MaintenancePage";

import AdminRegistrationListPage from "./pages/AdminRegistrationListPage";
import AdminRegistrationFormPage from "./pages/AdminRegistrationFormPage";
import AdminRegistrationViewPage from "./pages/AdminRegistrationViewPage";
import AdminRegistrationEditPage from "./pages/AdminRegistrationEditPage";
import OrganisationListPage from "./pages/OrganisationListPage";
import OrganisationFormPage from "./pages/OrganisationFormPage";
import BadgeCreationPage from "./pages/BadgeCreationPage";
import BadgeCreateFormPage from "./pages/BadgeCreateFormPage";
import BadgeAssignFormPage from "./pages/BadgeAssignFormPage";

import MemberListPage from "./pages/MemberListPage";
import MemberFormPage from "./pages/MemberFormPage";
import AttendanceListPage from "./pages/AttendanceListPage";

import ChapterListPage from "./pages/ChapterListPage";
import ChapterFormPage from "./pages/ChapterFormPage";
import ChapterViewPage from "./pages/ChapterViewPage";

import MeetingListPage from "./pages/MeetingListPage";
import MeetingFormPage from "./pages/MeetingFormPage";
import MeetingAttendancePage from "./pages/MeetingAttendancePage";
import MemberHistoryPage from "./pages/MemberHistoryPage";

import CommunityUpdatePage from "./pages/CommunityUpdatePage";
import CommunityUpdateFormPage from "./pages/CommunityUpdateFormPage";
import StarUpdatePage from "./pages/StarUpdatePage";
import StarUpdateFormPage from "./pages/StarUpdateFormPage";

import GeneralUpdatePage from "./pages/GeneralUpdatePage";
import ChapterReportPage from "./pages/ChapterReportPage";
import Note121Page from "./pages/Note121Page";
import ReferralNotePage from "./pages/ReferralNotePage";
import ThankYouSlipPage from "./pages/ThankYouSlipPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import VisitorsReportPage from "./pages/VisitorsReportPage";
import LogReportPage from "./pages/LogReportPage";
import ShopListPage from "./pages/ShopListPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import ShopFormPage from "./pages/ShopFormPage";
import OrdersPage from "./pages/OrdersPage";
import TrainingListPage from "./pages/TrainingListPage";
import TrainingFormPage from "./pages/TrainingFormPage";
import UserRoleListPage from "./pages/UserRoleListPage";
import UserRoleFormPage from "./pages/UserRoleFormPage";
import ChiefGuestListPage from "./pages/ChiefGuestListPage";
import ChiefGuestFormPage from "./pages/ChiefGuestFormPage";
import ChiefGuestHistoryPage from "./pages/ChiefGuestHistoryPage";
import GeneralUpdateListPage from "./pages/GeneralUpdateListPage";
import PointsPage from "./pages/PointsPage";
import AwardListPage from "./pages/AwardListPage";
import AwardFormPage from "./pages/AwardFormPage";
import BusinessCategoryListPage from "./pages/BusinessCategoryListPage";
import BusinessCategoryFormPage from "./pages/BusinessCategoryFormPage";
import CompanyPage from "./pages/CompanyPage";
import ZoneFormPage from "./pages/ZoneFormPage";
import RenewalReportPage from "./pages/RenewalReportPage";
function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePageEight />} />

        {/* Auth & Utility Pages */}
        <Route exact path="/sign-in" element={<SignInPage />} />
        <Route exact path="/sign-up" element={<SignUpPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/coming-soon" element={<ComingSoonPage />} />
        <Route exact path="/access-denied" element={<AccessDeniedPage />} />
        <Route exact path="/maintenance" element={<MaintenancePage />} />
        <Route exact path="/email" element={<EmailPage />} />
        <Route exact path="/view-profile" element={<ViewProfilePage />} />
        <Route exact path="/company" element={<CompanyPage />} />

        {/* Dynamic Forms using FormPage */}
        <Route
          exact
          path="/chapter-badge"
          element={<FormPage title="Chapter Badge" />}
        />
        <Route
          exact
          path="/member-badge"
          element={<FormPage title="Member Badge" />}
        />
        <Route
          exact
          path="/meetings-create"
          element={<FormPage title="Meeting Creation" />}
        />
        <Route exact path="/renewal-report" element={<RenewalReportPage />} />
        <Route
          exact
          path="/ed-report"
          element={<FormPage title="ED Report" />}
        />
        <Route
          exact
          path="/rd-report"
          element={<FormPage title="RD Report" />}
        />
        <Route
          exact
          path="/power-date"
          element={<FormPage title="Power date" />}
        />
        <Route
          exact
          path="/present-update"
          element={<FormPage title="Present Update" />}
        />
        <Route
          exact
          path="/roles-permissions"
          element={<FormPage title="Roles & Permissions" />}
        />
        <Route
          exact
          path="/office-location"
          element={<FormPage title="Office Location" />}
        />
        <Route exact path="/form" element={<FormPage />} />

        {/* Master Creation */}
        <Route exact path="/user-roles" element={<UserRoleListPage />} />
        <Route exact path="/user-roles/create" element={<UserRoleFormPage />} />
        <Route exact path="/zone/add" element={<ZoneFormPage />} />
        <Route
          exact
          path="/user-roles/edit/:id"
          element={<UserRoleFormPage />}
        />
        <Route
          exact
          path="/user-roles/view/:id"
          element={<UserRoleFormPage />}
        />

        <Route
          exact
          path="/admin-registration"
          element={<AdminRegistrationListPage />}
        />
        <Route
          exact
          path="/admin-registration/add"
          element={<AdminRegistrationFormPage />}
        />
        <Route
          exact
          path="/admin-registration/view/:id"
          element={<AdminRegistrationViewPage />}
        />
        <Route
          exact
          path="/admin-registration/edit/:id"
          element={<AdminRegistrationEditPage />}
        />

        <Route exact path="/organisation" element={<OrganisationListPage />} />
        <Route
          exact
          path="/organisation/add"
          element={<OrganisationFormPage />}
        />
        <Route
          exact
          path="/organisation/edit/:id"
          element={<OrganisationFormPage />}
        />

        <Route exact path="/badge" element={<BadgeCreationPage />} />
        <Route exact path="/badge/create" element={<BadgeCreateFormPage />} />
        <Route exact path="/badge/edit/:id" element={<BadgeCreateFormPage />} />
        <Route exact path="/badge/assign" element={<BadgeAssignFormPage />} />

        <Route exact path="/award" element={<AwardListPage />} />
        <Route exact path="/award/add" element={<AwardFormPage />} />
        <Route exact path="/award/edit/:id" element={<AwardFormPage />} />

        <Route
          exact
          path="/business-category"
          element={<BusinessCategoryListPage />}
        />
        <Route
          exact
          path="/business-category/add"
          element={<BusinessCategoryFormPage />}
        />
        <Route
          exact
          path="/business-category/edit/:id"
          element={<BusinessCategoryFormPage />}
        />

        {/* Chapter Creation */}
        <Route exact path="/chapter-creation" element={<ChapterListPage />} />
        <Route
          exact
          path="/chapter-creation/add"
          element={<ChapterFormPage />}
        />
        <Route
          exact
          path="/chapter-creation/edit/:id"
          element={<ChapterFormPage />}
        />
        <Route exact path="/chapter-view/:id" element={<ChapterViewPage />} />

        {/* Members Registration */}
        <Route
          exact
          path="/members-registration"
          element={<MemberListPage />}
        />
        <Route
          exact
          path="/members-registration/add"
          element={<MemberFormPage />}
        />
        <Route
          exact
          path="/members-registration/edit/:id"
          element={<MemberFormPage />}
        />

        {/* Meeting Creation */}
        <Route exact path="/meeting-creation" element={<MeetingListPage />} />
        <Route
          exact
          path="/meeting-creation/add"
          element={<MeetingFormPage />}
        />
        <Route
          exact
          path="/meeting-creation/edit/:id"
          element={<MeetingFormPage />}
        />

        {/* Attendance List */}
        <Route
          exact
          path="/attendance-report"
          element={<AttendanceListPage />}
        />
        <Route
          exact
          path="/meeting-attendance/:id"
          element={<MeetingAttendancePage />}
        />
        <Route
          exact
          path="/member-history/:id"
          element={<MemberHistoryPage />}
        />

        {/* Announcement */}
        <Route exact path="/general-update" element={<GeneralUpdatePage />} />
        <Route
          exact
          path="/general-update-list"
          element={<GeneralUpdateListPage />}
        />

        <Route
          exact
          path="/community-update"
          element={<CommunityUpdatePage />}
        />
        <Route
          exact
          path="/community-update/add"
          element={<CommunityUpdateFormPage />}
        />

        <Route exact path="/star-update" element={<StarUpdatePage />} />
        <Route exact path="/star-update/add" element={<StarUpdateFormPage />} />
        <Route
          exact
          path="/star-update/edit/:id"
          element={<StarUpdateFormPage />}
        />
        <Route
          exact
          path="/star-update/view/:id"
          element={<StarUpdateFormPage />}
        />
        <Route exact path="/points" element={<PointsPage />} />

        {/* Training */}
        <Route exact path="/training" element={<TrainingListPage />} />
        <Route exact path="/training-list" element={<TrainingListPage />} />
        <Route exact path="/training-create" element={<TrainingFormPage />} />
        <Route exact path="/training-edit/:id" element={<TrainingFormPage />} />
        <Route exact path="/training-view/:id" element={<TrainingFormPage />} />

        {/* Shop */}
        <Route exact path="/shop-list" element={<ShopListPage />} />
        <Route exact path="/shop-create" element={<ShopCreatePage />} />
        <Route exact path="/shop-add" element={<ShopFormPage />} />
        <Route exact path="/shop-edit/:id" element={<ShopFormPage />} />

        {/* Orders */}
        <Route exact path="/orders" element={<OrdersPage />} />

        {/* Log Report */}
        <Route exact path="/log-report" element={<LogReportPage />} />

        {/* Chapter Report */}
        <Route exact path="/chapter-report" element={<ChapterReportPage />} />

        {/* Visitors Report */}
        <Route exact path="/visitors-report" element={<VisitorsReportPage />} />

        {/* Chapter Activity Report */}
        <Route exact path="/note-121" element={<Note121Page />} />
        <Route exact path="/referral-note" element={<ReferralNotePage />} />
        <Route exact path="/thank-you-slip" element={<ThankYouSlipPage />} />
        <Route exact path="/testimonials" element={<TestimonialsPage />} />

        {/* Chief Guest List */}
        <Route
          exact
          path="/chief-guest-list"
          element={<ChiefGuestListPage />}
        />
        <Route exact path="/chief-guest-add" element={<ChiefGuestFormPage />} />
        <Route
          exact
          path="/chief-guest-history"
          element={<ChiefGuestHistoryPage />}
        />

        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
