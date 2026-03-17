import { useState } from 'react';
import { useApiRequestStore } from '../store/apiRequestStore';
import { Send, AlertCircle, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ProxyRequestFormProps {
  onSuccess?: () => void;
}

export function ProxyRequestForm({ onSuccess }: ProxyRequestFormProps) {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headersMap, setHeadersMap] = useState<Array<{k: string, v: string}>>([{ k: '', v: '' }]);
  const [payloadStr, setPayloadStr] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  const { sendProxyRequest, loading } = useApiRequestStore();

  const handleValidateJson = (val: string) => {
    setPayloadStr(val);
    if (!val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: unknown) {
      setJsonError((e as Error).message);
    }
  };

  const handleAddHeader = () => {
    setHeadersMap([...headersMap, { k: '', v: '' }]);
  };

  const handleHeaderChange = (index: number, field: 'k' | 'v', value: string) => {
    const newHeaders = [...headersMap];
    newHeaders[index][field] = value;
    setHeadersMap(newHeaders);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endpoint) return;

    let payloadObj = undefined;
    if (payloadStr.trim()) {
      try {
        payloadObj = JSON.parse(payloadStr);
      } catch {
        return;
      }
    }

    const headersDict: Record<string, string> = {};
    headersMap.forEach(({k, v}) => {
      if (k.trim()) headersDict[k.trim()] = v.trim();
    });

    await sendProxyRequest({
      method,
      endpoint,
      headers: Object.keys(headersDict).length > 0 ? headersDict : undefined,
      payload: payloadObj
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f0f0f] border-b border-slate-200 dark:border-white/5 p-5 shrink-0 z-10 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-5xl mx-auto">

        {/* URL Row */}
        <div className="flex items-center gap-3">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-emerald-600 dark:text-emerald-500 font-bold text-sm rounded-md px-4 py-2 font-mono outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all appearance-none cursor-pointer h-9"
          >
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <Input
            type="url"
            placeholder="https://api.example.com/v1/resource"
            required
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="flex-1 font-mono"
          />

          <Button
            type="submit"
            disabled={loading || !!jsonError}
            className="px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Sending...' : 'Dispatch'}
          </Button>
        </div>

        {/* Headers & Payload grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Headers */}
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-slate-100 dark:border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Headers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddHeader}
                className="h-6 text-xs px-2 py-1 font-mono gap-1"
              >
                <Plus className="w-3 h-3" /> Add Header
              </Button>
            </div>
            <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto custom-scrollbar pr-1 flex-1">
              {headersMap.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Key (e.g. Auth)"
                    value={h.k}
                    onChange={(e) => handleHeaderChange(i, 'k', e.target.value)}
                    className="w-1/2 font-mono"
                  />
                  <Input
                    type="text"
                    placeholder="Value"
                    value={h.v}
                    onChange={(e) => handleHeaderChange(i, 'v', e.target.value)}
                    className="w-1/2 font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payload */}
          <div className="flex flex-col bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-slate-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">JSON Body Payload</Label>
              {jsonError && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                  <AlertCircle className="w-3 h-3" /> Syntax Error
                </span>
              )}
            </div>
            <textarea
              value={payloadStr}
              onChange={(e) => handleValidateJson(e.target.value)}
              placeholder='{"key": "value"}'
              className={cn(
                'flex-1 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-sm rounded-md p-3 font-mono outline-none min-h-[140px] resize-y transition-colors',
                jsonError && 'border-rose-500/50 focus:border-rose-500 outline-none ring-1 ring-rose-500/50',
                !jsonError && 'focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600'
              )}
            />
          </div>
        </div>

      </form>
    </div>
  );
}
