import Button from "@material-ui/core/Button";

function GridView(props){
    // TODO Rerendering ListView makes react-viewer go full screen
    // Force refreshing works but is a workaround
    const refreshPage = () => {
        window.location.reload(false);
    }
    
    return(
        <div className="page-container">
            <Button variant="contained" onClick={refreshPage}>List View</Button>
        </div>
    )
}

export default GridView;