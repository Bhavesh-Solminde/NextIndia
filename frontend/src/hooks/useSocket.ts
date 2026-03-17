import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useWebhookStore } from '../store/webhookStore';
import { useApiRequestStore } from '../store/apiRequestStore';
import type { WebhookEvent, ApiRequest } from '../types';

// ── Singleton socket instance — created once at module level ────────────────
const socket: Socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', {
  transports: ['polling', 'websocket'],
});

// ── Guard: register data listeners only once at module level ───────────────
let listenersRegistered = false;

function registerGlobalListeners() {
  if (listenersRegistered) return;
  listenersRegistered = true;

  socket.on('new_webhook', (event: WebhookEvent) => {
    useWebhookStore.getState().addWebhook(event);
    toast.success('New Webhook Captured', { id: `webhook-${event._id}` });
  });

  socket.on('new_api_request', (req: ApiRequest) => {
    useApiRequestStore.getState().addApiRequest(req);
    toast.success('New API Request Captured', { id: `api-${req._id}` });
  });
}

export const useSocket = () => {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    // Data listeners are registered once globally — no duplicates possible
    registerGlobalListeners();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    if (socket.connected) {
      setConnected(true);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { connected };
};
