import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import BlogList from "../../components/BlogList/BlogList.js";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";

const slugify = require("slugify");

const BlogPage = () => {
  const { slug } = useParams();

  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  const title = capitalizeFirstLetter(
    slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g })
  );
  const finalTitle = title.replace(/-/g, " ");
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle pageTitle={`Category/${finalTitle}`} pagesub={"Blog"} />
      <div className="theme-bg-black">
        <BlogList slug={slug} />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default BlogPage;
