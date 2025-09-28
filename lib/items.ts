// Items service for Supabase integration with better error handling
// RUN: Test by checking items service handles missing table gracefully
// Expected: Graceful error handling when table doesn't exist

import { supabase } from './supabase';
import type { Item, ItemInsert, ItemUpdate } from '@/types/database';

export class ItemsService {
  /**
   * Check if items table exists
   */
  static async checkTableExists(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('items')
        .select('id')
        .limit(1);
      
      return !error || error.code !== 'PGRST116'; // PGRST116 = table not found
    } catch {
      return false;
    }
  }

  /**
   * Get all items for the current user
   */
  static async getItems(): Promise<{ data: Item[] | null; error: string | null }> {
    try {
      // Check if table exists first
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching items:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error fetching items:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Get a single item by ID
   */
  static async getItem(id: string): Promise<{ data: Item | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching item:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error fetching item:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Create a new item
   */
  static async createItem(item: Omit<ItemInsert, 'user_id'>): Promise<{ data: Item | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('items')
        .insert({
          ...item,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating item:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error creating item:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Update an existing item
   */
  static async updateItem(id: string, updates: ItemUpdate): Promise<{ data: Item | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating item:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error updating item:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Delete an item
   */
  static async deleteItem(id: string): Promise<{ error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected error deleting item:', err);
      return { error: 'An unexpected error occurred' };
    }
  }

  /**
   * Search items by title or notes
   */
  static async searchItems(query: string): Promise<{ data: Item[] | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Items table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .or(`title.ilike.%${query}%,notes.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching items:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error searching items:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }
}