import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { fileURLToPath, URL } from 'node:url';
import type { Connect } from 'vite';
import type { ServerResponse, IncomingMessage } from 'http';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    // Mock Razorpay API handlers
    middlewares: [
      (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
        // Log all requests for debugging
        console.log(`[DEBUG] Middleware received: ${req.method} ${req.url || ''}`);
        
        // Handle OPTIONS requests first
        if (req.method === 'OPTIONS') {
          console.log('[DEBUG] Handling OPTIONS request');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.writeHead(200);
          res.end();
          return;
        }
        
        // Simplify to a basic string check - if URL contains 'razorpay/create-order', handle it
        const url = req.url || '';
        if (url.includes('razorpay/create-order') && req.method === 'POST') {
          console.log('[DEBUG] 🎯 Intercepted Razorpay request:', url);
          
          // Read body data
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });
          
          req.on('end', () => {
            try {
              const data = body ? JSON.parse(body) : {};
              console.log('[DEBUG] 📦 Received order data:', data);
              
              // Create a valid mock order response with a proper format
              // that matches what the Razorpay API expects
              const orderId = `order_${Date.now()}${Math.floor(Math.random() * 1000)}`;
              const mockOrder = {
                id: orderId,
                entity: 'order',
                amount: data.amount || 49900,
                amount_paid: 0,
                amount_due: data.amount || 49900,
                currency: data.currency || 'INR',
                receipt: data.receipt || `receipt_${Date.now()}`,
                status: 'created',
                attempts: 0,
                notes: data.notes || {},
                created_at: Math.floor(Date.now() / 1000)
              };
              
              console.log('[DEBUG] 📤 Sending mock order response:', mockOrder);
              
              // Send mock response with proper headers
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.writeHead(200);
              res.end(JSON.stringify(mockOrder));
            } catch (error) {
              console.error('[ERROR] Error handling mock order creation:', error);
              
              // Even on error, return a valid order object
              const fallbackOrder = {
                id: `order_${Date.now()}${Math.floor(Math.random() * 1000)}`,
                entity: 'order',
                amount: 49900,
                amount_paid: 0,
                amount_due: 49900,
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                status: 'created',
                attempts: 0,
                notes: {},
                created_at: Math.floor(Date.now() / 1000)
              };
              
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.writeHead(200);
              res.end(JSON.stringify(fallbackOrder));
            }
          });
          
          return;
        }
        
        // Pass through to next handler for all other requests
        next();
      }
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
