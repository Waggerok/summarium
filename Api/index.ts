import axios from 'axios';
import { AuthorizationApi, UploadsApi, ProjectsApi, UsersApi, ReportsApi, UserRolesApi, LicenseInfoApi } from './generated/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const axiosInstance = axios.create();
const basePath = process.env.EXPO_PUBLIC_API_URL || '';
const commonParams = [undefined, basePath, axiosInstance] as const;

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('AccessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) =>
    {
        return response;
    },
    (error) =>
    {
        if (error.response)
        {
            if (error.response.status === 401)
            {
                AsyncStorage.removeItem('AccessToken');
            }
        }
        else
        {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    },
);

export default {
    AuthorizationApi: new AuthorizationApi(...commonParams),
    UploadsApi: new UploadsApi(...commonParams),
    ProjectsApi: new ProjectsApi(...commonParams),
    UsersApi: new UsersApi(...commonParams),
    ReportsApi: new ReportsApi(...commonParams),
    UserRolesApi: new UserRolesApi(...commonParams),
    LicenseInfoApi: new LicenseInfoApi(...commonParams),
};
