import React, { useEffect } from "react";
import BlogSidebar from "../../../components/BlogSidebar/BlogSidebar";
import globalEnv from "../../../api/globalenv";
import "./HighlightDetails.css";
import ContactForm from "../../../components/form/form";
import { ShimmerThumbnail } from "react-shimmer-effects";
import NoImge from "../../../images/noImage.jpg";
const HighlightDetails = ({ article, blRight, blLeft }) => {
  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const imageUrl = article?.attributes?.Image?.data[0]?.attributes?.url;
  let hasWhitePaper = article?.attributes?.White_Paper_Pdf_File?.data?.length > 0
  const downloadWhitePaperUrl = article?.attributes?.White_Paper_Pdf_File?.data?.[0]?.attributes?.url ?? null;
  return (
    <div>
      {
        !hasWhitePaper && (
          <section className="wpo-blog-single-section pt-25 pb-10">
            <div className="container">
              <div className="row">
                <div className={`col col-lg-8 col-12 ${blRight}`}>
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
                          <div
                            style={{
                              width: "100%",
                              maxWidth: "100%",
                              height: "auto",
                              overflow: "hidden",
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              src={`${globalEnv?.api}${imageUrl}`}
                              alt={
                                article?.attributes?.Image.data[0].attributes.name
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
                          </div>
                        ) : (
                          <ShimmerThumbnail
                            height={350}
                            rounded
                            className={"coloring"}
                          />
                        )}
                      </div>

                      {article ? (
                        <div>
                          <div
                            className="entry-meta"

                          >
                            <ul style={{ listStyle: "none !important" }}>
                              {article?.attributes?.Author?.data[0]?.attributes
                                ?.fullname && (
                                  <li>
                                    <i className="fi flaticon-user"> </i> By{" "}
                                    {
                                      article?.attributes?.Author?.data[0]?.attributes
                                        ?.fullname
                                    }
                                  </li>
                                )}

                              <li>
                                <i className="fi flaticon-calendar"></i>{" "}
                                {new Date(
                                  article?.attributes?.createdAt
                                ).toLocaleDateString("en-GB")}{" "}
                              </li>
                              <li>
                                <i className="fa-regular fa-clock"></i>&nbsp;
                                {Math.ceil(
                                  countWords(article?.attributes?.Description) / 200
                                )}{" "}
                                min read
                              </li>
                            </ul>
                          </div>

                          <div className="custom-list">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  article.attributes?.Description.replace(
                                    /src="(\/[^"]+)"/g,
                                    (match, src) =>
                                      src.startsWith("http")
                                        ? match
                                        : `src="${globalEnv.api}${src}"`
                                  ) || "",
                              }}
                            ></div>
                          </div>
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
                  </div>
                </div>
                <BlogSidebar blLeft={blLeft} />
              </div>
            </div>
          </section>
        )
      }
      {
        hasWhitePaper && (
          <section className="wpo-blog-single-section pt-25 pb-10">
            <div className="container">
              <div className="row">
                <div className={`col col-lg-8 col-12 ${blRight}`}>
                  <div className="wpo-blog-content">
                    <div className="post format-standard-image">
                      {article ? (
                        <div>
                          <div className="custom-list">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  article.attributes?.Description.replace(
                                    /src="(\/[^"]+)"/g,
                                    (match, src) =>
                                      src.startsWith("http")
                                        ? match
                                        : `src="${globalEnv.api}${src}"`
                                  ) || "",
                              }}
                            ></div>
                          </div>
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
                  </div>
                </div>
                <div className={`col col-lg-4 col-12 ${blRight} `}>
                  <ContactForm key={article?.id} downloadWhitePaper={downloadWhitePaperUrl} />
                </div>
              </div>
            </div>
          </section>
        )
      }
    </div>
  );
};

export default React.memo(HighlightDetails);
