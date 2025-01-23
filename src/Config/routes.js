import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Admin/Pages/dashboard/Dashboard";
import Driver from "../Admin/Pages/driver/Driver";
import Users from "../Admin/Pages/user/User";
import Customers from "../Admin/Pages/customer/Customer";
import Ride from "../Admin/Pages/rides/Ride";
import Privacy from "../Admin/Pages/privacy/Privacy";
import Faq from "../Admin/Pages/faq/Faq";
import Terms from "../Admin/Pages/terms/Terms";
import AdminContact from "../Admin/Pages/contact/Contact";
import Notification from "../Admin/Pages/notification/Notification";
import AddDriver from "../Admin/Pages/driver/AddDriver";
import AddUsers from "../Admin/Pages/user/AddUser";
import AddCustomer from "../Admin/Pages/customer/AddCustomer";
import AddRide from "../Admin/Pages/rides/AddRide";
import AddAbout from "../Admin/Pages/aboutUs/AddAboutUs";
import AddPrivacy from "../Admin/Pages/privacy/AddPrivacy";
import AddFaq from "../Admin/Pages/faq/AddFaq";
import AddTerms from "../Admin/Pages/terms/AddTerms";

import SubAdmin from "../Admin/Pages/subAdmin/SubAdmin";
import Blog from "../Admin/Pages/blog/Blog";
import AddBlog from "../Admin/Pages/blog/AddBlog";
import Support from "../Admin/Pages/support/Support";
import AddSupport from "../Admin/Pages/support/AddSupport";
import Newsletter from "../Admin/Pages/newLetter/NewsLetter";

import EditDriver from "../Admin/Pages/driver/EditDriver";
import EditUser from "../Admin/Pages/user/EditUser";
import EditCustomer from "../Admin/Pages/customer/EditCustomer";
import EditRide from "../Admin/Pages/rides/EditRide";
import EditPrivacy from "../Admin/Pages/privacy/EditPrivacy";
import EditFaq from "../Admin/Pages/faq/EditFaq";
import EditTerms from "../Admin/Pages/terms/EditTerms";

import EditBlog from "../Admin/Pages/blog/EditBlog";
import EditSupport from "../Admin/Pages/support/EditSupport";

import Driverdetails from "../Admin/Pages/driver/Driverdetails";
import DriverHistory from "../Admin/Pages/driver/DriverHistory";
import Userdetails from "../Admin/Pages/user/Userdetails";
import Customerdetails from "../Admin/Pages/customer/Customerdetails";
import RideDetails from "../Admin/Pages/rides/Ridedetails";
import PrivacyDetails from "../Admin/Pages/privacy/PrivacyDetails";
import FaqDetails from "../Admin/Pages/faq/Faqdetails";
import TermsDetails from "../Admin/Pages/terms/TermsDetails";

import BlogDetails from "../Admin/Pages/blog/BlogDetails";
import SupportDetails from "../Admin/Pages/support/SupportDetails";
import HomePage from "../pages";
import AdminLayout from "../layout";
import AddContact from "../Admin/Pages/contact/ContactAdd";
import Subscription from "../Admin/Pages/Subcription";
import AddSubscription from "../Admin/Pages/Subcription/AddSubscription";
import AddEditTestimonials from "../Admin/Pages/reviews/AddEditTestimonial";
import JobForm from "../Admin/Pages/job/form";
import JobList from "../Admin/Pages/job";
import JobDetail from "../Admin/Pages/job/detail";
import AddEditSubAdmin from "../Admin/Pages/subAdmin/AddEditSubAdmin";
import ContactUsDetails from "../Admin/Pages/contact/ContactDetails";
import AddSubAdmin from "../Admin/Pages/subAdmin/SubAdmin/form";
import SubAdminDetail from "../Admin/Pages/subAdmin/SubAdmin/subAdminDetail";
import SubAdminList from "../Admin/Pages/subAdmin/SubAdmin";
import AddNewsLetter from "../Admin/Pages/newLetter/AddNewsLetter";
import JobDeleted from "../Admin/Pages/job_deleted";
import CollectionCentre from "../Admin/Pages/colllection center/collectionCenter"
import Farmer from "../Admin/Pages/Farmer/Farmer"








const AdminSignin = React.lazy(() => import("../Admin/siginin/AdminSigin"));
const Reviews = React.lazy(() => import("../Admin/Pages/reviews/Reviews"));







const AddTestimonial = React.lazy(() =>
  import("../Admin/Pages/reviews/AddEditTestimonial")
);

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <AdminSignin />
          </Suspense>
        }
      />
      <Route
        path="/master/dashboard"
        element={
          <>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </>
        }
      />
      {/* driver start */}
      <Route
        path="/master/User/Customers"
        element={
          <>
            <AdminLayout>
              <Driver />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/driver/drivers/add"
        element={
          <>
            <AdminLayout>
              <AddDriver />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/driver/drivers/view/:id"
        element={
          <>
            <AdminLayout>
              <Driverdetails />
            </AdminLayout>
          </>
        }
      />

      {/* // driver history */}

      <Route
        path="/master/driver/history/:id"
        element={
          <>
            <AdminLayout>
              <DriverHistory />
            </AdminLayout>
          </>
        }
      />

      <Route
        path="/master/driver/drivers/edit/:id"
        element={
          <>
            <AdminLayout>
              <EditDriver />
            </AdminLayout>
          </>
        }
      />

      {/* driver end */}

      {/* user list */}

      <Route
        path="/master/customer/users"
        element={
          <>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/customer/users/add"
        element={
          <>
            <AdminLayout>
              <AddUsers />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/customer/users/view/:id"
        element={
          <>
            <AdminLayout>
              <Userdetails />
            </AdminLayout>
          </>
        }
      />

      <Route
        path="/master/customer/users/edit/:id"
        element={
          <>
            <AdminLayout>
              <EditUser />
            </AdminLayout>
          </>
        }
      />

      {/* user end */}
      {/* collection center */}
      <Route
        path="/master/User/collection"
        element={
          <>
            <AdminLayout>
              <CollectionCentre />
            </AdminLayout>
          </>
        }
      />
      {/* customer start */}
    {/* Farmer */}
    <Route
        path="/master/User/farmer"
        element={
          <>
            <AdminLayout>
              <Farmer />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/customer/customers"
        element={
          <>
            <AdminLayout>
              <Customers />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/customer/customers/add"
        element={
          <>
            <AdminLayout>
              <AddCustomer />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/customer/customers/view/:id"
        element={
          <>
            <AdminLayout>
              <Customerdetails />
            </AdminLayout>
          </>
        }
      />

      <Route
        path="/master/customer/customers/edit/:id"
        element={
          <>
            <AdminLayout>
              <EditCustomer />
            </AdminLayout>
          </>
        }
      />

      {/* customer end */}

      {/* ride start */}

      <Route
        path="/master/ride/rides"
        element={
          <>
            <AdminLayout>
              <Ride />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/job/jobs/:routeName/:id"
        element={
          <Suspense>
            <AdminLayout>
              <JobForm />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/job/jobs/list"
        element={
          <Suspense>
            <AdminLayout>
              <JobList />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/job/jobs/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <JobDetail />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/job/job_deleted/list"
        element={
          <Suspense>
            <AdminLayout>
              <JobDeleted />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/ride/rides/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <RideDetails />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/ride/rides/edit/:id"
        element={
          <Suspense>
            <AdminLayout>
              <EditRide />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* ride End */}

      {/* About us start */}

      <Route
        path="/master/setting/aboutus/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddAbout />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* About us End */}

      {/* Contact us start */}

      <Route
        path="/master/setting/contactus"
        element={
          <>
            <AdminLayout>
              <AdminContact />
            </AdminLayout>
          </>
        }
      />

      <Route
        path="/master/setting/contactus/add"
        element={
          <>
            <AdminLayout>
              <AddContact />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/setting/contactus/view/:id"
        element={
          <>
            <AdminLayout>
              <ContactUsDetails />
            </AdminLayout>
          </>
        }
      />

      {/* Contact us End */}

      {/* Privacy start */}

      <Route
        path="/master/setting/privacy-policy"
        element={
          <Suspense>
            <AdminLayout>
              <Privacy />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/privacy-policy/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddPrivacy />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/privacy-policy/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <PrivacyDetails />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/setting/privacy-policy/edit/:id"
        element={
          <Suspense>
            <AdminLayout>
              <EditPrivacy />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* Privacy Policy End */}

      {/* Faq start */}

      <Route
        path="/master/setting/faq"
        element={
          <Suspense>
            <AdminLayout>
              <Faq />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/faq/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddFaq />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/faq/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <FaqDetails />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/setting/faq/edit/:id"
        element={
          <Suspense>
            <AdminLayout>
              <EditFaq />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* Faq End */}

      {/* sub Admin start */}

      <Route
        path="/master/subadmin"
        element={
          <Suspense>
            <AdminLayout>
              <SubAdmin />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/subadmin/:id"
        element={
          <Suspense>
            <AdminLayout>
              <AddEditSubAdmin />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/sub-admin/list"
        element={
          <>
            <AdminLayout>
              <SubAdminList />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/sub-admin/:id"
        element={
          <>
            <AdminLayout>
              <AddSubAdmin />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/sub-admin/edit/:id"
        element={
          <>
            <AdminLayout>
              <AddSubAdmin />
            </AdminLayout>
          </>
        }
      />
      <Route
        path="/master/sub-admin/view/:id"
        element={
          <>
            <AdminLayout>
              <SubAdminDetail />
            </AdminLayout>
          </>
        }
      />

      {/* sub Admin End */}

      {/* Subscription Start */}
      <Route
        path="/master/subscription/subscriptions"
        element={
          <Suspense>
            <AdminLayout>
              <Subscription />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/subscription/subscription"
        element={
          <Suspense>
            <AdminLayout>
              <AddSubscription />
            </AdminLayout>
          </Suspense>
        }
      />
      {/* Subscription End */}

      {/* Blog start */}
      <Route
        path="/master/blog/blogs"
        element={
          <Suspense>
            <AdminLayout>
              <Blog />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/blog/blogs/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddBlog />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/blog/blogs/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <BlogDetails />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/blog/blogs/edit/:id"
        element={
          <Suspense>
            <AdminLayout>
              <EditBlog />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* Blog End */}

      {/* Terms start */}

      <Route
        path="/master/setting/term-and-conditions"
        element={
          <Suspense>
            <AdminLayout>
              <Terms />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/term-and-conditions/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddTerms />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/setting/term-and-conditions/view/:id"
        element={
          <Suspense>
            <AdminLayout>
              <TermsDetails />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/setting/term-and-conditions/edit/:id"
        element={
          <Suspense>
            <AdminLayout>
              <EditTerms />
            </AdminLayout>
          </Suspense>
        }
      />

      {/* Terms End */}

      <Route
        path="/master/review/review-ratings"
        element={
          <Suspense>
            <AdminLayout>
              <Reviews />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/newsletter/newsletters"
        element={
          <Suspense>
            <AdminLayout>
              <Newsletter />
            </AdminLayout>
          </Suspense>
        }
      />
      <Route
        path="/master/newsletter/add"
        element={
          <Suspense>
            <AdminLayout>
              <AddNewsLetter />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/review/testimonials/:id"
        element={
          <Suspense>
            <AdminLayout>
              <AddEditTestimonials />
            </AdminLayout>
          </Suspense>
        }
      />

      <Route
        path="/master/notificationmanagement/notificationmanagements"
        element={
          <>
            <AdminLayout>
              <Notification />
            </AdminLayout>
          </>
        }
      />
    </Routes>
  );
};

export default Routing;
