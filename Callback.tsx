import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

// n8n Webhook 地址
const N8N_WEBHOOK_URL = 'https://n8n-production-9f74.up.railway.app/webhook/oauth-callback';

interface Props {
  onSuccess: (email: string, name: string) => void;
  onError: (error: string) => void;
}

const Callback: React.FC<Props> = ({ onSuccess, onError }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authorization...');

  useEffect(() => {
    const handleCallback = async () => {
      // 从 URL 获取授权码
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (error) {
        setStatus('error');
        setMessage(errorDescription || 'Authorization was denied');
        onError(errorDescription || 'Authorization denied');
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        onError('No authorization code');
        return;
      }

      try {
        setMessage('Exchanging authorization code...');

        // 调用 n8n Webhook，传递授权码
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            redirect_uri: 'https://mailera-nine.vercel.app/callback'
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }

        const data = await response.json();
        
        setStatus('success');
        setMessage('Successfully connected!');
        
        // 清除 URL 中的授权码
        window.history.replaceState({}, document.title, '/callback');
        
        // 延迟一下让用户看到成功状态
        setTimeout(() => {
          onSuccess(data.email || 'user@outlook.com', data.name || 'User');
        }, 1500);

      } catch (err) {
        console.error('Callback error:', err);
        setStatus('error');
        setMessage('Failed to complete registration. Please try again.');
        onError('Registration failed');
      }
    };

    handleCallback();
  }, [onSuccess, onError]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="mb-8 rounded-[2.5rem] border border-zinc-700 bg-zinc-800/50 p-8 shadow-xl">
        {status === 'loading' && (
          <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
        )}
        {status === 'success' && (
          <CheckCircle className="w-16 h-16 text-emerald-400" />
        )}
        {status === 'error' && (
          <XCircle className="w-16 h-16 text-red-400" />
        )}
      </div>

      <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
        {status === 'loading' && 'Connecting...'}
        {status === 'success' && 'Connected!'}
        {status === 'error' && 'Connection Failed'}
      </h2>
      
      <p className="text-lg text-zinc-400">{message}</p>

      {status === 'error' && (
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition-colors"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default Callback;
