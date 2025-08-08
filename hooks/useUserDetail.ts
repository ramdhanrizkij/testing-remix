import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { UpdateUserRequest } from "../user.type";

interface UseUserDetailState {
  isLoading: boolean;
  isUpdating: boolean;
  isDeactivating: boolean;
  isDeleting: boolean;
  message: string | null;
  status: "idle" | "error" | "success" | null;
}

interface UseUserDetailActions {
  updateUser: (userData: UpdateUserRequest) => Promise<boolean>;
  deactivateUser: (userId: string) => Promise<boolean>;
  deleteUser: () => Promise<boolean>;
  clearMessage: () => void;
}

interface UseUserDetailReturn extends UseUserDetailState, UseUserDetailActions {}

/**
 * Custom hook for managing user detail operations
 * @returns {UseUserDetailReturn} State and actions for user detail management
 */
export const useUserDetail = (): UseUserDetailReturn => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [state, setState] = useState<UseUserDetailState>({
    isLoading: false,
    isUpdating: false,
    isDeactivating: false,
    isDeleting: false,
    message: null,
    status: null,
  });

  // Track current action to determine which operation is being performed
  const currentActionRef = useRef<string | null>(null);

  // Update loading states based on fetcher state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isUpdating: fetcher.state === "submitting" && currentActionRef.current === "update",
      isDeactivating: fetcher.state === "submitting" && currentActionRef.current === "deactivate",
      isDeleting: fetcher.state === "submitting" && currentActionRef.current === "delete",
    }));
  }, [fetcher.state]);

  // Handle update action response
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && currentActionRef.current === "update") {
      if (fetcher.data.error) {
        setState((prev) => ({
          ...prev,
          message: fetcher.data.error,
          status: "error",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          message: "User updated successfully",
          status: "success",
        }));
      }
      currentActionRef.current = null;
    }
  }, [fetcher.state, fetcher.data]);

  // Handle deactivate action response
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && currentActionRef.current === "deactivate") {
      if (fetcher.data.error) {
        setState((prev) => ({
          ...prev,
          message: fetcher.data.error,
          status: "error",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          message: "User deactivated successfully",
          status: "success",
        }));
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
        // Navigate after a short delay to ensure state updates are processed
        navigate("/systems/users", { replace: true });
      }
      currentActionRef.current = null;
    }
  }, [fetcher.state, fetcher.data, navigate]);

  const clearMessage = useCallback(() => {
    setState((prev) => ({ ...prev, message: null, status: null }));
  }, []);

  const updateUser = useCallback(
    async (userData: UpdateUserRequest): Promise<boolean> => {
      setState((prev) => ({ ...prev, message: null, status: null }));
      currentActionRef.current = "update";
      fetcher.submit({ _action: "update", userData: JSON.stringify(userData) }, { method: "POST" });

      return true;
    },
    [fetcher],
  );

  const deactivateUser = useCallback(async (): Promise<boolean> => {
    setState((prev) => ({ ...prev, message: null, status: null }));
    currentActionRef.current = "deactivate";
    fetcher.submit({ _action: "deactivate" }, { method: "POST" });

    return true;
  }, [fetcher]);

  const deleteUser = useCallback(async (): Promise<boolean> => {
    setState((prev) => ({ ...prev, message: null, status: null }));
    currentActionRef.current = "delete";
    fetcher.submit({ _action: "delete" }, { method: "POST" });

    return true;
  }, [fetcher]);

  return {
    ...state,
    updateUser,
    deactivateUser,
    deleteUser,
    clearMessage,
  };
};
