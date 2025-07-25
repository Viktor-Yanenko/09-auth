import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "../../types/user";
import { Note } from "../../types/note";

interface NotesHttpResponse{
    notes: Note[];
    totalPages: number;
}

export const checkServerSession = async () => { 
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return res;
}

export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return data;
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
    
    const cookieStore = await cookies();
    const response = await nextServer.get<NotesHttpResponse>('/notes', {
        params,
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const cookieStore = await cookies();
    const response = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return response.data;
}