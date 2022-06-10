export type RetornoDefault = {
    success: boolean;
    message: string;
}

export function isRetornoDefault(obj: any) {
    return 'success' in obj && 'message' in obj;
}