import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";

import BlogSingle from "../../components/BlogDetails/BlogSingle.js";
import Footer from "../../components/footer/footer-12";
import globalEnv from "../../api/globalenv.js";

const BlogDetails = () => {
  const { slug } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle 
        pageTitle={data.map((item) => item?.attributes?.Title).find(Boolean)}
        pagesub={"Blog"}
      />
      <div className="theme-bg-black">
        <BlogSingle data={data} />
      </div>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default BlogDetails;
