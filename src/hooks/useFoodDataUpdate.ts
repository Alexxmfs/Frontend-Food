// useFoodDataUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const updateData = async (params: { id: number, data: FoodData }): Promise<any> => {
    const { id, data } = params;
    const response = await axios.put(`${API_URL}/food/${id}`, data);
    return response;
}

export function useFoodDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation(updateData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    });

    return mutate;
}
