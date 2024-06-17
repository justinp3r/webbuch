import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const CreateBook = () => {
    const [data, setData] = useState({
        titel: '',
        autor: '',
        beschreibung: '',
        genre: 'Horror',
        erscheinungsjahr: '2024',
        isbn: '',
        buchart: [],
        verfügbarkeit: 'Verfügbar',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                        ? [...prev[name], value]
                        : prev[name].filter((type) => type !== value)
                    : value,
        }));
    };

    const isValidISBN = (isbn) => {
        if (!isbn) return false;
        const cleaned = isbn.replace(/[\s-]+/g, '');
        if (cleaned.length !== 10 && cleaned.length !== 13) return false;
        if (!/^\d+$/.test(cleaned)) return false;
        if (cleaned.length === 10) {
            let checksum = 0;
            for (let i = 0; i < 9; i++)
                checksum += parseInt(cleaned[i]) * (10 - i);
            const last = cleaned[9].toUpperCase();
            checksum += last === 'X' ? 10 : parseInt(last);
            return checksum % 11 === 0;
        }
        if (cleaned.length === 13) {
            let checksum = 0;
            for (let i = 0; i < 12; i++)
                checksum += parseInt(cleaned[i]) * (i % 2 === 0 ? 1 : 3);
            const last = parseInt(cleaned[12]);
            return (10 - (checksum % 10)) % 10 === last;
        }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        const { titel, autor, beschreibung, buchart, isbn } = data;
        if (!titel.trim()) errors.titel = 'Titel ist erforderlich.';
        if (!autor.trim()) errors.autor = 'Autor ist erforderlich.';
        if (!beschreibung.trim())
            errors.beschreibung = 'Beschreibung ist erforderlich.';
        if (buchart.length === 0)
            errors.buchart = 'Mindestens eine Buchart muss ausgewählt werden.';
        if (!isValidISBN(isbn)) errors.isbn = 'Ungültige ISBN-Nummer.';
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log('Formulardaten:', data);
            // Füge hier den Code zum Erstellen des Buchs hinzu
        }
    };

    const years = Array.from({ length: 2024 - 1455 + 1 }, (_, i) => 1455 + i);
    const genres = [
        'Horror',
        'Romantik',
        'Science-Fiction',
        'Fantasy',
        'Thriller',
    ];

    return (
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
            <img
                src="/public/createbook.jpeg"
                alt="Buch anlegen"
                style={{
                    width: '120px',
                    height: '120px',
                    marginTop: '20px',
                }}
            />
            <Typography variant="h4" sx={{ marginTop: '20px' }}>
                Buch anlegen
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {Object.entries(data).map(([key, value]) => (
                    <Box key={key} sx={{ marginBottom: '20px', fontSize: '18px' }}>
                        <Typography variant="subtitle1">
                            {key === 'isbn'
                                ? 'ISBN'
                                : key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        {key === 'buchart' ? (
                            <FormGroup row sx={{ marginTop: '10px' }}>
                                {['Kindle', 'Druckausgabe'].map((type) => (
                                    <FormControlLabel
                                        key={type}
                                        control={
                                            <Checkbox
                                                name={key}
                                                value={type}
                                                checked={value.includes(type)}
                                                onChange={handleChange}
                                            />
                                        }
                                        label={type}
                                        sx={{ marginRight: '20px' }}
                                    />
                                ))}
                            </FormGroup>
                        ) : key === 'verfügbarkeit' ? (
                            <RadioGroup
                                row
                                name={key}
                                value={value}
                                onChange={handleChange}
                                sx={{ marginTop: '10px' }}
                            >
                                {['Verfügbar', 'Nicht verfügbar'].map((status) => (
                                    <FormControlLabel
                                        key={status}
                                        value={status}
                                        control={<Radio color="secondary" />}
                                        label={status}
                                        sx={{ marginRight: '20px' }}
                                    />
                                ))}
                            </RadioGroup>
                        ) : key === 'erscheinungsjahr' ? (
                            <Select
                                value={value}
                                name={key}
                                onChange={handleChange}
                                sx={{ marginTop: '10px', width: '320px' }}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        ) : key === 'genre' ? (
                            <Select
                                value={value}
                                name={key}
                                onChange={handleChange}
                                sx={{ marginTop: '10px', width: '320px' }}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        {genre}
                                    </MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <TextField
                                value={value}
                                name={key}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                sx={{ marginTop: '10px', width: '300px' }}
                            />
                        )}
                        {errors[key] && (
                            <Typography variant="caption" color="error">
                                {errors[key]}
                            </Typography>
                        )}
                    </Box>
                ))}
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        marginBottom: '40px',
                    }}
                >
                    Erstellen
                </Button>
            </Box>
        </Box>
    );
};

export default CreateBook;
