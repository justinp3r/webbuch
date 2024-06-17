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
        <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <img
                    src="/public/createbook.jpeg"
                    alt="Buch anlegen"
                    style={{
                        width: '120px',
                        height: '120px',
                        marginTop: '20px',
                    }}
                />
                <h1 style={{ marginTop: '20px' }}>Buch anlegen</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {Object.entries(data).map(([key, value]) => (
                    <div
                        key={key}
                        style={{ marginBottom: '20px', fontSize: '18px' }}
                    >
                        <label>
                            {key === 'isbn'
                                ? 'ISBN'
                                : key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        {key === 'buchart' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                {['Kindle', 'Druckausgabe'].map((type) => (
                                    <label
                                        key={type}
                                        style={{ marginRight: '20px' }}
                                    >
                                        <input
                                            type="checkbox"
                                            name={key}
                                            value={type}
                                            checked={value.includes(type)}
                                            onChange={handleChange}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        ) : key === 'verfügbarkeit' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                {['Verfügbar', 'Nicht verfügbar'].map(
                                    (status) => (
                                        <label
                                            key={status}
                                            style={{ marginRight: '20px' }}
                                        >
                                            <input
                                                type="radio"
                                                name={key}
                                                value={status}
                                                checked={value === status}
                                                onChange={handleChange}
                                            />
                                            {status}
                                        </label>
                                    ),
                                )}
                            </div>
                        ) : key === 'erscheinungsjahr' ? (
                            <select
                                value={value}
                                name={key}
                                onChange={handleChange}
                                style={{
                                    display: 'block',
                                    marginTop: '10px',
                                    padding: '10px',
                                    width: '320px',
                                }}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        ) : key === 'genre' ? (
                            <select
                                value={value}
                                name={key}
                                onChange={handleChange}
                                style={{
                                    display: 'block',
                                    marginTop: '10px',
                                    padding: '10px',
                                    width: '320px',
                                }}
                            >
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <textarea
                                value={value}
                                name={key}
                                onChange={handleChange}
                                style={{
                                    display: 'block',
                                    marginTop: '10px',
                                    padding: '10px',
                                    width: '300px',
                                    height: '100px',
                                }}
                            />
                        )}
                        {errors[key] && (
                            <p style={{ color: 'red' }}>{errors[key]}</p>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        marginBottom: '40px',
                    }}
                >
                    Erstellen
                </button>
            </form>
        </div>
    );
};

export default CreateBook;
