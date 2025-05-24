import { supabase } from "@/clients/supabase";

export const createAccount = async (email, password) => {
  console.log("Service: createAccount...");
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const login = async (email, password) => {
  console.log("Service: login...");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  console.log("Service: logout...");
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  console.log("Service: seeCurrentUser...");
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};