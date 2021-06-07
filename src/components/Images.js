import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

function Images(){
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