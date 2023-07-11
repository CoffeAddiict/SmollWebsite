import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [catPhotos, setCatPhotos] = useState<UnsplashPhoto[]>([])

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

    return (
        <div className="App">
            <h1>Cat Photos</h1>
            <div className="cat-grid">
                {catPhotos.map(photo => (
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
