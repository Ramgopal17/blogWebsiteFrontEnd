import React, { useEffect, useState } from "react";
import { translateLanguage } from "./google-language-selector";
import imggr from "../../../images/german.png";
import imgsp from "../../../images/spain.png";
import imen from "../../../images/english.png";
import imgfr from "../../../images/france.png";
import "./google-picker.css";

function GoogleLangPicker({ classes = "" }) {
  const options = [
    {
      label: "en",
      image: imen,
      language: "English",
    },
    {
      label: "es",
      image: imgsp,
      language: "Spanish",
    },
    {
      label: "de",
      image: imggr,
      language: "German",
    },

    {
      label: "fr",
      image: imgfr,
      language: "French",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    let lang = localStorage.getItem("currentLang");

    window.onload = function () {
      translateLanguage(lang);
    };
    let tempSelected = options.filter((option) => option.language === lang);
    selectOption(tempSelected[0]);
  },[]);

  return (
    <>
      <div className={`dropdownCustom ${classes}`}>
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption ? (
            <img
              src={selectedOption.image}
              alt={selectedOption.label}
              width={20}
              className="dropdown-option-image mr-10"
            />
          ): <img
          src={options[0].image}
          alt={options[0].label}
          width={20}
          className="dropdown-option-image mr-10"
        />}

          <span
            className="dropdown-option-label"
            translate="no"
            style={{ color: "black" }}
          >
            {selectedOption
              ? selectedOption.label
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              : "En"}
          </span>

          <ul
            className={`dropdown-menu-custom ps-0 ${
              isDropdownOpen ? "d-block" : "d-none"
            }`}
          >
            {options.map((option, index) => (
              <li
                className="me-0 d-block"
                key={index}
                onClick={() => {
                  selectOption(option);
                  translateLanguage(option.language);
                }}
                translate="no"
              >
                <img
                  width={20}
                  src={option.image}
                  alt={option.label}
                  className="dropdown-option-image mr-10"
                />
                <span
                  className="dropdown-option-label"
                  style={{ color: "black" }}
                >
                  {option.label
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GoogleLangPicker;





