import React, { useState } from "react";
import generateImage from "../../utils/open-ai/generateImage";
import { Layout } from "antd";
import useCreateImage from "./useCreateImage";
import './CreateImagePage.css';

const CreateImagePage: React.FC = () => {
  const { searchTerm, imageUrls, handleSubmit, handleChange } = useCreateImage();

  return (
    <div className="container">
      <Layout>
        <Layout.Content className="image-container">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              className="image"
            />
          ))}
        </Layout.Content>
        <Layout.Content className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              className="search-bar__input"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <button type="submit" className="search-bar__button">
              Search
            </button>
          </form>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default CreateImagePage;
