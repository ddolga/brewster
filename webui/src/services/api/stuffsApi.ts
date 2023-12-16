import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CreateStuffsDto, UpdateSuffsDto} from "../../types/dto/stuffs.dto.ts";
import {TypeOfStuff} from "../../types/common.ts";


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
            }),
            providesTags: ['Stuffs'],
        }),
        createStuffs: build.mutation({
            query(entry: CreateStuffsDto) {
                return {
                    url: '',
                    method: 'POST',
                    body: entry
                }
            },
            invalidatesTags: ['Stuffs']
        }),
        updateStuffs: build.mutation(({
            query(entry: UpdateSuffsDto) {
                return {
                    url: '',
                    method: 'PATCH',
                    body: entry
                }
            },
            invalidatesTags:['Stuffs']
        })),
        deleteStuffs: build.mutation(({
            query(id: string) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags:['Stuffs']
        })),
        selectStuffs:build.query({
            query:(args:{type:TypeOfStuff}) => ({
               url:`/select/${args.type}`
            })
        })
    })
})

export const {
    useGetStuffsQuery,
    useGetStuffsDetailQuery,
    useSelectStuffsQuery,
    useCreateStuffsMutation,
    useUpdateStuffsMutation,
} = stuffsApi;

export default stuffsApi;
