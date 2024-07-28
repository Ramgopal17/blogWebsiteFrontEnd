import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer-12";
import HighlightDetails from "./highlight/HighlightDetails";
import globalEnv from "../../api/globalenv.js";

const HighlightSingle = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data) && data.data.length > 0) {
          setArticle(data.data[0]);
        } else {
          setArticle(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setArticle(null);
      });
  }, [slug]);

  const pageTitle = article && article.attributes && article.attributes.Title;

  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={pageTitle} />
      <div className="theme-bg-black">
      <HighlightDetails article={article} slug={slug} />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default HighlightSingle;
