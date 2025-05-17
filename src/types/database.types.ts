export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          plan_end_date: string | null
          plan_name: string | null
          plan_price: number | null
          plan_sku: string | null
          plan_start_date: string | null
          plan_status: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          plan_end_date?: string | null
          plan_name?: string | null
          plan_price?: number | null
          plan_sku?: string | null
          plan_start_date?: string | null
          plan_status?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          plan_end_date?: string | null
          plan_name?: string | null
          plan_price?: number | null
          plan_sku?: string | null
          plan_start_date?: string | null
          plan_status?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_plan: {
        Args: {
          selected_plan_sku: string
          selected_plan_name: string
          selected_plan_price: number
          plan_duration_months: number
        }
        Returns: Json
      }
      update_user_profile: {
        Args: {
          new_first_name: string
          new_last_name: string
          new_email?: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 