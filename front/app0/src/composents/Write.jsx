import React, { useState } from 'react';
import axios from 'axios';

const Write = () => {
    // États pour stocker les données du formulaire
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Créer un objet contenant les données du post
        const postData = {
            title: title,
            category: category,
            content: content
        };

        try {
            // Envoyer les données du post au backend
            const response = await axios.post('URL_du_backend/write.php', postData);
            console.log(response.data); // Afficher la réponse du backend
            // Réinitialiser les champs du formulaire après la soumission réussie
            setTitle('');
            setCategory('');
            setContent('');
        } catch (error) {
            console.error('Erreur lors de la soumission du post :', error);
        }
    };

    return (
        <div>
            <h2>Écrire un nouveau post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Catégorie :</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Contenu :</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Publier</button>
            </form>
        </div>
    );
};

export default Write;
