import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import NoImage from "../../images/noImage.jpg";
import "./BlogSingle.css";
import globalEnv from "../../api/globalenv";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "react-loading-skeleton/dist/skeleton.css";
import ContactForm from "../form/form.js";

const BlogSingle = ({ blRight = "", blLeft = "" }) => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);
  const [catItem, setCatItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        setItem(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (item.length === 0) return;

      const url = item
        .map((item1) => item1?.attributes?.Category?.data?.attributes?.Title)
        .join(",");
      try {
        const response = await fetch(
          `${globalEnv.api}/api/categories?filters[Title][$eq]=${encodeURIComponent(url)}&populate=Articles.Image,Articles.Author,Articles.White_Paper_Pdf_File`
        );
        const data = await response.json();
        setCatItem(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryData();
  }, [item]);

  useEffect(() => {
    const index = catItem[0]?.attributes?.Articles?.data.findIndex((x) =>
      item.map((p) => p?.id)?.includes(x?.id)
    );
    setCurrentIndex(index);
  }, [catItem, item]);

  const handleNext = () => {
    if (currentIndex < catItem[0]?.attributes?.Articles?.data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentData = useMemo(
    () => catItem[0]?.attributes?.Articles?.data[currentIndex],
    [catItem, currentIndex]
  );
  const nextData = useMemo(
    () => catItem[0]?.attributes?.Articles?.data[currentIndex + 1],
    [catItem, currentIndex]
  );
  const prevData = useMemo(
    () => catItem[0]?.attributes?.Articles?.data[currentIndex - 1],
    [catItem, currentIndex]
  );

  const countWords = (str) => str?.trim().split(/\s+/).length ?? 0;
  const imageUrl = currentData?.attributes?.Image?.data[0]?.attributes?.url;
  const hasWhitePaper = currentData?.attributes?.White_Paper_Pdf_File?.data?.length > 0;
  const downloadWhitePaperUrl = currentData?.attributes?.White_Paper_Pdf_File?.data?.[0]?.attributes?.url ?? null;
  return (
    <div>
      {hasWhitePaper && (
        <section className="wpo-blog-single-section pt-25 pb-25">
          <div className="container">
            <div className="row">
              <div className={`col col-lg-8 col-12 ${blRight}`}>
                <div className="wpo-blog-content">
                  <div className="post format-standard-image">
                    {currentData ? (
                      <div>
                        <div className="custom-list">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentData.attributes.Description.replace(
                                /src="(\/[^"]+)"/g,
                                (match, src) =>
                                  src.startsWith("http") ? match : `src="${globalEnv.api}${src}"`
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p>
                        <span id="descOnDetailPage">
                          {[...Array(30)].map((_, index) => (
                            <span key={index} className="line shimmer"></span>
                          ))}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                    <div className="previous-post" style={{ padding: "40px 25px" }}>
                      {prevData ? (
                        <Link to={`/blog-single/${prevData?.attributes?.Slug}`} onClick={handlePrevious}>
                          <span className="post-control-link previousLink">Previous Post</span>
                          <span className="post-name">{prevData?.attributes?.Title}</span>
                        </Link>
                      ) : (
                        <div>
                          <span className="post-control-link disabled previousLink">Previous Post</span>
                        </div>
                      )}
                    </div>
                    <div className="next-post" style={{ padding: "40px 25px" }}>
                      {nextData ? (
                        <Link to={`/blog-single/${nextData?.attributes?.Slug}`} onClick={handleNext}>
                          <span className="post-control-link nextLink">Next Post</span>
                          <span className="post-name">{nextData?.attributes?.Title}</span>
                        </Link>
                      ) : (
                        <div>
                          <span className="post-control-link disabled nextLink">Next Post</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col col-lg-4 col-12 ${blRight} `}>
  
                  <ContactForm key={currentData?.id} downloadWhitePaper={downloadWhitePaperUrl} />
 
              </div>
            </div>
          </div>
        </section>
      )}
      {!hasWhitePaper && (
        <section className="wpo-blog-single-section pt-25 pb-25">
          <div className="container">
            <div className="row">
              <div className={`col col-lg-8 col-12 ${blRight}`}>
                <div className="wpo-blog-content">
                  <div className="post format-standard-image">
                    <div className="entry-media imageProps">
                      {imageUrl ? (
                        <img
                          src={`${globalEnv.api}${imageUrl}`}
                          alt={currentData?.attributes?.Image.data[0].attributes.name.replace(/\.[^.]+$/, "").slice(0, 30) + "..."}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = NoImage;
                            e.target.classList.add("error-image");
                          }}
                        />
                      ) : (
                        <ShimmerThumbnail height={320} rounded className="coloring" />
                      )}
                    </div>
                    {currentData ? (
                      <div>
                        <div className="entry-meta">
                          <ul>
                            {currentData?.attributes?.Author?.data[0]?.attributes?.fullname && (
                              <li>
                                <i className="fi flaticon-user"></i> By {currentData.attributes.Author.data[0].attributes.fullname}
                              </li>
                            )}
                            <li>
                              <i className="fi flaticon-calendar"></i> {new Date(currentData.attributes.createdAt).toLocaleDateString("en-GB")}
                            </li>
                            <li>
                              <i className="fa-regular fa-clock"></i> {Math.ceil(countWords(currentData.attributes.Description) / 200)} min read
                            </li>
                          </ul>
                        </div>
                        <div className="custom-list">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentData.attributes.Description.replace(
                                /src="(\/[^"]+)"/g,
                                (match, src) =>
                                  src.startsWith("http") ? match : `src="${globalEnv.api}${src}"`
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p>
                        <span id="descOnDetailPage">
                          {[...Array(30)].map((_, index) => (
                            <span key={index} className="line shimmer"></span>
                          ))}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                    <div className="previous-post" style={{ padding: "40px 25px" }}>
                      {prevData ? (
                        <Link to={`/blog-single/${prevData?.attributes?.Slug}`} onClick={handlePrevious}>
                          <span className="post-control-link previousLink">Previous Post</span>
                          <span className="post-name">{prevData?.attributes?.Title}</span>
                        </Link>
                      ) : (
                        <div>
                          <span className="post-control-link disabled previousLink">Previous Post</span>
                        </div>
                      )}
                    </div>
                    <div className="next-post" style={{ padding: "40px 25px" }}>
                      {nextData ? (
                        <Link to={`/blog-single/${nextData?.attributes?.Slug}`} onClick={handleNext}>
                          <span className="post-control-link nextLink">Next Post</span>
                          <span className="post-name">{nextData?.attributes?.Title}</span>
                        </Link>
                      ) : (
                        <div>
                          <span className="post-control-link disabled nextLink">Next Post</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <BlogSidebar blLeft={blLeft} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogSingle;
