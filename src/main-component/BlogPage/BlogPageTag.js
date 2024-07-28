import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import BlogListTag from "../../components/BlogList/BlogListTag.js";

const BlogPageTag = () => {
  const { slug } = useParams();
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle pageTitle={`Tag/${slug}`} pagesub={"Blog"} />

      <div className="theme-bg-black">
        <BlogListTag slug={slug} />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default BlogPageTag;
