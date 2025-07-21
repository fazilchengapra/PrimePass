import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

const popularGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
];

const GenreFilter = ({
  filterOptions,
  setFilterOptions,
  parentFilterOptions,
}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleToggle = (id) => {
    const updatedGenres = selectedGenres.includes(id)
      ? selectedGenres.filter((genreId) => genreId !== id)
      : [...selectedGenres, id];

    setSelectedGenres(updatedGenres);

    setFilterOptions((prev) => ({
      ...prev,
      with_genres: updatedGenres,
    }));
  };

  // Optional: Sync with external filterOptions changes
  useEffect(() => {
    if (parentFilterOptions?.with_genres) {
      setSelectedGenres(parentFilterOptions?.with_genres);
    }
  }, [parentFilterOptions?.with_genres]);

  // Split genres into rows of 2
  const genreRows = [];
  for (let i = 0; i < popularGenres.length; i += 2) {
    genreRows.push(popularGenres.slice(i, i + 2));
  }

  return (
    <div className="p-4">
      <Typography variant="body1" align="center" className="font-bold mb-2">
        Select Genre
      </Typography>
      <div className="flex flex-col gap-2">
        {genreRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-5">
            {row.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleToggle(genre.id)}
                  />
                }
                label={genre.name}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
