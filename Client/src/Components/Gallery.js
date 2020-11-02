import React,{useState, useEffect} from 'react'
import ImageGallery from 'react-image-gallery';

function Gallery(props) {
    const [images, setImages] = useState([]);

    useEffect(()=>{
        let imgGallery = [];
        props.image && props.image.map((item,index)=>(
            imgGallery.push({
                original: `https://serene-plateau-16661.herokuapp.com/ ${item}`,
                thumbnail: `https://serene-plateau-16661.herokuapp.com/ ${item}`,
            })
        ))
        setImages(imgGallery);
        console.log('imgGallery',imgGallery)
    }
    ,[props.image])

    return (
        <div>
            <ImageGallery items={images}/>
            {console.log('images',images)}
        </div>
    )
}

export default Gallery
