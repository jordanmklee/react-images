import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import axios from "axios";
const API_GET_PICTURES = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures/";

function Images(){
    const [images, setImages] = useState([]);
    
    const getImages = (id) => {
        axios.get(API_GET_PICTURES
                    + "/" + id
                    + "/10000/1")
            .then(res => {
                let apiImages = [];

                res.data.Data.forEach(img => {
                    apiImages.push({
                        original: img.ImageUrl,
                        originalHeight: 400,

                        thumbnail: img.ThumbImageUrl,
                        thumbnailHeight: 100,
                        thumbnailWidth: 100,
                    })
                })

                setImages(apiImages);
            })
    }        
    
    useEffect(() => {
        getImages(2);
    }, [])

    return(
        <>
            <Container>
                <h1>Images</h1>
            </Container>

            <Container className="baseContainer" style={{ textAlign: "center" }}><Paper>
                <div className="inputContainer" style={{ alignItems: "center" }}>
                    <TextField variant="outlined" size="small" label="Search by ID"></TextField>
                    <Button variant="contained" color="primary"><SearchIcon/></Button>
                </div>
            </Paper></Container>

            <Container className="baseContainer"><Paper>
                <div style={{ padding: 30 }}>
                <ImageGallery items={images}/>
                </div>
            </Paper></Container>
        </>
    )
}

export default Images;