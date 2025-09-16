/**
 * UI interaction and form-related type definitions
 * Includes chat, toast, forms, and other interactive elements
 */

import type React from "react";
import type { z } from "zod";

// Chat interface types
export interface Message {
  role: "user" | "assistant";
  content: string;
  context?: any[];
}

export interface ChatInterfaceProps {
  onClose: () => void;
}

// Toast system types
export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastState {
  toasts: ToasterToast[];
}

export type ToastActionType =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

export type Toast = Omit<ToasterToast, "id">;

// Sheet/Drawer components
export interface SheetContentProps extends React.ComponentPropsWithoutRef<"div"> {
  side?: "top" | "right" | "bottom" | "left";
}

// Toast UI component types
export type ToastProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "default" | "destructive";
};

export type ToastActionElement = React.ReactElement;

// Form types - placeholder for contact forms, etc.
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: string[];
}

// Contact form schema type (if using Zod validation)
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}