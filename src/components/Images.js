import React, { useState, useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import axios from "axios";
const URL = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures/1/10000/1";

function Images(){
    const [images, setImages] = useState([]);
    
    const getImages = (id) => {
        axios.get(URL)
            .then(res => {
                let apiImages = [];

                res.data.Data.forEach(img => {
                    apiImages.push({
                        orignal: img.ImageUrl,
                        thumbnail: img.ThumbImageUrl,
                    })
                })

                setImages(apiImages);
            })
    }

    useEffect(() => {
        getImages();
    }, [])

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <h2>Items</h2>
                </Toolbar>
            </AppBar>

            <Container><Paper>
                <ImageGallery items={images}/>
            </Paper></Container>
        </>
    )
}

export default Images;