import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import BlogSingleTag from "../../components/BlogDetails/BlogSingleTag.js";
import Footer from "../../components/footer/footer-12";
import globalEnv from "../../api/globalenv.js";

const BlogDetailsTag = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`
        );
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  const pageTitle = data.map((item) => item?.attributes?.Title).find(Boolean);

  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle pageTitle={pageTitle} pagesub={"Blog"} />

      <div className="theme-bg-black">
        <BlogSingleTag data={data} slug={slug} />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default BlogDetailsTag;
