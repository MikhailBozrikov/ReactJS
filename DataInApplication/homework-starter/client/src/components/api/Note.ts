// валидация и типизация данных с помощью Zod 
import { useEffect, useState } from "react";
import { z } from "zod";
import { validateResponse } from "./validateResponse";

const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number(),
})

// z.infer автоматически создает TypeScript-тип из схемы
export type Note = z.infer<typeof NoteSchema>;
// Вариант 1: Создаем схему массива
export const NoteList = z.array(NoteSchema);
// Вариант 2: Генерируем тип из схемы массива
export type NoteList = z.infer<typeof NoteList>

export const FetchNotesListSchema = z.object({
    list: NoteList,
})

type FetchNotesListResponse = z.infer<typeof FetchNotesListSchema>;

export function fetchNoteList(): Promise<FetchNotesListResponse> {
    return fetch("api/notes")
    .then((response) => response.json())
    .then((data) => FetchNotesListSchema.parse(data))
}

interface IdRequestState {
    status: "idle";
}

interface LoadingRequestState {
    status: "pending";
}

interface SuccessRequestState {
    status: "success";
    data: NoteList
}

interface ErrorRequestState {
    status: "error";
    error: unknown;
}

type RequestState =
    | IdRequestState // 1. Начальное состояние
    | LoadingRequestState // 2. Загрузка
    | SuccessRequestState // 3. Успех + данные
    | ErrorRequestState; // 4. Ошибка

export function useNoteList() {
    const [state, setState] = useState<RequestState>({ status: "idle"});

    useEffect(() => {
        setState({ status: "pending" });
    }, []);

    useEffect(() => {
        if (state.status === "pending") {
          fetchNoteList()
            .then((data) => {
                setState({status: "success", data: data.list });
            })
            .catch((error) => {
                setState({status: "error", error})
            })
        }
        
    }, [state]);

    useEffect(() => {
        setState({ status: "pending"});
    }, []);

    const refetch = () => {
        setState({status: "pending"});
    };

    return {
        state,
        refetch,
    };
}

export function createNote(title:string, text: string): Promise<void> {
    return fetch("api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            text,
        }),
    })
    .then(validateResponse)
    .then(() => undefined);
}