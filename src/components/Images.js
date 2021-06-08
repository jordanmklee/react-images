import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import Gallery from "react-grid-gallery";

import axios from "axios";
const API_GET_SBS = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures";
const API_GET_TST = "https://tsmiscwebapi.azurewebsites.net/api/timesheet/GetTimesheetPictures";

function Images(){
	const [images, setImages] = useState([]);
	
	// Retrieves pictures from API and updates images state array
	useEffect(() => {
		let search = window.location.search;
		let type = search.substring(5, 8);
		let id = search.substring(12);

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

	}, [])
	
	return(
		<>
			<Container className="baseContainer" maxWidth={false}>
				<h1>Images</h1>
			</Container>

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