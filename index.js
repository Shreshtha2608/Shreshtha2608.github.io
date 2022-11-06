// // Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=Jmri27

// const axios = require("axios");
submitFun = () => {
  let showLoading = true;
  document.getElementById("loader").style.display = "flex";
  let input_text = document.getElementById("input_text").value;
  const apiKey = "50c07953-d0cd-4d46-90f6-d20038b4cb14";
  const config = {
    method: "POST",
    url: "https://api.oneai.com/api/v0/pipeline",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    data: {
      input: input_text,
      input_type: "article",
      output_type: "json",
      steps: [
        {
          skill: "dialogue-segmentation",
        },
      ],
    },
  };
  axios(config)
    .then((response) => {
      showLoading = false;
      //if (showLoading) {
      document.getElementById("loader").style.display = "none";
      //}
      console.log(JSON.stringify(response.data));
      const parent_element = document.getElementById("output_text");
      parent_element.innerText = "";
      let output_data = response.data.output[0].labels;
      output_data.forEach((element) => {
        const para = document.createElement("p");
        const node = document.createTextNode(element.span_text);
        para.appendChild(node);

        const parent_element = document.getElementById("output_text");
        parent_element.appendChild(para);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
