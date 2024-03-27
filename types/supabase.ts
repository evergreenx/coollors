export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      guests: {
        Row: {
          attendeeid: number
          email: string | null
          fullname: string | null
          phoneno: string | null
        }
        Insert: {
          attendeeid: number
          email?: string | null
          fullname?: string | null
          phoneno?: string | null
        }
        Update: {
          attendeeid?: number
          email?: string | null
          fullname?: string | null
          phoneno?: string | null
        }
        Relationships: []
      }
      palettes: {
        Row: {
          colors: string | null
          created_at: string
          desc: string | null
          id: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          colors?: string | null
          created_at?: string
          desc?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          colors?: string | null
          created_at?: string
          desc?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          attendeeid: number | null
          ticketid: number
          ticketstatus: boolean | null
          tickettype: Database["public"]["Enums"]["tickettypeenum"] | null
        }
        Insert: {
          attendeeid?: number | null
          ticketid: number
          ticketstatus?: boolean | null
          tickettype?: Database["public"]["Enums"]["tickettypeenum"] | null
        }
        Update: {
          attendeeid?: number | null
          ticketid?: number
          ticketstatus?: boolean | null
          tickettype?: Database["public"]["Enums"]["tickettypeenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_attendeeid_fkey"
            columns: ["attendeeid"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["attendeeid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      tickettypeenum: "free" | "vip" | "regular"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
