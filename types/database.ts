// Database types for Supabase integration
// Generated types for items table

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Item = Database['public']['Tables']['items']['Row'];
export type ItemInsert = Database['public']['Tables']['items']['Insert'];
export type ItemUpdate = Database['public']['Tables']['items']['Update'];
