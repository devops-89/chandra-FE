import { api } from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { type UpdateProfileRequest } from "@/types/admin/profile.types";

export const updateProfile = async (
    payload: UpdateProfileRequest
) => {
    const formData = new FormData();

    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("username", payload.username);
    formData.append("phone", payload.phone);

    if (payload.profileImage) {
        formData.append("profileImage", payload.profileImage);
    }

    const response = await api.patch(
        ENDPOINTS.UPDATE_PROFILE,
        formData
    );

    return response.data;
};