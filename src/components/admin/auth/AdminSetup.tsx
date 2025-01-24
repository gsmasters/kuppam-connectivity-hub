import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as bcrypt from 'bcryptjs';

export const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async () => {
    setLoading(true);
    console.log('Starting admin setup...');

    try {
      // First check if password already exists
      const { data: existingSettings, error: checkError } = await supabase
        .from('admin_settings')
        .select('*');

      if (checkError) {
        console.error('Error checking existing settings:', checkError);
        throw new Error('Failed to check existing settings');
      }

      if (existingSettings && existingSettings.length > 0) {
        toast.error('Admin password is already set');
        navigate('/admin/login');
        return;
      }

      const hashedPassword = await bcrypt.hash('Admin@2024', 10);
      console.log('Password hashed successfully');
      
      const { error: insertError } = await supabase
        .from('admin_settings')
        .insert([{ password_hash: hashedPassword }]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error('Failed to insert admin password');
      }

      console.log('Admin password set successfully');
      toast.success('Admin password set successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Failed to set admin password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Setup
          </CardTitle>
          <CardDescription className="text-center">
            Set up admin password: Admin@2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSetup}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              'Set Password'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};