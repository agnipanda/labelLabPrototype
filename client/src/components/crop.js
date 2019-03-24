import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

class Crop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            label:null,
            file:null,
            display:"none",
          crop: {
            width: 50,
            x: 0,
            y: 0,
          },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        if(this.props.currentImage === ''){
            this.setState({
                file:null
            })
        }
    }

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
      await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
    }
  getCroppedImg(image, pixelCrop, fileName) {
      let downloadedImg = new Image();
      downloadedImg.crossOrigin = "Anonymous";
      let imgUrl = image.src;
      downloadedImg.src = imgUrl;
    const canvas = document.getElementById('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    if(downloadedImg.naturalWidth !== 0){
        ctx.drawImage(
          downloadedImg,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height,
        );
        var dataURL = canvas.toDataURL('image.jpg');
        var blobBin = atob(dataURL.split(',')[1]);
        var array = [];
        for(var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        var blob = new Blob([new Uint8Array(array)], {type: 'image/jpg'});
        var file = new File([blob], 'image.jpg', {type: 'multipart/form-data', lastModified: Date.now()});
        this.setState({
            file:file,
            display:"block"
        });
    }
    else{
        (async () => {
            await this.delay(1000);
            this.getCroppedImg(image, pixelCrop, fileName)
        })();
    }
  }
  handleChange(e){
      e.preventDefault();
      this.setState({label:e.target.value});
  }
  handleSubmit(e){
      e.preventDefault();
      var formData = new FormData();
      formData.append("files", this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:8000/uploads/"+this.state.label,formData,config)
          .then((response) => {
              console.log(response);
          }).catch((error) => {
              console.log(error);
      });
  }
  handleDelete(e){
      e.preventDefault();
      var name = this.props.currentImage;
      name = name.split('/');
      name = name[name.length-1];
      name = {"name":name}
      axios.post("http://localhost:8000/delete",name)
      .then((response) => {
          console.log(response);
      }).catch((error) => {
          console.log(error);
      })
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
  }
  render() {
    const { crop } = this.state;

    return (
      <div className="ui large image" style={{float:"left",display:this.props.display}}>
          <ReactCrop
            crossOrigin="Anonymous"
            src={this.props.currentImage}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />

          <canvas className="ui medium image" id="canvas" crossOrigin="Anonymous"></canvas>
          <form onSubmit={this.handleSubmit}>
              <input id="file" type="hidden" style={{display:"none"}}/>
            <input type="text" onChange={this.handleChange} style={{display:this.state.display}}/>
            <button type="submit" style={{display:this.state.display}}>Upload</button>
          </form>
          <form onSubmit={this.handleDelete}>
            <button type="submit" style={{display:this.state.display}}>Delete Current Image</button>
          </form>
      </div>
    );
  }
}

export default Crop;
