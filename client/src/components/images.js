import React from 'react'
import axios from 'axios';

class Images extends React.Component {
    constructor(){
        super();
        this.state = {
            labels: ['unlabelled'],
            currentLabel:'unlabelled',
            images: []
        }
        this.handleLabelChange = this.handleLabelChange.bind(this);
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
    }
    render () {
        console.log(this.state.images);
        var currentLabel = this.state.currentLabel;
        var images = this.state.images.map(function(image) {
            return (<img src={"http://localhost:8000/uploads/"+currentLabel+'/'+image} alt="img"/>);
           });
        var labels = this.state.labels.map(function(option) {
            console.log(option);
            return (<option value={option}>{option}</option>);
           });
        return(
            <div>
                <select onChange={this.handleLabelChange}>
                    <option value="">--select--</option>
                    {labels}
                </select>
                <br/>
                <div className="ui small image row" style={{float:"right"}}>
                    {images}
                </div>
            </div>
        )
    }
}

export default Images;
