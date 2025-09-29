// Examples service for Supabase integration with max 10 per user limit
// RUN: Test by checking examples service handles max limit and RLS properly
// Expected: Graceful handling of max limit with proper error messages

import { supabase } from './supabase';
import type { Example, ExampleInsert, ExampleUpdate } from '@/types/database';

export class ExamplesService {
  private static readonly MAX_EXAMPLES_PER_USER = 10;

  /**
   * Check if examples table exists
   */
  static async checkTableExists(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('examples')
        .select('id')
        .limit(1);
      
      return !error || error.code !== 'PGRST116'; // PGRST116 = table not found
    } catch {
      return false;
    }
  }

  /**
   * Get current user's example count
   */
  static async getUserExampleCount(): Promise<{ count: number; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { count: 0, error: 'User not authenticated' };
      }

      const { count, error } = await supabase
        .from('examples')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error counting examples:', error);
        return { count: 0, error: error.message };
      }

      return { count: count || 0, error: null };
    } catch (err) {
      console.error('Unexpected error counting examples:', err);
      return { count: 0, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Check if user can create more examples
   */
  static async canCreateExample(): Promise<{ canCreate: boolean; error: string | null }> {
    const { count, error } = await this.getUserExampleCount();
    
    if (error) {
      return { canCreate: false, error };
    }

    return { 
      canCreate: count < this.MAX_EXAMPLES_PER_USER, 
      error: null 
    };
  }

  /**
   * Get all examples for the current user
   */
  static async getExamples(): Promise<{ data: Example[] | null; error: string | null }> {
    try {
      // Check if table exists first
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('examples')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching examples:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error fetching examples:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Get a single example by ID
   */
  static async getExample(id: string): Promise<{ data: Example | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('examples')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching example:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error fetching example:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Create a new example
   */
  static async createExample(example: Omit<ExampleInsert, 'user_id'>): Promise<{ data: Example | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      // Check if user can create more examples
      const { canCreate, error: limitError } = await this.canCreateExample();
      if (!canCreate) {
        return { 
          data: null, 
          error: limitError || `Maximum ${this.MAX_EXAMPLES_PER_USER} examples allowed per user` 
        };
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('examples')
        .insert({
          ...example,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating example:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error creating example:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Update an existing example
   */
  static async updateExample(id: string, updates: ExampleUpdate): Promise<{ data: Example | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('examples')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating example:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error updating example:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Delete an example
   */
  static async deleteExample(id: string): Promise<{ error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      const { error } = await supabase
        .from('examples')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting example:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected error deleting example:', err);
      return { error: 'An unexpected error occurred' };
    }
  }

  /**
   * Search examples by content
   */
  static async searchExamples(query: string): Promise<{ data: Example[] | null; error: string | null }> {
    try {
      const tableExists = await this.checkTableExists();
      if (!tableExists) {
        return { 
          data: null, 
          error: 'Examples table not found. Please run the database setup first.' 
        };
      }

      const { data, error } = await supabase
        .from('examples')
        .select('*')
        .ilike('content', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching examples:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Unexpected error searching examples:', err);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Get max examples per user limit
   */
  static getMaxExamplesPerUser(): number {
    return this.MAX_EXAMPLES_PER_USER;
  }
}
