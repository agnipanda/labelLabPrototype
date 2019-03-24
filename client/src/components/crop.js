import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Crop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          src: null,
          crop: {
            width: 50,
            x: 0,
            y: 0,
          },
        };
        console.log(this.props.currentImage);
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
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.getElementById('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="ui large image" style={{float:"left"}}>
          <ReactCrop
            src={this.props.currentImage}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
      <canvas className="ui medium image" id="canvas" crossOrigin="anonymous"></canvas>
      </div>
    );
  }
}

export default Crop;
