import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import Gallery from "react-grid-gallery";

import axios from "axios";
const API_GET_PICTURES = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures/";

function Images(){
    const [images, setImages] = useState([]);
    const [searchId, setSearchId] = useState("");

    const updateImages = (id) => {
        axios.get(API_GET_PICTURES
                    + "/" + id
                    + "/10000/1")
            .then(res => {
                let apiImages = [];

                res.data.Data.forEach(img => {
                    apiImages.push({
                        src: img.ImageUrl,

                        original: img.ImageUrl,
                        originalHeight: 800,

                        thumbnail: img.ThumbImageUrl,
                        thumbnailHeight: 100,
                        thumbnailWidth: 100,
                    })
                })

                setImages(apiImages);
            })
    }        
    
    const handleSearchClick = (event) => {
        updateImages(searchId);
    }

    const handleSearchInput = (event) => {
        setSearchId(event.target.value);
    }

    return(
        <>
            <Container>
                <h1>Images</h1>
            </Container>

            <Container className="baseContainer" style={{ textAlign: "center" }}><Paper>
                <div className="inputContainer" style={{ padding: 20 }}>
                    <TextField variant="outlined" size="small"
                        label="Search by ID"
                        onChange={handleSearchInput}/>
                    <Button variant="contained" color="primary" size="large"
                        onClick={handleSearchClick}>
                        <SearchIcon/>
                    </Button>
                </div>
            </Paper></Container>

            {/* Only show gallery if there are images */}
            {(images.length !== 0)
            ? ( 
                {/*
                <Container className="baseContainer">
                    <Paper>
                        <div className="galleryContainer">
                            <ImageGallery items={images}
                                thumbnailPosition="left"
                                showNav={false}
                                showPlayButton={false}
                                showFullscreenButton={false}/>
                        </div>
                        
                    </Paper>
                </Container>
                */},
                <Container className="baseContainer">    
                    <div className="galleryContainer">
                        <Gallery images={images}/>
                    </div>
                </Container>
                )
            : (<></>) }
            
        </>
    )
}

export default Images;