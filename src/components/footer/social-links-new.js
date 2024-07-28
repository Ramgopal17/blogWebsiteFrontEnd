import React from "react";
// social_links
const social_links = [
  {
    link: "https://www.facebook.com/metapercepttechservices/",
    target: "_blank",
    rel: "noreferrer",
    icon: "fab fa-facebook-f",
    name: "Facebook",
    backColor: "rgb(50,77,160)",
    img: "/assets/img/footer/facebook.png",
  },
  {
    link: "https://twitter.com/MetaPercept",
    target: "_blank",
    icon: "fa-brands fa-x-twitter",
    rel: "noreferrer",
    name: "Twitter",
    backColor: "#656565",
    img: "/assets/img/footer/twitter.png",
  },
  {
    link: "https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/",
    target: "_blank",
    icon: "fa-brands fa-linkedin-in",
    rel: "noreferrer",
    name: "linkedin",
    backColor: "rgb(244,127,32)",
    img: "/assets/img/footer/linkedin.png",
  },
  {
    link: "https://blog.metapercept.com/",
    target: "_blank",
    icon: "fa-solid fa-blog",
    name: "blogs",
    rel: "noreferrer",
    backColor: "rgb(252,183,19)",
    img: "/assets/img/footer/media.png",
  },
];

const SocialLinks = () => {
  <style jsx="true">
  {`
    .socialLinkParent {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }
    .socialLinkParent > * {
      width: 50%;
      flex-shrink: 0;
    }
    @media (max-width: 768px) {
      .socialLinkParent {
        gap: 10px;
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `}
</style>
  return (
    <>
         <div className="socialLinkParent">
        {social_links.map((item, i) => (
          <div key={i} className="">
            <a
              key={i}
              target="_blank"
              href={item.link}
              style={{ backgroundColor: item.backColor, color: "whitesmoke" }}
              aria-label={item.name}
              rel="noreferrer"
            >
              <i className={item.icon}></i>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;

