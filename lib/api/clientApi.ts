// // import axios from "axios";
// import { nextServer } from "./api";
// import { type NewNoteData, type Note } from "../../types/note";
// import { User } from "../../types/user";

// const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// // const API_URL = 'https://notehub-public.goit.study/api/notes';

// // axios.defaults.baseURL = 'http://localhost:3000/api';

// const HEADERS = {
//     Accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`,
// }

// interface NotesHttpResponse{
//     notes: Note[];
//     totalPages: number;
// }

// export async function fetchNotes(searchQuery: string, page: number, tag?: string): Promise<NotesHttpResponse> {
//     const params: {
//         page: number;
//         perPage: number;
//         search?: string;
//         tag?: string;
//     } = {
//         page,
//         perPage: 12,
//     }

//     const trimmedQuery = searchQuery.trim();
//     if (trimmedQuery !== '') {
//         params.search = trimmedQuery;
//     }

//     if (tag) {
//         params.tag = tag;
//     }
    
//     const response = await nextServer.get<NotesHttpResponse>('/notes', {
//         params,
//         headers: HEADERS,
//     });
//     return response.data;
// }

// export async function deleteNote(noteId: number): Promise<Note> {
//     const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
//         headers: HEADERS,
//     })
//     return response.data;
// }

// export async function createNote(noteData: NewNoteData): Promise<Note> {
//     const response = await nextServer.post<Note>('/notes', noteData, {
//         headers: HEADERS,
//     })
//     return response.data;
// }

// export async function fetchNoteById(id: number): Promise<Note> {
//     const response = await nextServer.get<Note>(`/notes/${id}`, {
//         headers: HEADERS,
//     });
//     return response.data;
// }

// export async function getMe() {
//     const { data } = await nextServer.get<User>('users/me');
//     return data;
// }


// type CheckSessionRequest = {
//     success: boolean;
// }
// export async function checkSession() {
//     const response = await nextServer.get<CheckSessionRequest>('/auth/session');
//     return response.data.success;
// }



import { nextServer } from "./api";
import { type NewNoteData, type Note } from "../../types/note";
import { User } from "../../types/user";

interface NotesHttpResponse{
    notes: Note[];
    totalPages: number;
}

const createHeaders = (token?: string) => ({
    Accept: 'application/json',
    ...(token && {Authorization : `Bearer ${token}`})
})

export async function fetchNotes(searchQuery: string, page: number, tag?: string, token?: string): Promise<NotesHttpResponse> {
    const params: {
        page: number;
        perPage: number;
        search?: string;
        tag?: string;
    } = {
        page,
        perPage: 12,
    }

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
        params.search = trimmedQuery;
    }

    if (tag) {
        params.tag = tag;
    }
    
    const response = await nextServer.get<NotesHttpResponse>('/notes', {
        params,
        headers: createHeaders(token),
    });
    return response.data;
}

export async function deleteNote(noteId: number, token?: string): Promise<Note> {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
        headers: createHeaders(token),
    })
    return response.data;
}

export async function createNote(noteData: NewNoteData, token?: string): Promise<Note> {
    const response = await nextServer.post<Note>('/notes', noteData, {
        headers: createHeaders(token),
    })
    return response.data;
}

export async function fetchNoteById(id: number, token?: string): Promise<Note> {
    const response = await nextServer.get<Note>(`/notes/${id}`, {
        headers: createHeaders(token),
    });
    return response.data;
}

export async function getMe(token?: string) {
    const { data } = await nextServer.get<User>('users/me', {
        headers: createHeaders(token),
    });
    return data;
}


type CheckSessionRequest = {
    success: boolean;
}

export async function checkSession(token?: string) {
    const response = await nextServer.get<CheckSessionRequest>('/auth/session', {
        headers: createHeaders(token),
    });
    return response.data.success;
}

export type RegisterRequest = {
    email: string;
    password: string;
}

export async function register(data: RegisterRequest, token?: string) {
    const res = await nextServer.post<User>('/auth/register', data, {
        headers: createHeaders(token)
    });
    return res.data;
}