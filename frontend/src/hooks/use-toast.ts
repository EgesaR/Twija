'use client';

import * as React from 'react';
import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'info' | 'warning';
  action?: React.ReactNode;
  duration?: number;
};

function toast({ title, description, variant, action, ...props }: ToastProps) {
  // Map shadcn variants to sonner methods
  const variantMap = {
    default: sonnerToast,
    destructive: sonnerToast.error,
    success: sonnerToast.success,
    info: sonnerToast.info,
    warning: sonnerToast.warning,
  };

  const toastFn = variantMap[variant || 'default'];

  return toastFn(title, {
    description: description,
    action: action as any, // Sonner expects { label, onClick } usually, but handles nodes
    ...props,
  });
}

function useToast() {
  return {
    toast,
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  };
}

export { useToast, toast };
