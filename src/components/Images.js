import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import Gallery from "react-grid-gallery";

import axios from "axios";
const API_GET_SBS = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures/";
const API_GET_TST = "https://tsmiscwebapi.azurewebsites.net/api/timesheet/GetTimesheetPictures/";

function Images(){
	const [images, setImages] = useState([]);
	const [searchId, setSearchId] = useState("");
	const [type, setType] = useState("SBS");
	
	// Retrieves pictures from API and updates images state array
	const updateImages = (id) => {
		axios.get((type === "SBS" ? API_GET_SBS : API_GET_TST)
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
	
	const handleSearchInput = (event) => {
		setSearchId(event.target.value);
	}
	
	const handleChangeType = (event) => {
		setType(event.target.value);
	}
	
	const handleSearchClick = (event) => {
		updateImages(searchId);
	}
	
	return(
		<>
			<Container className="baseContainer" maxWidth={false}>
				<h1>Images</h1>
			</Container>

			<Container className="baseContainer" style={{ textAlign: "center" }} maxWidth={false}><Paper>
				<div className="inputContainer" style={{ padding: 20 }}>
					<TextField variant="outlined"
						label="Search by ID"
						onChange={handleSearchInput}/>
					
					<Select variant="outlined"
						value={type}
						onChange={handleChangeType}>
						<MenuItem value="SBS">SBS</MenuItem>
						<MenuItem value="TST">TST</MenuItem>
					</Select>
					
					<Button variant="contained" color="primary" size="large"
						onClick={handleSearchClick}>
						<SearchIcon/>
					</Button>
				</div>
			</Paper></Container>

			{/* Only show gallery if there are images */}
			{(images.length !== 0)
			? ( 
				<>
				<Container className="baseContainer" maxWidth={false}>
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
				
				<Container className="baseContainer" maxWidth={false}><Paper>					
					<Gallery images={images}/>
				</Paper></Container>
				</>
				)
			: (<></>) }
			
		</>
	)
}

export default Images;