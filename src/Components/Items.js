import { Button, Card, CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, ThemeProvider, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { FilterList } from '@mui/icons-material';
import '../styles/_settings.scss';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#0a84ff' : '#007bff',
    height: 5,
    padding: '15px 0',
    width: '150px',
    marginRight: '50px',
    transform: 'scale(0.8)',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
        '&:before': {
            boxShadow:
                '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&::before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 5,
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        boxShadow: 'inset 0px 0px 4px -2px #000',
        backgroundColor: '#d0d0d0',
    },
}));

const Items = () => {
    const [rangeValue, setRangeValue] = useState(12)
    const [selectedRadio, setSelectedRadio] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                const response = await axios.get('http://arocseback.cluster-ig3.igpolytech.fr/api/items');
                console.log("data response : ", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        fetchProducts();
    }, []);


    const handleCardClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };


    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginTop: '100px' }}>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Button startIcon={<FilterList />} onClick={() => setShowFilters(!showFilters)} size='small' color='color1'>
                            Filtres
                        </Button>
                        {showFilters && (
                            <Card style={{ marginTop: '17.5px', borderRadius: '25px' }} >
                                <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '0' }}>
                                    <IOSSlider aria-label="slide rangeValue" defaultValue={12} valueLabelDisplay="on" onChange={(e) => setRangeValue(e.target.value)} min={1} max={46} />
                                    {/* <input type="range" min="1" max="46" defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)} style={{ marginRight: '45px' }} /> */}
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ transform: 'scale(0.75)' }}>Catégories</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            onChange={(e) => {
                                                setSelectedRadio(e.target.value);
                                            }}
                                        >
                                            <FormControlLabel value="Canapés"
                                                control={<Radio size='small' style={{ transform: 'scale(0.5)' }} />}
                                                label={<span style={{ transform: 'scale(0.75)', display: 'inline-block' }}>Canapés</span>}
                                                labelPlacement="bottom"
                                                checked={"Canapés" === selectedRadio}
                                                sx={{ marginRight: '0', marginLeft: '0' }} />
                                            <FormControlLabel value="Chaises"
                                                control={<Radio size='small' style={{ transform: 'scale(0.5)' }} />}
                                                label={<span style={{ transform: 'scale(0.75)', display: 'inline-block' }}>Chaises</span>}
                                                labelPlacement="bottom"
                                                checked={"Chaises" === selectedRadio}
                                                sx={{ marginRight: '0', marginLeft: '0' }} />
                                            <FormControlLabel value="Lits"
                                                control={<Radio size='small' style={{ transform: 'scale(0.5)' }} />}
                                                label={<span style={{ transform: 'scale(0.75)', display: 'inline-block' }}>Lits</span>}
                                                labelPlacement="bottom"
                                                checked={"Lits" === selectedRadio}
                                                sx={{ marginRight: '0', marginLeft: '0' }} />
                                            <FormControlLabel value="Rangements"
                                                control={<Radio size='small' style={{ transform: 'scale(0.5)' }} />}
                                                label={<span style={{ transform: 'scale(0.75)', display: 'inline-block' }}>Rangements</span>}
                                                labelPlacement="bottom"
                                                checked={"Rangements" === selectedRadio}
                                                sx={{ marginRight: '0', marginLeft: '0' }} />
                                            <FormControlLabel value="Tables"
                                                control={<Radio size='small' style={{ transform: 'scale(0.5)' }} />}
                                                label={<span style={{ transform: 'scale(0.75)', display: 'inline-block' }}>Tables</span>}
                                                labelPlacement="bottom"
                                                checked={"Tables" === selectedRadio}
                                                sx={{ marginRight: '0', marginLeft: '0' }} />
                                        </RadioGroup>
                                    </FormControl>
                                    {/* Si il y a un filtre selectioner (selectedRadio contient un String) alors on affiche le button. */}
                                    {selectedRadio && <Button onClick={() => setSelectedRadio("")} style={{ transform: 'scale(0.75)', padding: '0' }} >Annuler la recherche</Button>}
                                </ul>
                            </Card>
                        )}
                    </Grid>
                </Grid>
                <div style={{ marginBottom: '50px' }}>
                    <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {products.filter((product) => product.categorie.includes(selectedRadio))
                            .slice(0, rangeValue)
                            .map((product, index) => (
                                <Grid xs={3} sm={3} md={3} key={product._id}>
                                    <Card sx={{ maxWidth: 445 }} style={{ height: '400px', borderRadius: '25px' }} key={index}>
                                        <CardActionArea style={{ height: '400px', display: 'flex', flexDirection: 'column' }} onClick={() => handleCardClick(product)}>
                                            <CardMedia
                                                component="img"
                                                height="280"
                                                image={product.images[0]}
                                                alt={'image de ' + product.titre}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {product.titre}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                                    {product.prix + '.-'}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                            )
                        }
                    </Grid>
                </div>
            </div >
        </ThemeProvider>
    );
};

export default Items;
