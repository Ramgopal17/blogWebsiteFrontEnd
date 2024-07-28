import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../HighlightsNews/HighlightsNews.css";
import globalEnv from "../../api/globalenv.js";
import "./HighlightsNews.css";
import { AiOutlinePlus } from "react-icons/ai";
import "react-loading-skeleton/dist/skeleton.css";
import ShimmerUiCard from "../../utils/ShimmerUiCard";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ShimmerCategoryItem, ShimmerButton } from "react-shimmer-effects";
import NoImge from "../../images/noImage.jpg";
const truncate = require("truncate");

const HighlightsNews = (props) => {
  const [latest, setLatest] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage] = useState(1);

  const [visibleItems, setVisibleItems] = useState(6);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    fetch(`${globalEnv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/articles?filters[Archived][$eq]=false&sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setLatest(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const totalItems = latest?.length;

  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];

  for (const obj of latest) {
    if (!uniqueTags.has(obj?.attributes?.Tag)) {
      uniqueTags.add(obj?.attributes?.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }

  const loadMoreItems = () => {
    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 6);
    }
  };
  const uniqueCats = new Set();
  const objectsWithUniqueCats = [];

  for (const obj of category) {
    if (!uniqueCats.has(obj?.attributes?.Title)) {
      uniqueCats.add(obj?.attributes?.Title);
      objectsWithUniqueCats.push(obj);
    }
  }

  const filteredItems = latest.slice(0, visibleItems);

  return (
    <>
      <style>{`
        .it-blog-wrapper .ca-service__item-title a {
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .card-wrapper{
          height:100%;
          background-color:#1e2222 ;
        }
        `}</style>

      <section className="wpo-blog-highlights-section pb-25 pt-25">
        <div className="container">
          <div className="wpo-section-title">
            <h2>Posts</h2>
          </div>
          <div className="row">
            <div className={`col-12 col-lg-8 ${props.colClass}`}>
              <div className="wpo-blog-highlights-wrap">
                <div className="wpo-blog-items">
                  <div className="row">
                    {loading
                      ? [...Array(6)].map((_, index) => (
                          <div className="col-lg-6 p-3 rounded-8" key={index}>
                            <ShimmerUiCard />
                          </div>
                        ))
                      : filteredItems.map((item, i) => (
                          <div key={i} className="col-lg-6 p-3">
                            <Link
                              to={`/highlight-single/${item?.attributes?.Slug}`}
                            >
                              <div
                                className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper card-wrapper"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                
                                
                              >
                                <div className="it-blog__thumb w-img">
                                  <div className="fix">
                                    <div
                                        className="image-container"
                                    >
                                      <img
                                        src={
                                          item?.attributes?.Image?.data[0]
                                            ?.attributes?.formats?.thumbnail
                                            ?.url
                                            ? `${globalEnv?.api}${item?.attributes.Image.data[0].attributes.url}`
                                            : `${NoImge}`
                                        }
                                       
                                        onError={(e) => {
                                          e.target.src = `${NoImge}`;
                                          e.target.classList.add("error-image");
                                        }}
                                        alt={
                                          item?.attributes?.Image.data[0].attributes.name
                                            .replace(/\.[^.]+$/, "")
                                            .slice(0, 30) + "..."
                                        }
                                        effect="blur"
                              className="image-actual"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="it-blog-info white-bg  "
                                  style={{ backgroundColor: "#1e2222" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                    className="categoryButton"
                                  >
                                    <button
                                      style={{
                                        border: `2px solid ${
                                          item?.attributes?.Category?.data
                                            ?.attributes?.Title
                                            ? "#17348d"
                                            : "#1E2222"
                                        }`,
                                        padding: "2px 5px",
                                        borderRadius: "25px",
                                        marginBottom: "15px",

                                        fontSize: "13px",
                                        cursor: "default",
                                      }}
                                    >
                                      {
                                        item?.attributes?.Category?.data
                                          ?.attributes?.Title
                                      }
                                    </button>
                                    <div className="centeringDiv">
                                      <i
                                        className="fi flaticon-calendar"
                                        style={{
                                          fontSize: "13px",
                                          marginRight: "3px",
                                          marginTop: "2px",
                                        }}
                                      ></i>
                                      <span className="date">
                                        {new Date(
                                          item?.attributes?.createdAt
                                        ).toLocaleDateString("en-GB")}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <div
                                      className="p-abosolute pt-3"
                                      style={{
                                        bottom: "10px",
                                      }}
                                    >
                                      <h3
                                        className="ca-service__item-title1"
                                        style={{
                                          color: "#00ff00 !important",
                                          maxHeight: "3em",
                                          overflow: "hidden",
                                          display: "-webkit-box",
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >                                    
                                        {item?.attributes?.Title.trim()}
                                
                                      </h3>
                                    </div>
                                  </div>
                           
                                </div>
                            
                              </div>
                            </Link>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              {loadMoreVisible && totalItems > visibleItems && (
                <div className="loadMoreDiv pt-istop-btn-wrapper  text-center mt-20 ">
                  <button
                    className="tp-common-btn text-center "
                    onClick={loadMoreItems}
                  >
                    <span className="text-center button-space">
                      <span>Load More</span>
                      <span>
                        <AiOutlinePlus />
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className={`col-12 col-lg-4 ${props.hideClass}`}>
              <div className="blog-sidebar">
                <div className="widget category-widget">
                  <h3 style={{ fontWeight: "400" }}>Post Categories</h3>
                  <ul>
                    {loading ? (
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <SkeletonTheme
                            baseColor="#202020"
                            highlightColor="#444"
                         key={index} >
                            <p>
                              <Skeleton animation="gradientPulse" />
                            </p>
                          </SkeletonTheme>
                        ))}
                      </div>
                    ) : (
                      objectsWithUniqueCats.map((blog) => {
                        if (blog?.attributes?.Articles?.data?.length !== 0) {
                          return (
                            <li key={blog?.id}>
                              <Link
                                onClick={ClickHandler}
                                to={`/blog/category/${blog?.attributes?.Slug}`}
                              >
                                {truncate(blog.attributes.Title, 40)}
                            
                              </Link>
                            </li>
                          );
                        }
                        return null;
                      })
                    )}
                  </ul>
                </div>
                <div className="widget recent-post-widget">
                  <h3 style={{ fontWeight: "400" }}>Latest Post</h3>
                  {loading
                    ? [...Array(5)].map((_, index) => (
                        <ShimmerCategoryItem
                          hasImage
                          imageType="thumbnail"
                          imageWidth={80}
                          imageHeight={80}
                          title
                          key={index}
                          className={"coloring"}
                        />
                      ))
                    : latest.slice(0, 5).map((blog, bitem) => (
                        <div className="posts" key={bitem}>
                          <div className="post">
                            <div
                              className="img-holder"
                              style={{ wordBreak: "break-word" }}
                            >
                              <img
                                src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.formats?.thumbnail?.url}`}
                                alt={
                                  blog?.attributes?.Image.data[0].attributes.name
                                    .replace(/\.[^.]+$/, "")
                                    .slice(0, 20) + "..."
                                }
                                onError={(e) => {
                                  e.target.src = `${NoImge}`;
                                  e.target.classList.add("error-image");
                                }}
                              />
                            </div>
                            <div className="details">
                              <i
                                className="fi flaticon-calendar"
                                style={{ fontSize: "13px", marginRight: "3px" }}
                              ></i>
                              <span className="date">
                                {new Date(
                                  blog?.attributes?.createdAt
                                ).toLocaleDateString("en-GB")}{" "}
                              </span>
                              <h4>
                                <Link
                                  onClick={ClickHandler}
                                  to={`/highlight-single/${blog?.attributes?.Slug}`}
                                >
                                  <span className="cutofftext">
                                    {" "}
                                    {blog.attributes.Title}
                                  </span>
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
                <div className="widget tag-widget">
                  <h3 style={{ fontWeight: "400" }}>Tags</h3>
                  <ul className="highlightedTag">
                    {loading ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {" "}
                          <ShimmerButton size="sm" className={"coloring"} />
                          <ShimmerButton size="sm" className={"coloring"} />
                        </div>{" "}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {" "}
                          <ShimmerButton size="sm" className={"coloring"} />
                          <ShimmerButton size="sm" className={"coloring"} />
                        </div>{" "}
                      </div>
                    ) : (
                      objectsWithUniqueTags.map((blog) => (
                        <li key={blog.id}>
                          <Link
                            onClick={ClickHandler}
                            to={`/blog/tag/${blog?.attributes?.Tag}`}
                          >
                            {blog.attributes.Tag}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HighlightsNews;
