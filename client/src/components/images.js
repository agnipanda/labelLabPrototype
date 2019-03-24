import React from 'react'
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
        this.fetchLabel = this.fetchLabel.bind(this);
    }
    fetchLabel(e){
        e.preventDefault();
        axios.post("http://localhost:8000/labels")
        .then((response) => {
            this.setState({
                labels:response.data
            })
        })
    }
    handleLabelChange(e){
        e.preventDefault();
        this.setState({
            currentImage:e.target.value
        })
        var label = e.target.value;
        if(e.target.value !== "null"){
            axios.post("http://localhost:8000/images/"+e.target.value)
                .then((response) => {
                    var array = Object.values(response.data);
                    for (var i = 0; i < array.length; i++) {
                        array[i] = label+'/'+array[i];
                    }
                    this.setState({
                        images:array
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
        }else{
            this.setState({
                images:[],
                currentImage:''
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
            return (<img src={"http://localhost:8000/uploads/"+image} onClick={imageClick} alt="img" height="200px" width="180px" borderWidth=".5"/>);
           });

        var labels = this.state.labels.map(function(option) {
            return (<option value={option}>{option}</option>);
           });
        return(
            <div>
                <select onChange={this.handleLabelChange} onMouseEnter={this.fetchLabel}>
                    <option value="null">--select--</option>
                    {labels}
                </select>
                <br/>
                <Crop currentImage={this.state.currentImage} display={this.state.display} style={{display:this.state.display}}/>
                <div style={{width:"80vh",height:"80vh",overflow:"auto"}}>
                    {images}
                </div>
            </div>
        )
    }
}

export default Images;
