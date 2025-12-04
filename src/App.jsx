// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DirectoryProviderLayout from "./layouts/DirectoryProviderLayout";
import BusinessSetup from "./pages/BusinessSetup";
import ProviderDashboard from "./pages/ProviderDashboard";
import ManageBranches from "./pages/ManageBranches";
import ServiceList from "./pages/ServiceList";
import GalleryManager from "./pages/GalleryManager";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Provider Layout Wrapper */}
        <Route path="/provider" element={<DirectoryProviderLayout />}>

          {/* Default page */}
          <Route index element={<ProviderDashboard />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<ProviderDashboard />} />

          {/* Business Page */}
          <Route path="business" element={<BusinessSetup />} />
          <Route path="branches" element={<ManageBranches />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="gallery" element={<GalleryManager />} />

        </Route>
      </Routes>
    </Router>
  );
}
