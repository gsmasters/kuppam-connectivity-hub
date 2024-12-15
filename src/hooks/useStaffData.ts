import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useStaffData = (staffType: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staff, isLoading } = useQuery({
    queryKey: ["staff", staffType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("staff_type", staffType)
        .order("name");

      if (error) {
        console.error("Error fetching staff:", error);
        throw error;
      }

      return data;
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from("staff")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", staffType] });
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating staff:", error);
      toast({
        title: "Error",
        description: "Failed to update staff member",
        variant: "destructive",
      });
    },
  });

  const addStaffMutation = useMutation({
    mutationFn: async (newStaff: any) => {
      const { data, error } = await supabase
        .from("staff")
        .insert([newStaff])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", staffType] });
      toast({
        title: "Success",
        description: "Staff member added successfully",
      });
    },
    onError: (error) => {
      console.error("Error adding staff:", error);
      toast({
        title: "Error",
        description: "Failed to add staff member",
        variant: "destructive",
      });
    },
  });

  return {
    staff,
    isLoading,
    updateStaff: updateStaffMutation.mutate,
    addStaff: addStaffMutation.mutate,
    isUpdating: updateStaffMutation.isPending,
    isAdding: addStaffMutation.isPending,
  };
};