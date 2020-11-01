import React,{useState, useEffect} from 'react'
import ImageGallery from 'react-image-gallery';

function Gallery(props) {
    const [images, setImages] = useState([]);

    useEffect(()=>{
        let imgGallery = [];
        props.image && props.image.map((item,index)=>{
            imgGallery.push({
                original: `http://localhost:5000/${item}`,
                thumbnail: `http://localhost:5000/${item}`,
            })
        })
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
