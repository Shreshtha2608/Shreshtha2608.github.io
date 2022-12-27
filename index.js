//Titlecase sentence
function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    if (sentence[i].length < 4 && i !== 0) {
      sentence[i] = sentence[i];
    } else {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
  }
  let updatedString = sentence.join(" ");
  return updatedString;
}

// // Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=Jmri27

// const axios = require("axios");
submitFun = () => {
  let showLoading = true;
  document.getElementById("loader").style.display = "flex";
  let radioBtn = document.getElementsByName("amount");
  console.log("radioBtn", radioBtn);
  let amount = "more";
  radioBtn.forEach((itm) => {
    if (itm.checked) {
      console.log("itm", itm.value);
      amount = itm.value;
    }
  });
  console.log(amount);
  let input_text = document.getElementById("input_text").value;
  const apiKey = "13dad5b2-4ba6-4326-86ad-9d98cfa76468";
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
          params: {
            amount: amount,
          },
        },
      ],
    },
  };
  axios(config)
    .then((response) => {
      showLoading = false;
      document.getElementById("loader").style.display = "none";
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

onSegmentationClick = () => {
  console.log("segment");
};

onTitleAssignmentClick = async () => {
  console.log("assignment");
  window.location.href = "./title-assignment.html";
};

assign_title = async () => {
  let showLoading = true;
  document.getElementById("output_text_with_heading").innerHTML = "";
  document.getElementById("loader").style.display = "flex";
  let input_text_segmented = document.getElementById(
    "input_text_segmented"
  ).value;
  let child_paras = input_text_segmented.split(/\r?\n|\r/);
  let removeEmptyEntery = child_paras.filter((itm) => itm.length > 0);
  console.log("input_text_segmented", removeEmptyEntery);

  removeEmptyEntery.forEach((itm) => {
    const apiKey = "09f93eab-9846-4a0d-b866-5203d363d13d";
    const config = {
      method: "POST",
      url: "https://api.oneai.com/api/v0/pipeline",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      data: {
        input: itm,
        input_type: "article",
        output_type: "json",
        steps: [
          {
            skill: "headline",
          },
          {
            skill: "subheading",
          },
        ],
      },
    };
    // let res = await axios(config)
    //   .then((response) => {
    //     showLoading = false;
    //     console.log("response", response);
    //     document.getElementById("loader").style.display = "none";
    //     //console.log(JSON.stringify(response));
    //     const parent_element = document.getElementById(
    //       "output_text_with_heading"
    //     );
    //     let output_data = response.data.output[0].labels;
    //     const para = document.createElement("p");
    //     const node = document.createTextNode(itm);
    //     para.appendChild(node);

    //     const headline = document.createElement("h3");
    //     const headingNode = document.createTextNode(
    //       titleCase(output_data[0].value)
    //     );
    //     headline.appendChild(headingNode);

    //     const subHeading = document.createElement("h3");
    //     const subHeadingNode = document.createTextNode(
    //       titleCase(output_data[1].value)
    //     );
    //     subHeading.appendChild(subHeadingNode);

    //     parent_element.appendChild(headline);
    //     parent_element.appendChild(subHeading);
    //     parent_element.appendChild(para);
    //   })

    axios.catch((error) => {
      console.log(error);
    });
  });
};

axioscall = async () => {
  let res = await axios(config);
  return res;
};
