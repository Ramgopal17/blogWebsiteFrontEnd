function googleTranslateElementInit() {
  if (window && window.google && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  } else {
    console.error("google_translate_element initialization failed");
  }
}

export function translateLanguage(e) {
  try {
    

  googleTranslateElementInit();
  var frame = document.querySelector(".VIpgJd-ZVi9od-xl07Ob-OEVmcd");
  if (!frame) {
    console.error("Error: Could not find Google translate frame.");
  }else{

  var spans = frame.contentDocument.querySelectorAll(
    ".VIpgJd-ZVi9od-vH1Gmf-ibnC6b span.text"
  );

  localStorage.setItem("currentLang", e);

 
  for (var i = 0; i < spans.length; i++) {
   
    if (spans[i].textContent.includes(e)) {
    
      spans[i].click();
      spans[i].click();
    
    }
  }
}
} catch (error) {
    console.log("first error", error);
}
}
