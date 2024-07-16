import React, { useState } from "react";
import { Card, FormField, Loader } from "../components";
import axios from "axios";

const RenderCards = ({ data }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post.id} {...post} />);
  }
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const sendImage = async () => {
    setLoading(true);
    console.log(imageData.get("file"));

    try {
      const respons = await axios.post(
        "https://thin-toes-shop.loca.lt/process_images",
        imageData
      );
      console.log(respons);
      if (respons.status === 200) {
        pollGeneratedImage();
      } else {
        console.log("not success");
      }
    } catch (err) {
      console.log("errr" + err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const pollGeneratedImage = async () => {
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await axios.get(
          "https://thin-toes-shop.loca.lt/get_images"
        );
        if (response.status === 200) {
          console.log("Generated image is ready");
          console.log(response.data);
          setSearchedResults(response.data);
          setLoading(false);
        } else if (attempts < 10) {
          attempts++;
          setTimeout(poll, 2000);
        } else {
          console.log(
            "Failed to get generated image within the timeout period"
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Error polling for generated image: ", err);
        setLoading(false);
      }
    };

    poll();
  };

  const handleChange = (e) => {
    if (e.target.type === "text") {
      setSearchText(e.target.value);
    } else if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        setSearchedResults(null);
        const imageData = new FormData();
        imageData.append("file", file);
        setImageData(imageData);
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          The Pexels API enables programmatic access to the full Pexels content
          library, including photos, videos. All content is available free of
          charge, and you are welcome to use Pexels content for anything you'd
          like.
        </p>
      </div>

      <div className="mt-16">
        <div className="flex bg-[#EcECF8] p-2">
          <label
            htmlFor="file_input"
            className="flex-col p-2 items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <svg
              className="w-10 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm8 7h-3v3a1 1 0 11-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 112 0v2h3a1 1 0 010 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-sm text-gray-800">Click to upload</p>
            <input
              id="file_input"
              type="file"
              className="hidden"
              name="file"
              onChange={handleChange}
            />
          </label>
          <div className="flex-1 m-2">
            <FormField
              type="text"
              name="text"
              placeholder="Search something..."
              value={searchText}
              handleChange={handleChange}
            />
          </div>
        </div>
        {uploadedImage && (
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-700">
              Image Preview:
            </h3>
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={sendImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <RenderCards data={searchedResults} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
