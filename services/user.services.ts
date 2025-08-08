import type { CreateUserRequest } from "@hyperscal/api";
import { Methods } from "@hyperscal/core/types/panel";
import type { UserClient } from "app/user-client";
import type { UserType } from "../user.type";

export interface UpdateUserRequest {
  email_address?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  job_title?: string | null;
  display_name?: string | null;
  date_of_birth?: string | null;
  gender_name?: string | null;
}

export interface UserDetailResponse {
  user: UserType;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

class UserService {
  private readonly baseUrl = `${process.env.HYPERSCAL_BACKEND_BASE_URL}/v1.0/iam/tenant/users`;
  private readonly userClient: UserClient;

  constructor(userClient: UserClient) {
    this.userClient = userClient;
  }

  async createUser(userData: CreateUserRequest): Promise<UserType> {
    try {
      const response = await this.userClient.fetch(this.baseUrl, {
        method: Methods.Post,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to create user: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
  }

  async getUserDetail(userId: string): Promise<UserDetailResponse> {
    try {
      const response = await this.userClient.fetch(`${this.baseUrl}/${userId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch user detail: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user detail:", error);
      throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
  }

  async updateUser(userId: string, userData: UpdateUserRequest): Promise<UserType> {
    try {
      const response = await this.userClient.fetch(`${this.baseUrl}/${userId}`, {
        method: Methods.Put,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update user: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
  }

  async deactivateUser(userId: string): Promise<UserType> {
    try {
      const response = await this.userClient.fetch(`${this.baseUrl}/${userId}/deactivate`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to deactivate user: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error deactivating user:", error);
      throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await this.userClient.fetch(`${this.baseUrl}/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete user: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error instanceof Error ? error : new Error("Unknown error occurred");
    }
  }
}

export { UserService };
