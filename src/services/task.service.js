import { supabase } from '@/clients/supabase';

export const getTasks = async (userId) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("inserted_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const addTask = async (title, userId) => {

  const descriptionTask = title.trim();
  if (!descriptionTask) throw new Error("El título de la tarea está vacío");

  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        task: descriptionTask,
        is_complete: false,
        user_id: userId,
      },
    ])
    .select()
    .single(); // para devolver directamente el objeto en vez de un array

  if (error) throw error;
  return data;
};

export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
};