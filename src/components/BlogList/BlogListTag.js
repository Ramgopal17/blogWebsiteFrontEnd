import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import NoImage from "../../images/noImage.jpg";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import globalEnv from "../../api/globalenv";
import { AiOutlinePlus } from "react-icons/ai";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "./BlogList.css";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

function countWords(str) {
  return str?.trim().split(/\s+/).length ?? 0;
}

const BlogListTag = ({ slug, blRight = "" }) => {
  const [articles, setArticles] = useState([]);
  const [visibleItems, setVisibleItems] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Tag][$eq]=${encodeURIComponent(
            slug
          )}&filters[Archived][$eq]=false&populate=*`
        );
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const propsToPass = {
    prop1: slug,
  };

  const totalItems = articles.length;

  const currentArticles = useMemo(() => {
    return articles
      .sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt))
      .slice(0, visibleItems);
  }, [articles, visibleItems]);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => {
      const newVisibleItems = prevVisibleItems + 2;
      if (newVisibleItems >= totalItems) {
        return totalItems;
      }
      return newVisibleItems;
    });
  };

  return (
    <section className="wpo-blog-pg-section pt-25 pb-25">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${blRight}`}>
            <div className="wpo-blog-content">
              {loading ? (
                <div>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="col-lg-12 rounded-8">
                      <ShimmerThumbnail height={300} rounded className="coloring" />
                      <p>
                        <span id="desc">
                          <span className="line shimmer"></span>
                          <span className="line shimmer"></span>
                          <span className="line shimmer"></span>
                          <span className="line shimmer"></span>
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                currentArticles.map((blog) => (
                  <div className={`post ${blog.blClass} wpo-blog-single-section`} key={blog.id}>
                    <div className="entry-media video-holder" style={entryMediaStyle}>
                      <img
                        src={`${globalEnv.api}${blog.attributes.Image.data[0].attributes.url}`}
                        alt={
                          blog.attributes?.Image.data[0].attributes.name
                            ?.replace(/\.[^.]+$/, "")
                            ?.slice(0, 30) + "..."
                        }
                        className="imageProps"
                        onError={(e) => {
                          e.target.src = NoImage;
                          e.target.classList.add("error-image");
                        }}
                      />
                    </div>
                    <div className="entry-meta">
                      <ul>
                        {blog.attributes?.Author?.data[0]?.attributes?.fullname && (
                          <li>
                            <i className="fi flaticon-user"></i> By {blog.attributes.Author.data[0].attributes.fullname}
                          </li>
                        )}
                        <li>
                          <i className="fi flaticon-calendar"></i>{" "}
                          {new Date(blog.attributes.createdAt).toLocaleDateString("en-GB")}
                        </li>
                        <li>
                          <i className="fa-regular fa-clock"></i>&nbsp;
                          {Math.ceil(countWords(blog.attributes.Description) / 200)} min read
                        </li>
                      </ul>
                    </div>
                    <h2>{blog.attributes.Title}</h2>
                    <div className="entry-details">
                      <div className="custom-list">
                        <div className="listing" id="cutoffText1">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                blog.attributes?.Description.replace(
                                  /src="(\/[^"]+)"/g,
                                  (match, src) =>
                                    src.startsWith("http") ? match : `src="${globalEnv.api}${src}"`
                                ) || "...",
                            }}
                          ></div>
                        </div>
                      </div>
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/tag/${blog.attributes.Slug}`}
                        state={propsToPass}
                        className="read-more"
                      >
                        READ MORE...
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pagination-wrapper">
              {visibleItems < totalItems && (
                <div className="loadMoreDiv pt-istop-btn-wrapper text-center mt-10">
                  <button className="tp-common-btn text-center" onClick={loadMoreItems}>
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
          </div>
          <BlogSidebar blLeft={blRight} />
        </div>
      </div>
    </section>
  );
};

const entryMediaStyle = {
  width: "100%",
  maxWidth: "100%",
  height: "auto",
  overflow: "hidden",
  borderRadius: "10px",
};

export default BlogListTag;
