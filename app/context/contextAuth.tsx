'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '@/app/types/types';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { tasksCollectionRef, db } from '@/app/firebase'
import { getDocs, deleteDoc, serverTimestamp, doc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

interface ContextType {
    userInfo: User | null;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getAllTasksFromFirebase: (userId: string) => Promise<Task[] | undefined>;
    addTaskToFirebase: (task: Task) => Promise<void | string>;
    updateTaskToFirebase: (taskId: string, updatedFields: Partial<Task>) => Promise<void>;
    deleteTaskToFirebase: (taskId: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllTasksFromFirebase = async (userId: string) => {
        try {
            const userTasksQuery = query(tasksCollectionRef, where("userId", "==", userId));

            const docsRes = await getDocs(userTasksQuery);

            const res: Task[] = docsRes.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    userId: data.userId,
                    title: data.title,
                    description: data.description,
                    state: data.state,
                    createdAt: data.createdAt ? data.createdAt.seconds : ''
                };
            });

            return res;
        } catch (error) {
            console.error("Error getting documents:", error);
        }
    };
    const updateTaskToFirebase = async (taskId: string, updatedFields: Partial<Task>) => {
        try {
            const newTaskRef = doc(db, 'tasks', taskId);
            const res = await updateDoc(newTaskRef, { ...updatedFields, createdAt: serverTimestamp() });
            console.log(res)
        } catch (error) {
            console.error('updateTaskToFirebase', error);
        }
    }
    const addTaskToFirebase = async (task: Task) => {
        try {
            const newTaskRef = doc(tasksCollectionRef);
            const newTaskId = newTaskRef.id;

            await setDoc(newTaskRef, {
                ...task,
                id: newTaskId,
                userId: userInfo?.uid ? userInfo?.uid : '',
                createdAt: serverTimestamp()
            });
            return newTaskId;
        } catch (error) {
            console.error("Error al guardar el documento:", error);
        }
    };
    const deleteTaskToFirebase = async (taskId: string) => {
        try {
            const taskDocRef = doc(db, "tasks", taskId);
            await deleteDoc(taskDocRef);
        } catch (error) {
            console.error("Error eliminando la tarea:", error);
        }
    }
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            if (!res.user) return
            setUserInfo(res.user)
        } catch (error) {
            console.error('Error al iniciar sesión con Google', error);
        }
    }
    const valuesContext: ContextType = {
        userInfo,
        setUserInfo,
        loading,
        setLoading,
        getAllTasksFromFirebase,
        addTaskToFirebase,
        updateTaskToFirebase,
        deleteTaskToFirebase,
        signInWithGoogle
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserInfo(currentUser)
            setLoading(false)
        })
        return () => unsuscribe()

    }, [])

    return (
        <Context.Provider value={valuesContext}>
            {children}
        </Context.Provider>
    );
}

function useContextData() {
    const contextData = useContext(Context);

    if (!contextData) {
        throw new Error('useContextData must be used within a ContextProvider');
    }

    return contextData;
}

export { ContextProvider, useContextData };
