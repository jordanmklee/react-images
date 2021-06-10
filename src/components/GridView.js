import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Gallery from "react-photo-gallery";
import Viewer from "react-viewer";

function GridView(props){
	const [viewerIsVisible, setViewerIsVisible] = useState(false);
	const [viewerIndex, setViewerIndex] = useState(0);

	// TODO Rerendering ListView makes react-viewer go full screen
	// Force refreshing works, but is a workaround
	const refreshPage = () => {
		window.location.reload(false);
	}

	// Opens viewer overlap on click
	const handlePhotoClick = (event, obj) => {
		setViewerIndex(obj.index);
		setViewerIsVisible(true);
	}

	// Closes viewer overlap
	const handleViewerClose = (event) => {
		setViewerIsVisible(false);
	}
	

	return(
		<div className="page-container">
			<Container>
				<div className="title">
					<h2>{props.title}</h2>
					<Button variant="contained" onClick={refreshPage}>List View</Button>
				</div>

				<Gallery photos={props.images}
					margin={5}
					onClick={handlePhotoClick}/>

				<Viewer
					images={props.images}
					activeIndex={viewerIndex}
					visible={viewerIsVisible}
					onClose={handleViewerClose}
					onMaskClick={handleViewerClose}
					zoomSpeed={0.75}
					minScale={1}
					zoomable={false}
					scalable={false}
					noImgDetails={true}
					noNavbar={true}
					customToolbar={(toolbars) => {
						return toolbars.filter((button) => {return button.key !== "reset"} )
					}}
					/>	)
			</Container>
		</div>
	)
}

export default GridView;