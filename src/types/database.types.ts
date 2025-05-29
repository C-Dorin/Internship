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
      avion: {
        Row: {
          id: number
          nr_locuri_totale: number
        }
        Insert: {
          id?: number
          nr_locuri_totale: number
        }
        Update: {
          id?: number
          nr_locuri_totale?: number
        }
        Relationships: []
      }
      curse: {
        Row: {
          cod: string
          id: number
          id_preturi_zbor: number
          locuri_ocupate_clasa_1: number | null
          locuri_ocupate_clasa_2: number | null
          locuri_ocupate_clasa_3: number | null
          locuri_ocupate_total: number | null
          venit_total: number | null
        }
        Insert: {
          cod: string
          id?: number
          id_preturi_zbor: number
          locuri_ocupate_clasa_1?: number | null
          locuri_ocupate_clasa_2?: number | null
          locuri_ocupate_clasa_3?: number | null
          locuri_ocupate_total?: number | null
          venit_total?: number | null
        }
        Update: {
          cod?: string
          id?: number
          id_preturi_zbor?: number
          locuri_ocupate_clasa_1?: number | null
          locuri_ocupate_clasa_2?: number | null
          locuri_ocupate_clasa_3?: number | null
          locuri_ocupate_total?: number | null
          venit_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "curse_id_preturi_zbor_fkey"
            columns: ["id_preturi_zbor"]
            isOneToOne: false
            referencedRelation: "preturi_zbor"
            referencedColumns: ["id"]
          },
        ]
      }
      orar: {
        Row: {
          amanata: boolean | null
          anulata: boolean | null
          directia: string
          id: number
          id_avion: number
          id_cursa: number
          ora_aterizare: string
          ora_decolare: string
          ziua_saptamanii: string
        }
        Insert: {
          amanata?: boolean | null
          anulata?: boolean | null
          directia: string
          id?: number
          id_avion: number
          id_cursa: number
          ora_aterizare: string
          ora_decolare: string
          ziua_saptamanii: string
        }
        Update: {
          amanata?: boolean | null
          anulata?: boolean | null
          directia?: string
          id?: number
          id_avion?: number
          id_cursa?: number
          ora_aterizare?: string
          ora_decolare?: string
          ziua_saptamanii?: string
        }
        Relationships: [
          {
            foreignKeyName: "orar_id_avion_fkey"
            columns: ["id_avion"]
            isOneToOne: false
            referencedRelation: "avion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orar_id_cursa_fkey"
            columns: ["id_cursa"]
            isOneToOne: false
            referencedRelation: "curse"
            referencedColumns: ["id"]
          },
        ]
      }
      pasageri: {
        Row: {
          id: number
          nume: string
          prenume: string
        }
        Insert: {
          id?: number
          nume: string
          prenume: string
        }
        Update: {
          id?: number
          nume?: string
          prenume?: string
        }
        Relationships: []
      }
      pasageri_zboruri: {
        Row: {
          clasa: string
          id: number
          id_cursa: number
          id_pasager: number
        }
        Insert: {
          clasa: string
          id?: number
          id_cursa: number
          id_pasager: number
        }
        Update: {
          clasa?: string
          id?: number
          id_cursa?: number
          id_pasager?: number
        }
        Relationships: [
          {
            foreignKeyName: "pasageri_zboruri_id_cursa_fkey"
            columns: ["id_cursa"]
            isOneToOne: false
            referencedRelation: "curse"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pasageri_zboruri_id_pasager_fkey"
            columns: ["id_pasager"]
            isOneToOne: false
            referencedRelation: "pasageri"
            referencedColumns: ["id"]
          },
        ]
      }
      preturi_zbor: {
        Row: {
          clasa_1: number
          clasa_2: number
          clasa_3: number
          id: number
          oras_destinatie: string
        }
        Insert: {
          clasa_1: number
          clasa_2: number
          clasa_3: number
          id?: number
          oras_destinatie: string
        }
        Update: {
          clasa_1?: number
          clasa_2?: number
          clasa_3?: number
          id?: number
          oras_destinatie?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          full_name: string | null
          id: string
          role_id: number | null
        }
        Insert: {
          full_name?: string | null
          id: string
          role_id?: number | null
        }
        Update: {
          full_name?: string | null
          id?: string
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      aterizari: {
        Row: {
          amanata: boolean | null
          anulata: boolean | null
          cod_cursa: string | null
          ora_aterizare: string | null
          oras_destinatie: string | null
        }
        Relationships: []
      }
      curse_anulate: {
        Row: {
          amanata: boolean | null
          anulata: boolean | null
          directia: string | null
          id: number | null
          id_avion: number | null
          id_cursa: number | null
          ora_aterizare: string | null
          ora_decolare: string | null
          ziua_saptamanii: string | null
        }
        Insert: {
          amanata?: boolean | null
          anulata?: boolean | null
          directia?: string | null
          id?: number | null
          id_avion?: number | null
          id_cursa?: number | null
          ora_aterizare?: string | null
          ora_decolare?: string | null
          ziua_saptamanii?: string | null
        }
        Update: {
          amanata?: boolean | null
          anulata?: boolean | null
          directia?: string | null
          id?: number | null
          id_avion?: number | null
          id_cursa?: number | null
          ora_aterizare?: string | null
          ora_decolare?: string | null
          ziua_saptamanii?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orar_id_avion_fkey"
            columns: ["id_avion"]
            isOneToOne: false
            referencedRelation: "avion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orar_id_cursa_fkey"
            columns: ["id_cursa"]
            isOneToOne: false
            referencedRelation: "curse"
            referencedColumns: ["id"]
          },
        ]
      }
      decolari: {
        Row: {
          amanata: boolean | null
          anulata: boolean | null
          cod_cursa: string | null
          ora_decolare: string | null
          oras_destinatie: string | null
        }
        Relationships: []
      }
      locuri_disponibile: {
        Row: {
          cod_cursa: string | null
          id_orar: number | null
          locuri_libere: number | null
          locuri_ocupate: number | null
          locuri_totale: number | null
        }
        Relationships: []
      }
      orar_decolare_avioane: {
        Row: {
          cod_cursa: string | null
          id_avion: number | null
          id_orar: number | null
          ora_decolare: string | null
          oras_destinatie: string | null
          ziua_saptamanii: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orar_id_avion_fkey"
            columns: ["id_avion"]
            isOneToOne: false
            referencedRelation: "avion"
            referencedColumns: ["id"]
          },
        ]
      }
      orar_destinatii: {
        Row: {
          cod_cursa: string | null
          directia: string | null
          id_avion: number | null
          id_orar: number | null
          ora_aterizare: string | null
          ora_decolare: string | null
          oras_destinatie: string | null
          ziua_saptamanii: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orar_id_avion_fkey"
            columns: ["id_avion"]
            isOneToOne: false
            referencedRelation: "avion"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_orar_decolare_avion: {
        Args: {
          _oras: string
          _ora_decolarii_min: string
          _ora_decolarii_max: string
        }
        Returns: {
          id_orar: number
          cod_cursa: string
          ziua_saptamanii: string
          ora_decolare: string
          id_avion: number
          oras_destinatie: string
        }[]
      }
      get_orar_destinatie: {
        Args: { _oras: string }
        Returns: {
          id_orar: number
          cod_cursa: string
          ziua_saptamanii: string
          ora_decolare: string
          ora_aterizare: string
          directia: string
          id_avion: number
        }[]
      }
      show_aterizari: {
        Args: Record<PropertyKey, never>
        Returns: {
          cod_cursa: string
          oras_destinatie: string
          ora_aterizare: string
          amanata: boolean
          anulata: boolean
        }[]
      }
      show_curse_anulate: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          id_cursa: number
          ziua_saptamanii: string
          ora_decolare: string
          ora_aterizare: string
          directia: string
          id_avion: number
          anulata: boolean
          amanata: boolean
        }[]
      }
      show_decolari: {
        Args: Record<PropertyKey, never>
        Returns: {
          cod_cursa: string
          oras_destinatie: string
          ora_decolare: string
          amanata: boolean
          anulata: boolean
        }[]
      }
      show_locuri_disponibile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_orar: number
          cod_cursa: string
          locuri_ocupate: number
          locuri_libere: number
          locuri_totale: number
        }[]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
