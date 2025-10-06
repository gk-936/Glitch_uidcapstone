// Simple toast system
interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast({ title, description, variant = 'default' }: ToastOptions) {
  const message = description ? `${title}: ${description}` : title;
  
  if (variant === 'destructive') {
    alert(`❌ ${message}`);
  } else {
    alert(`✅ ${message}`);
  }
}

export function useToast() {
  return {
    toast,
    dismiss: () => {}, // No-op for compatibility
  };
}