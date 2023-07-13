import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [catPhotos, setCatPhotos] = useState<UnsplashPhoto[]>([])
    const [numPictures, setNumPictures] = useState(1)

    type UnsplashPhoto = {
        id: string
        urls: {
            regular: string
        }
        alt_description: string
        user: {
            name: string
        }
        likes: number
        created_at: string
    }

    useEffect(() => {
        const fetchCatPhotos = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: 'cat',
                        per_page: 24,
                        orientation: 'landscape',
                    },
                    headers: {
                        Authorization: 'Client-ID fUiad7XErFJnIaD_ywzEzkQjGlyf49CDGUZuYzCAwhE',
                    },
                })
                setCatPhotos(response.data.results)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCatPhotos()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            let numPictures
            if (screenWidth >= 1024) {
                numPictures = 3
            } else if (screenWidth >= 768) {
                numPictures = 2
            } else {
                numPictures = 1
            }
            setNumPictures(numPictures)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="App">
            <h1>Cat Photos</h1>
            <div className={`cat-grid cat-grid-${numPictures}`}>
                {catPhotos.map((photo: UnsplashPhoto) => (
                    <div key={photo.id} className="cat-photo-container">
                        <img src={photo.urls.regular} alt={photo.alt_description} />
                        <div className="photo-info">
                            <h4>
                                Username: {photo.user.name} - Likes: {photo.likes}
                            </h4>
                            <p>{photo.alt_description}</p>
                            <p>Created at: {photo.created_at}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
