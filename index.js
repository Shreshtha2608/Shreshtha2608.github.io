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
  let amount = "more";
  radioBtn.forEach((itm) => {
    if (itm.checked) {
      amount = itm.value;
    }
  });
  let input_text = document.getElementById("input_text").value;
  const apiKey = "ee8cfeca-49f1-4bcb-b061-1f69c9facd98";
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
            amount: "more",
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

assign_title = () => {
  let showLoading = true;
  document.getElementById("output_text_with_heading").innerHTML = "";
  document.getElementById("loader").style.display = "flex";
  let input_text_segmented = document.getElementById(
    "input_text_segmented"
  ).value;
  let child_paras = input_text_segmented.split(/\r?\n|\r/);
  let removeEmptyEntery = child_paras.filter((itm) => itm.length > 0);

  const getPostsAsync = async () => {
    //removeEmptyEntery.forEach(async (itm) => {
    for (i = 0; i < removeEmptyEntery.length; i++) {
      const apiKey = "ee8cfeca-49f1-4bcb-b061-1f69c9facd98";
      const config = {
        method: "POST",
        url: "https://api.oneai.com/api/v0/pipeline",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        data: {
          input: removeEmptyEntery[i],
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
      let response = await axios(config);
      showLoading = false;
      document.getElementById("loader").style.display = "none";
      const parent_element = document.getElementById(
        "output_text_with_heading"
      );
      let output_data = response.data.output[0].labels;

      let listSepArray = removeEmptyEntery[i].split(".");
      listSepArray = listSepArray.filter((i) => i.length > 0);

      const list = document.createElement("ul");
      listSepArray.forEach((text) => {
        const listItem = document.createElement("li");
        const node = document.createTextNode(text + ".");
        listItem.appendChild(node);
        list.appendChild(listItem);
      });

      const headline = document.createElement("h3");
      const headingNode = document.createTextNode(
        titleCase(output_data[0].value)
      );
      headline.appendChild(headingNode);

      parent_element.appendChild(headline);
      parent_element.appendChild(list);
    }
  };

  getPostsAsync();
};

axioscall = async () => {
  let res = await axios(config);
  return res;
};
