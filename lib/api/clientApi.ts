import { type NewNoteData, type Note } from "../../types/note";
import { nextServer } from "./api";
import { User } from "../../types/user";


interface NotesHttpResponse{
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(searchQuery: string, page: number, tag?: string): Promise<NotesHttpResponse> {
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
        params
    });
    return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`)
    return response.data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
    const response = await nextServer.post<Note>('/notes', noteData)
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await nextServer.get<Note>(`/notes/${id}`);
    return response.data;
}

// Register

export type RegisterRequest = {
    email: string;
    password: string;
}

export const register = async (data: RegisterRequest) => {
    const response = await nextServer.post<User>('/auth/register', data);
    return response.data;
}

// Login

export type LoginRequest = { 
    email: string;
    password: string;
}

export const login = async (data: LoginRequest) => {
    const response = await nextServer.post<User>('/auth/login', data);
    return response.data;
}


type CheckSessionRequest = {
    success: boolean;
}

export const checkSession = async () => {
    const response = await nextServer.get<CheckSessionRequest>('/auth/session');
    return response.data.success;
}


export const getMe = async () => {
    const { data } = await nextServer.get<User>('/auth/me');
    return data;
}


export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
}



export type UpdateUserRequest = {
    username: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
    const response = await nextServer.patch<User>('/users/me', payload);
    return response.data;
}