import React, { useState } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post.id} {...post} />);
  }
};

const Home = () => {
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${searchText}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Fn6U2vlWBhbPJ8qKc2gYBdCi2hOZD8mDmZJdcWIB0i9HBoRND7UiOfqN",
          },
        }
      );

      if (response.status == 200) {
        const result = await response.json();
        setSearchedResults(result.photos);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
          like
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={fetchPosts}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        {searchText ? (
          <></>
        ) : (
          <h2 className="font-bold text-[#6469ff] text-xl uppercase">
            TYPE AND GENERATE
          </h2>
        )}
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
