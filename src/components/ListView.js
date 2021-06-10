import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import Gallery from "react-photo-gallery";
import Viewer from "react-viewer";

function ListView(props){
	const [viewerIndex, setViewerIndex] = useState(0);
    
    // Show large image in viewer when gallery thumbnail clicked
    const handlePhotoClick = (event, obj) => {
        setViewerIndex(obj.index);
    }


    return(
        <div className="page-container">
			<div className="sidebar">
				<div className="sidebar-title">
					<h2>{props.title}</h2>
                    <Button variant="contained" onClick={props.handleChangeView} color="primary">Grid View</Button>
				</div>

				<div className="sidebar-content">
					{/* Only show gallery thumbnails if there are images */}
					{(props.images.length !== 0)
						? 	(	<Gallery photos={props.images}
									columns={1}
									direction={"column"}
									margin={20}
									onClick={handlePhotoClick}/>	)
						:	(<></>)	}
				</div>
			</div>
			
			<div className="viewer-container">
				{/* Only show viewer if there are images */}
				{(props.images.length !== 0)
					?	(	<Viewer
								images={props.images}
								activeIndex={viewerIndex}
								container={document.querySelector(".viewer-container")}
								zoomSpeed={0.75}
								minScale={1}
								visible={true}
								zoomable={false}
								scalable={false}
								noImgDetails={true}
								noClose={true}
								noNavbar={true}
                                customToolbar={(toolbars) => {
                                    return toolbars.filter((button) => {return button.key !== "reset"} )
                                }}
                                />	)
					:	(	<></>	)}
			</div>
		</div>
    )
}

export default ListView;