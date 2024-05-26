<?php
    // Vérifie si des données ont été envoyées depuis le formulaire
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupère les données envoyées depuis le frontend et les valide (vous devez ajouter la validation appropriée)
        $title = $_POST['title'];
        $category = $_POST['category'];
        $content = $_POST['content'];

        // Connexion à la base de données MySQL (remplacez les valeurs par celles de votre configuration)
        $servername = "localhost";
        $username = "root";
        $password = "aya123"; // Votre mot de passe MySQL
        $dbname = "blogs";

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Vérifie la connexion à la base de données
        if ($conn->connect_error) {
            die("La connexion à la base de données a échoué : " . $conn->connect_error);
        }

        // Requête préparée d'insertion des données dans la table posts
        $sql = "INSERT INTO posts (title, category, content) VALUES (?, ?, ?)";
        
        // Prépare la requête
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            die("Erreur lors de la préparation de la requête : " . $conn->error);
        }

        // Lie les paramètres à la requête
        $stmt->bind_param("sss", $title, $category, $content);

        // Exécute la requête
        if ($stmt->execute()) {
            echo "Nouveau post créé avec succès.";
        } else {
            echo "Erreur lors de la création du post : " . $stmt->error;
        }

        // Ferme la connexion à la base de données
        $stmt->close();
        $conn->close();
    } else {
        // Si aucune donnée n'a été envoyée, renvoyer un message d'erreur
        echo "Aucune donnée reçue depuis le frontend.";
    }
?>
