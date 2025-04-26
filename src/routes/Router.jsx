import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignupPage from "../users/pages/SignUpPage";
import LoginPage from "../users/pages/LoginPage";
import CreateEventPage from "../events/pages/CreateEventPage";
import MyEvents from "../events/pages/MyEvents";
import EditEventPage from "../events/pages/EditEventPage";
import CreateSupplierPage from "../suppliers/pages/CreateSupplierPage";
import RecommendedSuppliersPage from "../suppliers/pages/RecommendedSuppliersPage";
import EditSupplierPage from "../suppliers/pages/EditSupplierPage";
import ViewSupplierPage from "../suppliers/pages/ViewSupplierPage";
import SuppliersByCategoryPage from "../suppliers/pages/SuppliersByCategoryPage";
import AssignSupplierToEventPage from "../events/pages/AssignSupplierToEventPage";
import FavoriteSuppliersPage from "../suppliers/pages/FavoriteSuppliersPage";
import UserProfilePage from "../users/pages/UserProfilePage";
import EditProfilePage from "../users/pages/EditProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Router() {
    return (
      <Routes>
           <Route path={ROUTES.ROOT} element={<HomePage />} />
           <Route path={ROUTES.ABOUT} element={<AboutPage/>}/>
           <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
           <Route path={ROUTES.LOGIN} element={<LoginPage />} />
           <Route path={ROUTES.EVENTS} element={<CreateEventPage/>}/>
           <Route path={ROUTES.MY_EVENTS} element={<MyEvents/>}/>
           <Route path={ROUTES.EDIT_EVENT} element={<EditEventPage/>}/>
           <Route path={ROUTES.CREATE_SUPPLIER} element={<CreateSupplierPage/>}/>
           <Route path={ROUTES.ALL_SUPPLIER} element={<RecommendedSuppliersPage/>}/>
           <Route path={ROUTES.EDIT_SUPPLIER} element={<EditSupplierPage/>}/>
           <Route path={ROUTES.VIEW_SUPPLIER} element={<ViewSupplierPage/>}/>
           <Route path={ROUTES.VIEW_SUPPLIERS_BY_CATEGORY} element={<SuppliersByCategoryPage/>}/>
           <Route path={ROUTES.ASSIGN_SUPPLIER} element={<AssignSupplierToEventPage/>}/>
           <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage/>}/>
           <Route path={ROUTES.FAVORITE_SUPPLIER} element={<FavoriteSuppliersPage/>}/>
           <Route path={ROUTES.EDIT_USER} element={<EditProfilePage/>}/>
           <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>











           






      </Routes>
    

    );
  }
  