export interface Application {
    id: number;
    user_id: number;
    company_name: string;
    job_title: string;
    status: 'Applied' | 'In Progress' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
    source: string;
    application_link?: string;
    application_date: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const getApplicationsByUser: (userId: number) => Promise<any[]>;
export declare const createApplication: (data: Partial<Application>) => Promise<any>;
export declare const updateApplication: (id: number, data: Partial<Application>) => Promise<any>;
//# sourceMappingURL=Application.d.ts.map