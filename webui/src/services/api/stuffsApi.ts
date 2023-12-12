import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CreateStuffsDto, UpdateSuffsDto} from "../dto/stuffs.dto.ts";


const stuffsApi = createApi({
    reducerPath: 'stuffs',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/stuffs'
    }),
    tagTypes: ['Stuffs'],
    endpoints: (build) => ({
        getStuffs: build.query({
            query: () => ({url: ''}),
            providesTags: ['Stuffs'],
        }),
        getStuffsDetail: build.query({
            query: (args: { id: string }) => ({
                url: `/${args.id}`
            })
        }),
        createStuffs: build.mutation({
            query(entry: CreateStuffsDto) {
                return {
                    url: '',
                    method: 'POST',
                    body: entry
                }
            }
        }),
        updateStuffs: build.mutation(({
            query(entry: UpdateSuffsDto) {
                return {
                    url: '',
                    method: 'PATCH',
                    body: entry
                }
            }
        }))
    })
})

export const {
    useGetStuffsQuery,
    useGetStuffsDetailQuery,
    useCreateStuffsMutation,
    useUpdateStuffsMutation,
} = stuffsApi;

export default stuffsApi;
