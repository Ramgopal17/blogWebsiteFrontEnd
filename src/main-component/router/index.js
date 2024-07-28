import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../HomePage/HomePage";
import BlogPage from "../BlogPage/BlogPage";
import BlogDetails from "../BlogDetails/BlogDetails";
import ErrorPage from "../ErrorPage/ErrorPage";
import HighlightSingle from "../HighlightSingle/HighlightSingle";
import BlogPageTag from "../BlogPage/BlogPageTag";
import BlogDetailsTag from "../BlogDetails/BlogDetailsTag";


const AllRoute = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="highlight-single/:slug" element={<HighlightSingle />} />
          <Route path="blog/category/:slug" element={<BlogPage />} />
   
          <Route path="blog/tag/:slug" element={<BlogPageTag />} />
          <Route path="blog-single/:slug" element={<BlogDetails />} />
          <Route path="blog-single/tag/:slug" element={<BlogDetailsTag />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
