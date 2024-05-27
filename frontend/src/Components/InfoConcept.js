import React, { useEffect } from 'react';
import '../styles/concept.scss';
import { Paper, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    width: '700px',
    alignItems: 'center',
    borderRadius: '20px',
    padding: '30px',        // Ajout de padding pour une meilleure apparence
    lineHeight: '2',
    fontSize: '1.1rem'
}));

function InfoConcept() {

    useEffect(() => {
        // Ajoute la classe 'concept-page' au body
        document.body.classList.add('concept-page');

        const onMouseWheel = (e) => {
            e.preventDefault();
            var wheelDistance = e.detail ? -e.detail / 3 : e.wheelDelta / 120;
            window.scrollBy(-wheelDistance * 100, 0);
        };

        window.addEventListener('mousewheel', onMouseWheel);
        window.addEventListener('DOMMouseScroll', onMouseWheel);

        // Nettoie les événements et retire la classe 'concept-page' lors du démontage
        return () => {
            document.body.classList.remove('concept-page');
            window.removeEventListener('mousewheel', onMouseWheel);
            window.removeEventListener('DOMMouseScroll', onMouseWheel);
        };
    }, []);

    return (
        <div className="container">
            <div className="partie1">
                <Item elevation={24}>
                    Bienvenue sur Arocse, une boutique en ligne nouvelle génération qui va vous permettre d’avoir
                    accès à un grand choix de meubles modernes et tendances, du canapé design aux rangements
                    pratiques. La création de votre profil sécurisé directement sur notre site va vous permettre de
                    naviguer et mettre vos articles favoris dans votre panier de rêve. Alors laissez place à votre
                    imagination et profitez de moments d’évasion sur Arocse.
                </Item>
            </div>
            <div className="partie2">
                <Item elevation={24}>
                    La page principale Home sert d’exposition des produits en vente avec des filtres disponibles pour les
                    différentes catégories. En cliquant sur un produit exposé, vous aurez accès à une page donnant de
                    plus grandes informations avec des détails et des photos des meubles dans différentes configuration
                    et bien évidemment la possibilité d’ajouter le produit à votre panier.
                    <br></br>
                    <br></br>
                    Marre de chercher votre meuble en le tournant dans tous les sens pour lui trouver une place dans
                    votre chez-vous ? Chez Arocse, on a la solution pour rendre votre rendre expérience d'achat plus
                    ludique et agréable : “Arocsnake”
                    . Je pense que vous connaissez tous les règles de ce jeu, c’est très
                    simple : le but est d’avoir le plus de points sachant que pour en gagner, vous devez faire manger des
                    fruits à votre serpent. Attention à ne pas toucher les bords du plateau ou le propre corps du serpent
                    qui grandi proportionnellement aux fruits mangés, sinon vous perdez ! La spécificité de ce jeu est au
                    niveau du leaderboard où les 10 meilleurs scores de tous les temps vont être affichés. Si vous êtes
                    connectés, votre nom va être proposé par default lors de l’enregistrement de votre score mais vous
                    avez la possibilité de le personnalisé. Si vous n’êtes pas connecté, vous allez quand même avoir la
                    possibilité d’enregistrer votre score et apparaitre dans le leaderboard avec le nom de votre choix.
                    Nous avons également proposé ce jeu très divertissant pour proposer des réductions lors de
                    concours que l’on va organiser dans le future, alors préparer-vous, entrainez-vous et vous recevrez de
                    nombreux avantages sur vos meubles favoris.
                </Item>
            </div>
            <div className="partie3">
                <Item elevation={24}>
                    En parlant de connexion, si vous voulez avoir accès à vos informations personnelles ainsi que votre
                    historique des points gagnés au fameux jeu “Arocsnake” dans la page profil, vous êtes invité à vous
                    connecté si cela n’est pas fait. Si c’est votre première visite sur notre site, vous êtes la bienvenue et
                    vous avez la possibilité de créer un compte sécurisé dans la page register (aucune information
                    personnelle ne sera partagé).
                    <br></br>
                    <br></br>
                    Enfin, vous pouvez voir tous les articles que vous avez ajoutés à votre panier dans la page Cart. Ceux-
                    ci seront placés à gauche et un récapitulatif des produits avec leurs prix et le prix total sur la droite
                    ainsi que la possibilité de passer la commande en cliquant sur le bouton “Commander”. Cette page
                    est accessible depuis toutes les pages à partir de la barre de navigation et un bouton est directement
                    accessible depuis les pages de détails de chaque produit. Vous voulez directement avoir plus
                    d’information sur les produits de votre panier ? Pas de soucis, il vous suffit de cliquer sur l’image de
                    votre article depuis votre panier, vous serez alors redirigé vers les détails du produit.
                </Item>
            </div>
        </div>
    );
}

export default InfoConcept;