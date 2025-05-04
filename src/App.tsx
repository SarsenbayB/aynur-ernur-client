import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store.ts';


import Home from './pages/Home/Home.tsx';
import OurTeam from './pages/OurTeam/OurTeam.tsx';
import Success from './pages/Success/Success.tsx';
import Kindergarten from './pages/KinderGarten/KinderGarten.tsx';
import FoodMenu from './pages/FoodMenu/FoodMenu.tsx';
import { LoginPage } from './pages/Login/LoginPage.tsx';
import { RegisterPage } from './pages/Register/RegisterPage.tsx';
import { EmailConfirmation } from './pages/Register/EmailConfirmation.tsx';
import { ForgotPassword } from './pages/Register/ForgotPassword.tsx';
import { ResetPassword } from './pages/Register/ResetPassword.tsx';
import Groups from './pages/Groups/Groups.tsx';
import { Layout } from './components/Layout/Layout';
import { fetchAuthMe } from './redux/slices/auth.ts';
import DocuCrud from './components/DocuCrud/DocuCrud.tsx';
import FileTable from './components/FileTable/FileTable.tsx';
import AddTeam from './pages/Team/AddTeam.tsx';
import { FullTeam } from './pages/FullTeam/FullTeam.tsx';
import Akbota from './pages/Groups/Akbota/Akbota.tsx';
import Kulynshak from './pages/Groups/Kulynshak/Kulynshak.tsx';
import Erketay from './pages/Groups/Erketay/Erketay.tsx';
import Gallerys from './pages/Gallery/Gallerys.tsx';
import AddImage from './pages/AddImage.tsx';
import Contacts from './pages/Contacts/Contacts.tsx';























function App() {

  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  // const isAuth = useSelector(selectIsAuth);

  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/OurTeam' element={<OurTeam />} />
          <Route path='/Success' element={<Success />} />
          <Route path='/Groups' element={<Groups />} />
          <Route path='/Gallerys' element={<Gallerys />} />
          <Route path="/addImage" element={<AddImage />} />
          <Route path='/FoodMenu' element={<FoodMenu />} />
          <Route path='/Kindergarten' element={<Kindergarten />} />
          <Route path='/DocuCrud' element={<DocuCrud />} />
          <Route path='/Contacts' element={<Contacts />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/RegisterPage' element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirm/:token" element={<EmailConfirmation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/FileTable" element={<FileTable />} />
          <Route path="/files/:id/edit" element={<DocuCrud />} />
          <Route path="/AddTeam" element={<AddTeam />} />
          <Route path="/team/:id" element={<FullTeam />} />
          <Route path="/team/:id/edit" element={<AddTeam />} />
          <Route path="/Akbota" element={<Akbota />} />
          <Route path="/Kulynshak" element={<Kulynshak />} />
          <Route path="/Erketay" element={<Erketay />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
