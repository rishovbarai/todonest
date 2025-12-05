import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || 'https://aguclrbhipjpeudzwjdr.supabase.co';
      const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA';

      console.log('Initializing Supabase client...');
      console.log('Supabase URL:', supabaseUrl);
      this.supabase = createClient(supabaseUrl, supabaseKey);
      console.log('Supabase client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      throw error;
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }
    return this.supabase;
  }
}

