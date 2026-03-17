import { ProxyRequestForm } from './ProxyRequestForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ManualDispatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualDispatchDialog({ isOpen, onClose }: ManualDispatchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden gap-0">
        <DialogHeader className="px-5 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0c0c0c]">
          <div className="flex items-center gap-3">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
               <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
               <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
             </div>
             <DialogTitle className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
               Manual Dispatch
             </DialogTitle>
           </div>
           <DialogDescription className="sr-only">
             Manually dispatch an API request or webhook payload.
           </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
          <ProxyRequestForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
