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

    try {
      // First check if password already exists
      const { data: existingSettings } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (existingSettings) {
        toast.error('Admin password is already set');
        navigate('/admin/login');
        return;
      }

      const hashedPassword = await bcrypt.hash('Admin@2024', 10);
      
      const { error } = await supabase
        .from('admin_settings')
        .insert([{ password_hash: hashedPassword }]);

      if (error) throw error;

      toast.success('Admin password set successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Failed to set admin password');
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