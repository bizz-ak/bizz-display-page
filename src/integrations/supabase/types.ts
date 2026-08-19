export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_label: string | null
          created_at: string
          id: string
          new_value: string | null
          previous_value: string | null
          resource_id: string | null
          resource_type: string
          status: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_label?: string | null
          created_at?: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          resource_id?: string | null
          resource_type: string
          status?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_label?: string | null
          created_at?: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          resource_id?: string | null
          resource_type?: string
          status?: string
        }
        Relationships: []
      }
      business_settings: {
        Row: {
          description: string | null
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          setting_key: string
          setting_value?: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      capital_assets: {
        Row: {
          category: string | null
          created_at: string
          current_value: number
          depreciation: number
          id: string
          name: string
          purchase_date: string
          purchase_value: number
          status: string
          updated_at: string
          useful_life: number
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          current_value?: number
          depreciation?: number
          id?: string
          name: string
          purchase_date?: string
          purchase_value?: number
          status?: string
          updated_at?: string
          useful_life?: number
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          current_value?: number
          depreciation?: number
          id?: string
          name?: string
          purchase_date?: string
          purchase_value?: number
          status?: string
          updated_at?: string
          useful_life?: number
          user_id?: string | null
        }
        Relationships: []
      }
      customer_channels: {
        Row: {
          active: boolean
          created_at: string
          id: string
          name: string
          notes: string | null
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          channel_id: string | null
          created_at: string
          customer_type: string
          email: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          phone: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          channel_id?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          channel_id?: string | null
          created_at?: string
          customer_type?: string
          email?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "customer_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          hired_on: string | null
          id: string
          name: string
          phone: string | null
          role: string | null
          salary: number
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          hired_on?: string | null
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          salary?: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          hired_on?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          salary?: number
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          description: string
          expense_date: string
          id: string
          notes: string | null
          payment_method: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string
          description: string
          expense_date?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string
          expense_date?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      finance_accounts: {
        Row: {
          account_number: string | null
          account_type: string
          created_at: string
          currency: string
          id: string
          name: string
          notes: string | null
          opening_balance: number
          payment_method: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_number?: string | null
          account_type?: string
          created_at?: string
          currency?: string
          id?: string
          name: string
          notes?: string | null
          opening_balance?: number
          payment_method?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_number?: string | null
          account_type?: string
          created_at?: string
          currency?: string
          id?: string
          name?: string
          notes?: string | null
          opening_balance?: number
          payment_method?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      finance_audit_logs: {
        Row: {
          action: string
          amount: number
          created_at: string
          description: string | null
          entity: string
          entity_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          amount?: number
          created_at?: string
          description?: string | null
          entity: string
          entity_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          amount?: number
          created_at?: string
          description?: string | null
          entity?: string
          entity_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      finance_payments: {
        Row: {
          account_id: string | null
          amount: number
          attachment_path: string | null
          created_at: string
          customer_id: string | null
          customer_name: string | null
          description: string | null
          direction: string
          id: string
          invoice_number: string | null
          notes: string | null
          payment_date: string
          payment_method: string
          payment_type: string
          reference: string | null
          status: string
          supplier_id: string | null
          supplier_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          amount?: number
          attachment_path?: string | null
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          description?: string | null
          direction?: string
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_type?: string
          reference?: string | null
          status?: string
          supplier_id?: string | null
          supplier_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          attachment_path?: string | null
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          description?: string | null
          direction?: string
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_type?: string
          reference?: string | null
          status?: string
          supplier_id?: string | null
          supplier_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finance_payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "finance_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_payments_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_transfers: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          from_account_id: string | null
          from_account_name: string
          id: string
          notes: string | null
          reference: string | null
          status: string
          to_account_id: string | null
          to_account_name: string
          transfer_date: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          from_account_id?: string | null
          from_account_name?: string
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string
          to_account_id?: string | null
          to_account_name?: string
          transfer_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          from_account_id?: string | null
          from_account_name?: string
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string
          to_account_id?: string | null
          to_account_name?: string
          transfer_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finance_transfers_from_account_id_fkey"
            columns: ["from_account_id"]
            isOneToOne: false
            referencedRelation: "finance_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_transfers_to_account_id_fkey"
            columns: ["to_account_id"]
            isOneToOne: false
            referencedRelation: "finance_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      income_tax_records: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          installment: string | null
          payment_status: string
          period: string
          profit_base: number
          status: string
          tax_rate: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          due_date: string
          id?: string
          installment?: string | null
          payment_status?: string
          period: string
          profit_base?: number
          status?: string
          tax_rate?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          installment?: string | null
          payment_status?: string
          period?: string
          profit_base?: number
          status?: string
          tax_rate?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      inventory_purchase_items: {
        Row: {
          created_at: string
          id: string
          line_total: number
          product_id: string | null
          product_name: string
          purchase_id: string
          quantity: number
          unit_cost: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name: string
          purchase_id: string
          quantity?: number
          unit_cost?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name?: string
          purchase_id?: string
          quantity?: number
          unit_cost?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_purchase_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_purchase_items_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "inventory_purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_purchases: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          purchase_date: string
          purchase_no: string
          status: string
          supplier_id: string | null
          supplier_name: string
          total: number
          updated_at: string
          user_id: string | null
          warehouse_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          purchase_date?: string
          purchase_no: string
          status?: string
          supplier_id?: string | null
          supplier_name?: string
          total?: number
          updated_at?: string
          user_id?: string | null
          warehouse_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          purchase_date?: string
          purchase_no?: string
          status?: string
          supplier_id?: string | null
          supplier_name?: string
          total?: number
          updated_at?: string
          user_id?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_purchases_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_purchases_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          budget: number
          channel: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget?: number
          channel?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget?: number
          channel?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      paye_records: {
        Row: {
          created_at: string
          due_date: string
          employees: number
          gross_pay: number
          id: string
          paye_amount: number
          payment_status: string
          period: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          due_date: string
          employees?: number
          gross_pay?: number
          id?: string
          paye_amount?: number
          payment_status?: string
          period: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          due_date?: string
          employees?: number
          gross_pay?: number
          id?: string
          paye_amount?: number
          payment_status?: string
          period?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      permission_catalog: {
        Row: {
          action: string
          active: boolean
          created_at: string
          description: string
          module: string
          permission_key: string
        }
        Insert: {
          action: string
          active?: boolean
          created_at?: string
          description?: string
          module: string
          permission_key: string
        }
        Update: {
          action?: string
          active?: boolean
          created_at?: string
          description?: string
          module?: string
          permission_key?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          barcode: string | null
          category: string | null
          category_id: string | null
          cost_price: number
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          name: string
          reorder_level: number
          selling_price: number
          sku: string | null
          stock_quantity: number
          supplier_id: string | null
          tax_rate: number
          updated_at: string
          user_id: string | null
          warehouse_id: string | null
        }
        Insert: {
          active?: boolean
          barcode?: string | null
          category?: string | null
          category_id?: string | null
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          name: string
          reorder_level?: number
          selling_price?: number
          sku?: string | null
          stock_quantity?: number
          supplier_id?: string | null
          tax_rate?: number
          updated_at?: string
          user_id?: string | null
          warehouse_id?: string | null
        }
        Update: {
          active?: boolean
          barcode?: string | null
          category?: string | null
          category_id?: string | null
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          name?: string
          reorder_level?: number
          selling_price?: number
          sku?: string | null
          stock_quantity?: number
          supplier_id?: string | null
          tax_rate?: number
          updated_at?: string
          user_id?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_seen_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          last_seen_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_seen_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotation_items: {
        Row: {
          created_at: string
          id: string
          line_total: number
          product_id: string | null
          product_name: string
          quantity: number
          quotation_id: string
          tax_amount: number
          unit_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name: string
          quantity?: number
          quotation_id: string
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          quotation_id?: string
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotation_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          created_at: string
          customer_id: string | null
          customer_name: string
          discount_amount: number
          id: string
          notes: string | null
          quote_date: string
          quote_no: string
          status: string
          subtotal: number
          tax_amount: number
          total: number
          updated_at: string
          user_id: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          customer_name?: string
          discount_amount?: number
          id?: string
          notes?: string | null
          quote_date?: string
          quote_no: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          customer_name?: string
          discount_amount?: number
          id?: string
          notes?: string | null
          quote_date?: string
          quote_no?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission_key: string
          role: Database["public"]["Enums"]["app_role"]
          scope: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission_key: string
          role: Database["public"]["Enums"]["app_role"]
          scope?: string
        }
        Update: {
          created_at?: string
          id?: string
          permission_key?: string
          role?: Database["public"]["Enums"]["app_role"]
          scope?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_key_fkey"
            columns: ["permission_key"]
            isOneToOne: false
            referencedRelation: "permission_catalog"
            referencedColumns: ["permission_key"]
          },
        ]
      }
      sale_items: {
        Row: {
          created_at: string
          id: string
          line_total: number
          product_id: string | null
          product_name: string
          quantity: number
          sale_id: string
          tax_amount: number
          unit_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name: string
          quantity?: number
          sale_id: string
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          sale_id?: string
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          amount_paid: number
          created_at: string
          customer_id: string | null
          customer_name: string | null
          discount_amount: number
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          payment_method: string
          sale_date: string
          status: string
          subtotal: number
          tax_amount: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_paid?: number
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          discount_amount?: number
          due_date?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          payment_method?: string
          sale_date?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          discount_amount?: number
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          payment_method?: string
          sale_date?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_order_items: {
        Row: {
          created_at: string
          id: string
          line_total: number
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          tax_amount: number
          unit_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          line_total?: number
          order_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          line_total?: number
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          tax_amount?: number
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_orders: {
        Row: {
          created_at: string
          customer_id: string | null
          customer_name: string
          delivery_date: string | null
          discount_amount: number
          id: string
          notes: string | null
          order_date: string
          order_no: string
          status: string
          subtotal: number
          tax_amount: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          customer_name?: string
          delivery_date?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          order_date?: string
          order_no: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          customer_name?: string
          delivery_date?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          order_date?: string
          order_no?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_payments: {
        Row: {
          amount: number
          created_at: string
          customer_name: string
          id: string
          invoice_number: string | null
          method: string
          notes: string | null
          payment_date: string
          reference: string | null
          sale_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          customer_name?: string
          id?: string
          invoice_number?: string | null
          method?: string
          notes?: string | null
          payment_date?: string
          reference?: string | null
          sale_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          customer_name?: string
          id?: string
          invoice_number?: string | null
          method?: string
          notes?: string | null
          payment_date?: string
          reference?: string | null
          sale_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_payments_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_return_items: {
        Row: {
          created_at: string
          id: string
          line_total: number
          product_id: string | null
          product_name: string
          quantity: number
          return_id: string
          unit_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name: string
          quantity?: number
          return_id: string
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          line_total?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
          return_id?: string
          unit_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_return_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_return_items_return_id_fkey"
            columns: ["return_id"]
            isOneToOne: false
            referencedRelation: "sales_returns"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_returns: {
        Row: {
          created_at: string
          customer_name: string
          id: string
          invoice_number: string | null
          reason: string | null
          return_date: string
          return_no: string
          sale_id: string | null
          status: string
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_name?: string
          id?: string
          invoice_number?: string | null
          reason?: string | null
          return_date?: string
          return_no: string
          sale_id?: string | null
          status?: string
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: string
          invoice_number?: string | null
          reason?: string | null
          return_date?: string
          return_no?: string
          sale_id?: string | null
          status?: string
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_returns_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_movements: {
        Row: {
          created_at: string
          id: string
          movement_date: string
          notes: string | null
          product_id: string | null
          product_name: string
          quantity: number
          reference: string | null
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          movement_date?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          reference?: string | null
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          movement_date?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          reference?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfers: {
        Row: {
          created_at: string
          from_warehouse: string
          from_warehouse_id: string | null
          id: string
          notes: string | null
          product_id: string | null
          product_name: string
          quantity: number
          status: string
          to_warehouse: string
          to_warehouse_id: string | null
          transfer_date: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          from_warehouse?: string
          from_warehouse_id?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          status?: string
          to_warehouse?: string
          to_warehouse_id?: string | null
          transfer_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          from_warehouse?: string
          from_warehouse_id?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          status?: string
          to_warehouse?: string
          to_warehouse_id?: string | null
          transfer_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfers_from_warehouse_id_fkey"
            columns: ["from_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_to_warehouse_id_fkey"
            columns: ["to_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tax_documents: {
        Row: {
          category: string | null
          created_at: string
          file_path: string | null
          file_size: number | null
          file_url: string | null
          id: string
          name: string
          sale_id: string | null
          size: string | null
          status: string
          type: string | null
          updated_at: string
          uploaded_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          file_path?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          name: string
          sale_id?: string | null
          size?: string | null
          status?: string
          type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          file_path?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          name?: string
          sale_id?: string | null
          size?: string | null
          status?: string
          type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_documents_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "tax_sales"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          date: string
          deductible: boolean
          description: string
          id: string
          receipt: boolean
          status: string
          tax_period: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string
          date?: string
          deductible?: boolean
          description: string
          id?: string
          receipt?: boolean
          status?: string
          tax_period: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          date?: string
          deductible?: boolean
          description?: string
          id?: string
          receipt?: boolean
          status?: string
          tax_period?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tax_imports: {
        Row: {
          created_at: string
          duplicates: number
          errors: number
          id: string
          imported_at: string
          name: string
          rows_count: number
          status: string
          type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duplicates?: number
          errors?: number
          id?: string
          imported_at?: string
          name: string
          rows_count?: number
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duplicates?: number
          errors?: number
          id?: string
          imported_at?: string
          name?: string
          rows_count?: number
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tax_purchases: {
        Row: {
          amount: number
          attachment: boolean
          category: string | null
          created_at: string
          date: string
          deductible: boolean
          id: string
          status: string
          supplier: string
          tax_period: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          attachment?: boolean
          category?: string | null
          created_at?: string
          date?: string
          deductible?: boolean
          id?: string
          status?: string
          supplier: string
          tax_period: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          attachment?: boolean
          category?: string | null
          created_at?: string
          date?: string
          deductible?: boolean
          id?: string
          status?: string
          supplier?: string
          tax_period?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tax_sales: {
        Row: {
          amount: number
          created_at: string
          customer: string
          date: string
          id: string
          reference: string
          status: string
          tax_period: string
          updated_at: string
          user_id: string | null
          vat: number
        }
        Insert: {
          amount?: number
          created_at?: string
          customer: string
          date?: string
          id?: string
          reference: string
          status?: string
          tax_period: string
          updated_at?: string
          user_id?: string | null
          vat?: number
        }
        Update: {
          amount?: number
          created_at?: string
          customer?: string
          date?: string
          id?: string
          reference?: string
          status?: string
          tax_period?: string
          updated_at?: string
          user_id?: string | null
          vat?: number
        }
        Relationships: []
      }
      tax_settings: {
        Row: {
          created_at: string
          projected_annual_profit: number
          reminders_off: string[]
          tax_rate: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          projected_annual_profit?: number
          reminders_off?: string[]
          tax_rate?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          projected_annual_profit?: number
          reminders_off?: string[]
          tax_rate?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_permission_overrides: {
        Row: {
          created_at: string
          effect: string
          id: string
          permission_key: string
          scope: string
          user_id: string
        }
        Insert: {
          created_at?: string
          effect: string
          id?: string
          permission_key: string
          scope?: string
          user_id: string
        }
        Update: {
          created_at?: string
          effect?: string
          id?: string
          permission_key?: string
          scope?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permission_overrides_permission_key_fkey"
            columns: ["permission_key"]
            isOneToOne: false
            referencedRelation: "permission_catalog"
            referencedColumns: ["permission_key"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vat_returns: {
        Row: {
          created_at: string
          due_date: string
          id: string
          input_vat: number
          output_vat: number
          payable: number
          payment_status: string
          period: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          due_date: string
          id?: string
          input_vat?: number
          output_vat?: number
          payable?: number
          payment_status?: string
          period: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          due_date?: string
          id?: string
          input_vat?: number
          output_vat?: number
          payable?: number
          payment_status?: string
          period?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          capacity: number
          created_at: string
          id: string
          location: string | null
          manager: string | null
          name: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          capacity?: number
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      withholding_records: {
        Row: {
          amount: number
          certificate: string | null
          created_at: string
          date: string
          due_date: string
          id: string
          name: string
          payment_status: string
          period: string
          status: string
          type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          certificate?: string | null
          created_at?: string
          date?: string
          due_date: string
          id?: string
          name: string
          payment_status?: string
          period: string
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          certificate?: string | null
          created_at?: string
          date?: string
          due_date?: string
          id?: string
          name?: string
          payment_status?: string
          period?: string
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: { _permission_key: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "cashier" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "cashier", "staff"],
    },
  },
} as const
