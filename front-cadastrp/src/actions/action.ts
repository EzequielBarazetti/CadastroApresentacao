
import { AxiosResponse } from 'axios';
import axios from '../axios/index';


import {InsertUpdateCadClient, GetDataClient } from '../types/action'


interface formCadClient {
    Id    : number;
    Nome  : string;
    Sexo  : string;
    Cpf   : string;
    Endereco : string;
    Cidade : number;
}

interface Pagination<T> {
    page_atual: number;
    page_size_actual: number;
    quant_total_pages: number;
    quant_total_records: number;
    data: T;
}
export const insertUpdateCadClient: InsertUpdateCadClient = async (id:number,  formData: formCadClient) => {
    try {
        await axios.post(`clients/${id}`, formData);
    } catch (err) {
        throw err;
    }
};


// export const updateCadClient: UpdateCadClient = async (
//     id: number,
//     formData: formCadClient,
// ) => {
//     try {
//         await axios.put(`clients/updateCadClient/${id}`, formData);
//     } catch (err) {
//         throw err;
//     }
// };


export const listClients: GetDataClient = async (page, pageSize) => {
    try {
        const { data }: AxiosResponse<Pagination<formCadClient[]>> = await axios.get(
            `clients/listCadClient?page=${page}&page_size=${pageSize}`,
        );

        return data;
    } catch (err) {
        throw err;
    }
};
