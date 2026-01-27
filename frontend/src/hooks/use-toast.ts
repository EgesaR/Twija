'use client';

import * as React from 'react';

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'info' | 'warning';
  action?: React.ReactNode;
  duration?: number;
};

type SonnerModule = typeof import('sonner');

let sonnerPromise: Promise<SonnerModule> | null = null;

function getSonner(): Promise<SonnerModule> | null {
  if (typeof window === 'undefined') return null;
  if (!sonnerPromise) {
    sonnerPromise = import('sonner');
  }
  return sonnerPromise;
}

export async function toast(props: ToastProps) {
  const sonner = await getSonner();
  if (!sonner) return;

  const { toast: baseToast } = sonner;

  const map = {
    default: baseToast,
    destructive: baseToast.error,
    success: baseToast.success,
    info: baseToast.info,
    warning: baseToast.warning,
  } as const;

  const fn = map[props.variant ?? 'default'];

  return fn(props.title, {
    description: props.description,
    action: props.action as any,
    duration: props.duration,
  });
}

export function useToast() {
  return {
    toast,
    dismiss: async (id?: string | number) => {
      const sonner = await getSonner();
      sonner?.toast.dismiss(id);
    },
  };
}
