import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { CreateUserRequest } from "../user.type";

interface UseUsersState {
  isCreating: boolean;
  isDeleting: boolean;
  message: string | null;
  status: "idle" | "error" | "success" | null;
}

interface UseUsersActions {
  createUser: (userData: CreateUserRequest) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  clearMessage: () => void;
  setSuccessCallback: (callback: () => void) => void;
}

interface UseUsersReturn extends UseUsersState, UseUsersActions {
  fetcher: ReturnType<typeof useFetcher>;
}

/**
 * Custom hook for managing users operations
 * @returns {UseUsersReturn} State and actions for user management
 */
export const useUsers = (): UseUsersReturn => {
  const fetcher = useFetcher();

  const [state, setState] = useState<UseUsersState>({
    isCreating: false,
    isDeleting: false,
    message: null,
    status: null,
  });

  // Track current action to determine which operation is being performed
  const currentActionRef = useRef<string | null>(null);
  const onSuccessCallbackRef = useRef<(() => void) | null>(null);

  // Update loading states based on fetcher state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isCreating: fetcher.state === "submitting" && currentActionRef.current === "create",
      isDeleting: fetcher.state === "submitting" && currentActionRef.current === "delete",
    }));
  }, [fetcher.state]);

  // Handle create action response
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && currentActionRef.current === "create") {
      if (fetcher.data.error) {
        setState((prev) => ({
          ...prev,
          message: fetcher.data.error,
          status: "error",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          message: "User created successfully",
          status: "success",
        }));

        // Execute success callback if available
        if (onSuccessCallbackRef.current) {
          onSuccessCallbackRef.current();
          onSuccessCallbackRef.current = null;
        }
      }
      currentActionRef.current = null;
    }
  }, [fetcher.state, fetcher.data]);

  // Handle delete action response
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && currentActionRef.current === "delete") {
      if (fetcher.data.error) {
        setState((prev) => ({
          ...prev,
          message: fetcher.data.error,
          status: "error",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          message: "User deleted successfully",
          status: "success",
        }));

        // Execute success callback if available
        if (onSuccessCallbackRef.current) {
          onSuccessCallbackRef.current();
          onSuccessCallbackRef.current = null;
        }
      }
      currentActionRef.current = null;
    }
  }, [fetcher.state, fetcher.data]);

  const clearMessage = useCallback(() => {
    setState((prev) => ({ ...prev, message: null, status: null }));
  }, []);

  const createUser = useCallback(
    async (userData: CreateUserRequest): Promise<boolean> => {
      setState((prev) => ({ ...prev, message: null, status: null, isCreating: true }));
      currentActionRef.current = "create";
      fetcher.submit({ _action: "create", userData: JSON.stringify(userData) }, { method: "POST" });

      return true;
    },
    [fetcher],
  );

  const deleteUser = useCallback(
    async (userId: string): Promise<boolean> => {
      setState((prev) => ({ ...prev, message: null, status: null }));
      currentActionRef.current = "delete";
      fetcher.submit({ _action: "delete", userId }, { method: "POST" });

      return true;
    },
    [fetcher],
  );

  // Method to set success callback for external components
  const setSuccessCallback = useCallback((callback: () => void) => {
    onSuccessCallbackRef.current = callback;
  }, []);

  return {
    ...state,
    fetcher,
    createUser,
    deleteUser,
    clearMessage,
    // Internal method for components that need to register success callbacks
    setSuccessCallback,
  };
};

// Legacy export for backward compatibility - will be removed after migration
export const useUserDialog = useUsers;
