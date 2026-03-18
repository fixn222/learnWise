import { Subject } from "../types/index.types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        description: "An introductory course to the fundamental concepts of computer science and programming.",
        createdAt: "2023-01-15T10:00:00Z"
    },
    {
        id: 2,
        code: "MA201",
        name: "Calculus I",
        department: "Mathematics",
        description: "First course in a sequence of calculus, covering limits, derivatives, and integrals.",
        createdAt: "2023-01-15T10:00:00Z"
    },
    {
        id: 3,
        code: "PH301",
        name: "Classical Mechanics",
        department: "Physics",
        description: "A course focusing on the classical description of the motion of particles and systems of particles.",
        createdAt: "2023-01-15T10:00:00Z"
    }
];
