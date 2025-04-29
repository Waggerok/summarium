export interface User {
    login: string;
    token: string;
    telegram_id: number | null;
    seconds: number;
    name?: string;
    role?: string;
    avatar?: string | undefined | null;
    user_access_level: number | null;

    optionals?: 
    {
        diarization?: boolean
        diarizationLock?: boolean
    }


}