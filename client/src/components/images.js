import React, { PureComponent } from 'react'
import axios from 'axios';
import Crop from './crop';

class Images extends React.Component {
    constructor(){
        super();
        this.state = {
            labels: ['unlabelled'],
            currentLabel:'unlabelled',
            images: [],
            currentImage:'',
            display:"none",
            crop:''
        }
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.imageClick = this.imageClick.bind(this);
    }

    handleLabelChange(e){
        e.preventDefault();
        axios.post("http://localhost:8000/images/"+this.state.currentLabel)
            .then((response) => {
                this.setState({
                    images:Object.values(response.data)
                })
            }).catch((error) => {
        });
        if(e.target.value === 'unlabelled'){
            this.setState({
                display:"block"
            })
        }
        else{
            this.setState({
                display:"none"
            })
        }
    }
    imageClick(e){
        this.setState({
            currentImage:e.target.src
        })
    }
    render () {
        var currentLabel = this.state.currentLabel;
        var imageClick = this.imageClick
        var images = this.state.images.map(function(image) {
            return (<img src={"http://localhost:8000/uploads/"+currentLabel+'/'+image} onClick={imageClick} alt="img" height="200px" width="180px"/>);
           });

        var labels = this.state.labels.map(function(option) {
            return (<option value={option}>{option}</option>);
           });
        return(
            <div>
                <select onChange={this.handleLabelChange}>
                    <option value="">--select--</option>
                    {labels}
                </select>
                <br/>
                <Crop currentImage={this.state.currentImage} style={{display:this.state.display}}/>
                <div style={{width:"80vh",height:"80vh",overflow:"auto"}}>
                    {images}
                </div>
            </div>
        )
    }
}

export default Images;
