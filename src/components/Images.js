import React, { useState, useEffect } from "react";

import GridView from "./GridView";
import ListView from "./ListView";

import axios from "axios";
const API_GET_SBS = "https://tsmiscwebapi.azurewebsites.net/api/qb/GetSBSIFPictures";
const API_GET_TST = "https://tsmiscwebapi.azurewebsites.net/api/timesheet/GetTimesheetPictures";

function Images(){
	const [images, setImages] = useState([]);
	const [title, setTitle] = useState("");
	const [gridView, setGridView] = useState(false);

	// Changes from list view (default) to grid view
	const handleChangeView = (event) => {
		setGridView(!gridView);
	}
	
	// Retrieves images from API on load
	useEffect(() => {
		// Parse URL
		let search = window.location.search;	// ?app={type}&p1={id}
		let type = search.substring(5, 8);
		let id = search.substring(12);

		setTitle(type + " - " + id);

		// API Get images
		axios.get((type === "SBS" ? API_GET_SBS : API_GET_TST)
		+ "/" + id
		+ "/10000/1")
		.then(res => {
			let apiImages = [];
			
			res.data.Data.forEach(pic => {
				// Image object used to retrieve dimensions (for Gallery thumbnail aspect ratio rendering)
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
		(gridView)
			? <GridView title={title} images={images}/>
			: <ListView title={title} images={images} handleChangeView={handleChangeView}/>
	)
}

export default Images;