
import React, { useState } from "react";
import axios from "axios";

const initialPosts = [
    {
        id: 1,
        titre: "Titre du premier post",
        description: "Description du premier post",
        image: "url_de_l_image",
    },
    {
        id: 2,
        titre: "Titre du deuxième post",
        description: "Description du deuxième post",
        image: "url_de_l_image",
    },
];

const Home = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [newPost, setNewPost] = useState({
        titre: "",
        description: "",
        image: null, // Changed to accept file object
        category: "", // Nouveau champ pour la catégorie
        id_u: 1 // Replace with the actual user ID
    });

    const addPost = async () => {
        try {
            const formData = new FormData();
            formData.append("titre", newPost.titre);
            formData.append("description", newPost.description);
            formData.append("image", newPost.image);
            formData.append("category", newPost.category);
            formData.append("id_u", newPost.id_u);

            const response = await axios.post('http://localhost/createpost.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const result = response.data;

            if (result.success) {
                setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
                setNewPost({
                    titre: "",
                    description: "",
                    image: null, // Reset image to null
                    category: "", // Réinitialiser la catégorie
                    id_u: 1
                });
            } else {
                console.error("Failed to create post:", result.message);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setNewPost({ ...newPost, image: e.target.files[0] }); // Update image to file object
        } else {
            const { name, value } = e.target;
            setNewPost({ ...newPost, [name]: value });
        }
    };

    return (
        <div className="Posts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {posts.map(post =>
                <div className="Post" key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                    <div className="Images">
                        <img src={post.image} alt="" />
                    </div>
                    <div className="contenu" style={{ padding: '20px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{post.titre}</h2>
                        <p style={{ fontSize: '1rem', color: '#666' }}>{post.description}</p>
                        <button style={{ backgroundColor: '#1976D2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Lire la suite</button>
                    </div>
                </div>
            )}
            <div className="NewPostForm" style={{ gridColumn: '1 / -1', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Ajouter une nouvelle publication</h2>
                <input
                    type="text"
                    name="titre"
                    placeholder="Titre"
                    value={newPost.titre}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newPost.description}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
                />
                <input
                    type="file"  
                    name="image"
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <select
                    name="category"
                    value={newPost.category}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Art">Art</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Cinema">Cinema</option>
                    <option value="Write">Write</option>
                </select>
                <button onClick={addPost} style={{ backgroundColor: '#1976D2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Ajouter une nouvelle publication</button>
            </div>
        </div>
    );
}

export default Home;

