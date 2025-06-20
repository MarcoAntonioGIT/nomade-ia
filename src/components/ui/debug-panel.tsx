import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { API_CONFIG } from '@/config/constants';

interface DebugPanelProps {
  isVisible?: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ isVisible = false }) => {
  const [isOpen, setIsOpen] = useState(isVisible);
  const [debugInfo, setDebugInfo] = useState<any>({});

  const collectDebugInfo = () => {
    const info = {
      environment: import.meta.env.MODE,
      apiBaseUrl: API_CONFIG.BASE_URL,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'fallback',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      localStorage: {
        available: typeof window !== 'undefined' && !!window.localStorage,
        keys: typeof window !== 'undefined' ? Object.keys(localStorage) : [],
      },
      sessionStorage: {
        available: typeof window !== 'undefined' && !!window.sessionStorage,
        keys: typeof window !== 'undefined' ? Object.keys(sessionStorage) : [],
      },
      cookies: {
        available: typeof window !== 'undefined' && !!document.cookie,
        enabled: typeof window !== 'undefined' && navigator.cookieEnabled,
      },
    };
    setDebugInfo(info);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        Debug
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto z-50 bg-white shadow-lg border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          Debug Panel
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={collectDebugInfo}
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div>
          <Badge variant={import.meta.env.MODE === 'production' ? 'destructive' : 'default'}>
            {import.meta.env.MODE}
          </Badge>
        </div>
        
        <div>
          <strong>API Base URL:</strong>
          <div className="break-all text-gray-600">{debugInfo.apiBaseUrl}</div>
        </div>
        
        <div>
          <strong>Supabase URL:</strong>
          <div className="break-all text-gray-600">{debugInfo.supabaseUrl}</div>
        </div>
        
        <div>
          <strong>User Agent:</strong>
          <div className="break-all text-gray-600">{debugInfo.userAgent}</div>
        </div>
        
        <div>
          <strong>Local Storage:</strong>
          <div className="text-gray-600">
            Available: {debugInfo.localStorage?.available ? 'Yes' : 'No'}
          </div>
          <div className="text-gray-600">
            Keys: {debugInfo.localStorage?.keys?.length || 0}
          </div>
        </div>
        
        <div>
          <strong>Session Storage:</strong>
          <div className="text-gray-600">
            Available: {debugInfo.sessionStorage?.available ? 'Yes' : 'No'}
          </div>
        </div>
        
        <div>
          <strong>Cookies:</strong>
          <div className="text-gray-600">
            Enabled: {debugInfo.cookies?.enabled ? 'Yes' : 'No'}
          </div>
        </div>
        
        <div>
          <strong>Timestamp:</strong>
          <div className="text-gray-600">{debugInfo.timestamp}</div>
        </div>
      </CardContent>
    </Card>
  );
}; 