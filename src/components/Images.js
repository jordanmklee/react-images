import React, { useState, useEffect } from "react";

import Gallery from "react-photo-gallery";
import Viewer from "react-viewer";

import axios from "axios";
const API_GET_SBS = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures";
const API_GET_TST = "https://tsmiscwebapi.azurewebsites.net/api/timesheet/GetTimesheetPictures";

function Images(){
	const [images, setImages] = useState([]);
	const [title, setTitle] = useState("");
	const [viewerIndex, setViewerIndex] = useState(0);


	// Show large image in viewer when gallery thumbnail clicked
	const handlePhotoClick = (event, obj) => {
		setViewerIndex(obj.index);
	}


	// Retrieves images from API on load
	useEffect(() => {
		// Parse URL
		let search = window.location.search;	// ?app={type}&p1={id}
		let type = search.substring(5, 8);
		let id = search.substring(12);

		setTitle(type + " - " + id);

		axios.get((type === "SBS" ? API_GET_SBS : API_GET_TST)
		+ "/" + id
		+ "/10000/1")
		.then(res => {
			let apiImages = [];
			
			res.data.Data.forEach(pic => {
				// Image object to retrieve dimensions
				let img = new Image();
				img.src = pic.ImageUrl;

				apiImages.push({
					src: pic.ImageUrl,
					width: img.naturalWidth,
					height: img.naturalHeight,
				})
			})
			
			setImages(apiImages);
		})
	}, [])
	
	return(
		<div className="page-container">
			<div className="sidebar">
				<div className="sidebar-title">
					<h2>{title}</h2>
				</div>
				{/* Only show gallery if there are images */}
				{(images.length !== 0)
					? 	(	<Gallery photos={images}
								columns={1}
								direction={"column"}
								margin={20}
								onClick={handlePhotoClick}/>	)
					:	(<></>)	}
			</div>
			
			<div className="viewer-container">
				{(images.length !== 0)
					?	(	<Viewer
								images={images}
								activeIndex={viewerIndex}
								container={document.querySelector(".viewer-container")}
								zoomSpeed={0.75}
								minScale={1}
								visible={true}
								zoomable={false}
								scalable={false}
								noImgDetails={true}
								noClose={true}
								changeable={false}
								noNavbar={true}/>	)
					:	(	<></>	)}
			</div>
		</div>
	)
}

export default Images;