import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import "./BlogSingleTag.css";
import ContactForm from "../form/form.js";
import globalEnv from "../../api/globalenv.js";
import { ShimmerThumbnail } from "react-shimmer-effects";
import NoImge from "../../images/noImage.jpg";
const BlogSingleTag = ({ data, ...props }) => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);
  const [tagItem, setTagItem] = useState([]);
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

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  useEffect(() => {
    const fetchData = async () => {
      let url = item.map((item1) => item1.attributes.Tag);

      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[tag][$eq]=${url}&populate=*`
        );
        const data = await response.json();
        setTagItem(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [item]);

  useEffect(() => {
    const index = tagItem.findIndex((x) => {
      return item.map((p) => p?.id)?.includes(x?.id);
    });
    setCurrentIndex(index);
  }, [slug, tagItem, data, item]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    window.scrollTo(0, 0);
  };

  const currentData = tagItem[currentIndex];
  const nextData = tagItem[currentIndex + 1];
  const prevData = tagItem[currentIndex - 1];

  const imageUrl = currentData?.attributes?.Image?.data[0]?.attributes?.url;
  let hasWhitepaper = currentData?.attributes?.White_Paper_Pdf_File?.data?.length > 0
  const downloadWhitePaperUrl = currentData?.attributes?.White_Paper_Pdf_File?.data?.[0]?.attributes?.url ?? null;

  return (
    <div>
      {hasWhitepaper && (
        <section className="wpo-blog-single-section pt-25 pb-25">
          <div className="container">
            <div className="row">
              <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                <div className="wpo-blog-content">
                  <div className="post format-standard-image">

                    {currentData ? (
                      <div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              currentData.attributes?.Description.replace(
                                /src="(\/[^"]+)"/g,
                                (match, src) =>
                                  src.startsWith("http")
                                    ? match
                                    : `src="${globalEnv.api}${src}"`
                              ) || "",
                          }}
                        ></div>
                      </div>
                    ) : (
                      <p>
                        <span id="descOnDetailPage">
                          {[...Array(30)].map((item, index) => (
                            <span key={index} className="line shimmer"></span>
                          ))}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                    <div className="previous-post" style={{ padding: "40px 25px" }}>
                      {prevData ? (
                        <Link
                          to={`/blog-single/tag/${prevData?.attributes.Slug}`}
                          onClick={handlePrevious}
                        >
                          <span className="post-control-link">Previous Post</span>
                          <span className="post-name">
                            {prevData?.attributes?.Title}
                          </span>
                        </Link>
                      ) : (
                        <>
                          <span className="post-control-link inactive">
                            Previous Post
                          </span>
                          <span className="post-name"></span>
                        </>
                      )}
                    </div>
                    <div className="next-post" style={{ padding: "40px 25px" }}>
                      {nextData ? (
                        <Link
                          to={`/blog-single/tag/${nextData?.attributes?.Slug}`}
                          onClick={handleNext}
                        >
                          <span className="post-control-link">Next Post</span>
                          <span className="post-name">
                            {nextData?.attributes?.Title}
                          </span>
                        </Link>
                      ) : (
                        <>
                          <span className="post-control-link inactive">
                            Next Post
                          </span>
                          <span className="post-name"></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col col-lg-4 col-12 ${props.blRight} `}>

                <ContactForm key={currentData?.id} downloadWhitePaper={downloadWhitePaperUrl} />

              </div>
            </div>
          </div>
        </section>
      )}
      {!hasWhitepaper && (
        <section className="wpo-blog-single-section pt-25 pb-25">
          <div className="container">
            <div className="row">
              <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                <div className="wpo-blog-content">
                  <div className="post format-standard-image">
                    <div
                      className="entry-media"
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "auto",

                        overflow: "hidden",
                        borderRadius: "10px",
                      }}
                    >
                      {imageUrl ? (
                        <img
                          src={`${globalEnv?.api}${imageUrl}`}
                          alt={
                            currentData?.attributes?.Image.data[0].attributes.name
                              .replace(/\.[^.]+$/, "")
                              .slice(0, 30) + "..."
                          }
                          effect="blur"
                          class="imageProps"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `${NoImge}`;
                            e.target.classList.add("error-image");
                          }}
                        />
                      ) : (
                        <div>
                          <div>
                            <ShimmerThumbnail
                              height={350}
                              rounded
                              className={"coloring"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {currentData ? (
                      <div>
                        <div className="entry-meta">
                          {currentData?.attributes?.Author?.data[0]?.attributes
                            ?.fullname && (
                              <ul>
                                <li>
                                  <i className="fi flaticon-user"> </i> By{" "}
                                  {
                                    currentData?.attributes?.Author?.data[0]
                                      ?.attributes?.fullname
                                  }
                                </li>
                                <li>
                                  <i className="fi flaticon-calendar"></i>
                                  {new Date(
                                    currentData?.attributes?.createdAt
                                  ).toLocaleDateString("en-GB")}
                                </li>
                                <li>
                                  <i className="fa-regular fa-clock"></i>&nbsp;
                                  {Math.ceil(
                                    countWords(currentData?.attributes?.Description) /
                                    200
                                  )}{" "}
                                  min read
                                </li>
                              </ul>
                            )}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              currentData.attributes?.Description.replace(
                                /src="(\/[^"]+)"/g,
                                (match, src) =>
                                  src.startsWith("http")
                                    ? match
                                    : `src="${globalEnv.api}${src}"`
                              ) || "",
                          }}
                        ></div>
                      </div>
                    ) : (
                      <p>
                        <span id="descOnDetailPage">
                          {[...Array(30)].map((item, index) => (
                            <span key={index} className="line shimmer"></span>
                          ))}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                    <div className="previous-post" style={{ padding: "40px 25px" }}>
                      {prevData ? (
                        <Link
                          to={`/blog-single/tag/${prevData?.attributes.Slug}`}
                          onClick={handlePrevious}
                        >
                          <span className="post-control-link">Previous Post</span>
                          <span className="post-name">
                            {prevData?.attributes?.Title}
                          </span>
                        </Link>
                      ) : (
                        <>
                          <span className="post-control-link inactive">
                            Previous Post
                          </span>
                          <span className="post-name"></span>
                        </>
                      )}
                    </div>
                    <div className="next-post" style={{ padding: "40px 25px" }}>
                      {nextData ? (
                        <Link
                          to={`/blog-single/tag/${nextData?.attributes?.Slug}`}
                          onClick={handleNext}
                        >
                          <span className="post-control-link">Next Post</span>
                          <span className="post-name">
                            {nextData?.attributes?.Title}
                          </span>
                        </Link>
                      ) : (
                        <>
                          <span className="post-control-link inactive">
                            Next Post
                          </span>
                          <span className="post-name"></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <BlogSidebar blLeft={props.blLeft} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogSingleTag;
