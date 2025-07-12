// src/data/seatLayout.js
export const mockSeatLayout = [
    {
        row: "A",
        seats: Array.from({ length: 18 }, (_, i) => ({
            number: (i + 1).toString().padStart(2, "0"),
            status: "available",
        })),
    },
    ...["B", "C", "D", "E", "F", "G", "H"].map(row => ({
        row,
        seats: [
            ...Array.from({ length: 8 }, (_, i) => ({
                number: (i + 1).toString().padStart(2, "0"),
                status: "available",
            })),
            { gap: true },
            { gap: true },
            { gap: true },
            ...Array.from({ length: 7 }, (_, i) => ({
                number: (i + 9).toString().padStart(2, "0"),
                status: "available",
            })),
        ],
    })),
];
