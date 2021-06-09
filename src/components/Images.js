import React, { useState, useEffect } from "react";

import Gallery from "react-photo-gallery";

import Viewer from "react-viewer";

import axios from "axios";
const API_GET_SBS = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures";
const API_GET_TST = "https://tsmiscwebapi.azurewebsites.net/api/timesheet/GetTimesheetPictures";

function Images(){
	const [images, setImages] = useState([]);
	const [display, setDisplay] = useState("Please click on a photo to view");

	const handlePhotoClick = (event, obj) => {
		setDisplay(obj.index)
	}

	// Retrieves images from API on load
	useEffect(() => {
		// Parse URL
		let search = window.location.search;	// ?app={type}&p1={id}
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
					width: 2,
					height: 1,
				})
			})
			
			setImages(apiImages);
		})

	}, [])
	
	return(
		<div className="container">
			<div className="sidebar">
				<h1>Images</h1>
				
				{/* Only show gallery if there are images */}
				{(images.length !== 0)
					? ( <Gallery photos={images}
						columns={1}
						direction={"column"}
						onClick={handlePhotoClick}/>
						
						)
					: (<></>) }
					
			</div>
			
			
			<div className="main">
				<h1>{display}</h1>
				{(images.length !== 0)
				? (
					<Viewer
						visible={true}
						images={images}
						zoomable={false}
						scalable={false}
						noImgDetails={true}
						noClose={true}
						changeable={false}
						zoomSpeed={0.75}
						minScale={1}
						
						container={document.querySelector(".main")}/>
				)
				: (<></>)}

			</div>
		</div>
	)
}

export default Images;